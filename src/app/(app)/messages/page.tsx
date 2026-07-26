"use client";

import { useState, useEffect, useRef, useCallback, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import api from "@/lib/api";
import { ChatSocket } from "@/lib/websocket";
import { Conversation, Message as MessageType, useAuthStore } from "@/lib/store";
import { timeAgo } from "@/lib/utils";
import { Send, ArrowLeft, Loader2, MessageCircle, Lock, MoreVertical, Flag, Ban, Check, CheckCheck } from "lucide-react";
import ProfileDetailModal from "@/components/ProfileDetailModal";
import ReportModal from "@/components/ReportModal";
import ConfirmDialog from "@/components/ConfirmDialog";

export default function MessagesPage() {
  return (
    <Suspense>
      <MessagesContent />
    </Suspense>
  );
}

function MessagesContent() {
  const { user } = useAuthStore();
  const searchParams = useSearchParams();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeConversation, setActiveConversation] = useState<Conversation | null>(null);
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [sendLimited, setSendLimited] = useState(false);
  const [viewProfile, setViewProfile] = useState<any>(null);
  const [showChatMenu, setShowChatMenu] = useState(false);
  const [reportTarget, setReportTarget] = useState<{ id: number; name: string } | null>(null);
  const [blockTarget, setBlockTarget] = useState<{ id: number; name: string } | null>(null);
  const [isTyping, setIsTyping] = useState(false);
  const typingTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [error, setError] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const apiBase = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

  useEffect(() => {
    fetchConversations();
  }, []);

  const fetchConversations = async () => {
    try {
      const { data } = await api.get("/api/messages/conversations");
      setConversations(data);

      // Auto-open conversation from match click
      const matchId = searchParams.get("match");
      if (matchId) {
        const conv = data.find((c: Conversation) => c.match_id === parseInt(matchId));
        if (conv) openConversation(conv);
      }
    } catch (err: any) {
      setError(err.response?.data?.detail || "Failed to load conversations");
    }
    setLoading(false);
  };

  const openConversation = async (conv: Conversation) => {
    setActiveConversation(conv);
    try {
      const { data } = await api.get(`/api/messages/${conv.id}`);
      setMessages(data);
      setTimeout(() => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
    } catch (err: any) {
      setError(err.response?.data?.detail || "Failed to load messages");
    }
  };

  // WebSocket connection for real-time messages
  const chatSocketRef = useRef<ChatSocket | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const socket = new ChatSocket(token);
    chatSocketRef.current = socket;
    socket.connect();

    const unsub = socket.onMessage((msg) => {
      if (msg.type === "message") {
        setMessages((prev) => {
          if (prev.some((m) => m.id === msg.id)) return prev;
          return [...prev, msg];
        });
        setIsTyping(false);
        setTimeout(() => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }), 50);
      } else if (msg.type === "typing") {
        setIsTyping(true);
        if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
        typingTimeoutRef.current = setTimeout(() => setIsTyping(false), 3000);
      }
    });

    return () => {
      unsub();
      socket.disconnect();
      chatSocketRef.current = null;
    };
  }, []);

  const handleSend = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!newMessage.trim() || !activeConversation || sending) return;

    const content = newMessage.trim();
    setNewMessage("");
    setSending(true);

    // Always use HTTP for reliability, WebSocket is for receiving only
    try {
      const { data } = await api.post(`/api/messages/${activeConversation.id}`, {
        content,
      });
      setMessages((prev) => [...prev, data]);
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'message_sent');
      }
      // Refresh conversation list to update last message preview
      fetchConversations();
    } catch (err: any) {
      const detail = err.response?.data?.detail || "Failed to send message";
      if (err.response?.status === 403) {
        setSendLimited(true);
      } else {
        setError(detail);
      }
      setNewMessage(content); // Restore message on failure
      setSending(false);
      return;
    }

    setTimeout(() => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }), 50);
    setSending(false);
  };

  // Fallback polling (every 30s) in case WebSocket disconnects
  useEffect(() => {
    if (!activeConversation) return;
    const interval = setInterval(async () => {
      try {
        const { data } = await api.get(`/api/messages/${activeConversation.id}`);
        setMessages(data);
      } catch {}
    }, 30000);
    return () => clearInterval(interval);
  }, [activeConversation]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 size={32} className="animate-spin text-accent" />
      </div>
    );
  }

  return (
    <div className="flex h-[calc(100dvh-5rem)] md:h-screen">
      {/* Conversation list */}
      <div
        className={`w-full md:w-80 border-r border-card-border bg-card flex flex-col ${
          activeConversation ? "hidden md:flex" : "flex"
        }`}
      >
        <div className="p-4 border-b border-card-border">
          <h1 className="text-lg font-bold">Messages</h1>
        </div>

        {conversations.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
            <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mb-3">
              <Send size={20} className="text-accent" />
            </div>
            <p className="text-sm font-medium mb-1">No conversations yet</p>
            <p className="text-xs text-muted mb-4">Send a message to start a conversation</p>
            <a href="/discover" className="px-5 py-2.5 bg-accent text-[#141210] rounded-lg text-sm font-semibold hover:bg-accent-dark transition-colors min-h-[44px] inline-flex items-center">
              Browse profiles
            </a>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto">
            {conversations.map((conv) => {
              const isActive = activeConversation?.id === conv.id;
              const photo =
                conv.other_profile?.photos.find((p) => p.is_primary) ||
                conv.other_profile?.photos[0];

              return (
                <button
                  key={conv.id}
                  type="button"
                  onClick={() => {
                    setActiveConversation(conv);
                    api.get(`/api/messages/${conv.id}`).then(({ data }) => {
                      setMessages(data);
                      setTimeout(() => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
                    }).catch(() => {});
                  }}
                  className={`flex items-center gap-3 p-4 cursor-pointer transition-colors border-b border-card-border/50 w-full text-left ${
                    isActive ? "bg-accent/5" : "hover:bg-muted-bg"
                  }`}
                >
                  <div className="w-12 h-12 rounded-full bg-muted-bg overflow-hidden flex-shrink-0">
                    {photo ? (
                      <img
                        src={`${apiBase}${photo.url}`}
                        alt={conv?.other_profile?.display_name || activeConversation?.other_profile?.display_name || "Profile photo"}
                        loading="lazy"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-muted font-semibold">
                        {conv.other_profile?.display_name[0]}
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium text-sm truncate">
                        {conv.other_profile?.display_name}
                      </h3>
                      <span className="text-xs text-muted">
                        {timeAgo(conv.updated_at)}
                      </span>
                    </div>
                    {conv.last_message ? (
                      conv.last_message.locked ? (
                        <p className="text-xs text-muted mt-0.5 flex items-center gap-1">
                          <Lock size={10} /> New message, upgrade to read
                        </p>
                      ) : (
                        <p className="text-xs text-muted truncate mt-0.5">
                          {conv.last_message.content}
                        </p>
                      )
                    ) : (
                      <p className="text-xs text-accent mt-0.5">
                        Say hello!
                      </p>
                    )}
                  </div>
                  {conv.unread_count > 0 && (
                    <span className="w-5 h-5 bg-accent text-[#141210] text-xs rounded-full flex items-center justify-center font-medium flex-shrink-0">
                      {conv.unread_count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Chat area, swipe right to go back on mobile */}
      <div
        className={`flex-1 flex flex-col ${
          activeConversation ? "flex" : "hidden md:flex"
        }`}
        onTouchStart={(e) => { (e.currentTarget as any)._touchX = e.touches[0].clientX; }}
        onTouchEnd={(e) => {
          const startX = (e.currentTarget as any)._touchX;
          if (startX == null) return;
          const dx = e.changedTouches[0].clientX - startX;
          if (dx > 80 && activeConversation) setActiveConversation(null);
        }}
      >
        {activeConversation ? (
          <>
            {/* Chat header */}
            <div className="flex items-center gap-3 p-4 border-b border-card-border bg-card">
              <button
                onClick={() => setActiveConversation(null)}
                className="md:hidden p-1"
                aria-label="Back to conversations"
              >
                <ArrowLeft size={20} />
              </button>
              <button
                onClick={() => activeConversation.other_profile && setViewProfile(activeConversation.other_profile)}
                className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity"
                aria-label={`View ${activeConversation.other_profile?.display_name}'s profile`}
              >
              <div className="w-10 h-10 rounded-full bg-muted-bg overflow-hidden">
                {activeConversation.other_profile?.photos[0] ? (
                  <img
                    src={`${apiBase}${activeConversation.other_profile.photos[0].url}`}
                    alt={activeConversation.other_profile?.display_name || "Profile photo"}
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-muted font-semibold">
                    {activeConversation.other_profile?.display_name[0]}
                  </div>
                )}
              </div>
              <div className="text-left">
                <h3 className="font-semibold text-sm">
                  {activeConversation.other_profile?.display_name}
                </h3>
                <p className="text-xs text-muted">
                  {activeConversation.other_profile?.city || "Tap to view profile"}
                </p>
              </div>
              </button>
              {/* Chat menu */}
              <div className="ml-auto relative">
                <button
                  onClick={() => setShowChatMenu(!showChatMenu)}
                  className="p-2 text-muted hover:text-foreground rounded-lg hover:bg-muted-bg min-h-[44px] min-w-[44px] flex items-center justify-center"
                  aria-label="Chat options"
                >
                  <MoreVertical size={18} />
                </button>
                {showChatMenu && (
                  <>
                    <div className="fixed inset-0 z-10" onClick={() => setShowChatMenu(false)} />
                    <div className="absolute right-0 top-full mt-1 bg-card border border-card-border rounded-lg shadow-lg py-1 w-44 z-20">
                      <button
                        onClick={() => {
                          setShowChatMenu(false);
                          if (activeConversation.other_profile) {
                            setReportTarget({ id: activeConversation.other_profile.id, name: activeConversation.other_profile.display_name });
                          }
                        }}
                        className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-muted hover:bg-muted-bg hover:text-danger"
                      >
                        <Flag size={14} /> Report
                      </button>
                      <button
                        onClick={() => {
                          setShowChatMenu(false);
                          if (activeConversation.other_profile) {
                            setBlockTarget({ id: activeConversation.other_profile.id, name: activeConversation.other_profile.display_name });
                          }
                        }}
                        className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-muted hover:bg-muted-bg hover:text-danger"
                      >
                        <Ban size={14} /> Block
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Profile view modal */}
            {viewProfile && (
              <ProfileDetailModal
                profile={viewProfile}
                onClose={() => setViewProfile(null)}
                onLike={() => setViewProfile(null)}
              />
            )}

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-background">
              {messages.length === 0 && (
                <div className="text-center py-10">
                  <p className="text-sm text-muted">
                    Start the conversation!
                  </p>
                </div>
              )}
              {messages.map((msg) => {
                const isMe = msg.sender_profile_id !== activeConversation.other_profile?.id;
                const isLocked = msg.locked;
                return (
                  <div
                    key={msg.id}
                    className={`flex ${isMe ? "justify-end" : "justify-start"}`}
                  >
                    {isLocked ? (
                      <div className="max-w-[75%] px-4 py-3 rounded-2xl rounded-bl-md bg-card border border-card-border">
                        <div className="flex items-center gap-2 text-sm text-muted">
                          <Lock size={14} className="flex-shrink-0" />
                          <p className="blur-[4px] select-none" aria-hidden="true">This message is hidden behind the paywall</p>
                        </div>
                        <p className="text-xs text-muted mt-1">{timeAgo(msg.created_at)}</p>
                      </div>
                    ) : (
                      <div
                        className={`max-w-[75%] px-4 py-2.5 rounded-2xl text-sm ${
                          isMe
                            ? "bg-accent text-[#141210] rounded-br-md"
                            : "bg-card border border-card-border rounded-bl-md"
                        }`}
                      >
                        <p>{msg.content}</p>
                        <p className="text-xs mt-1 flex items-center gap-1" style={isMe ? { color: "rgba(20,18,16,0.5)" } : undefined}>
                          {timeAgo(msg.created_at)}
                          {isMe && (
                            msg.is_read
                              ? <CheckCheck size={12} style={{ color: "rgba(20,18,16,0.6)" }} />
                              : <Check size={12} />
                          )}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}

              {/* Upgrade CTA if messages are locked */}
              {messages.some((m) => m.locked) && (
                <div className="text-center py-4">
                  <div className="inline-flex flex-col items-center bg-card border border-accent/20 rounded-xl p-5 max-w-xs">
                    <Lock size={24} className="text-accent mb-2" />
                    <p className="text-sm font-semibold mb-1">Unlock messages</p>
                    <p className="text-xs text-muted mb-3">Upgrade to Premium to read and reply to all messages</p>
                    <a
                      href="/settings?tab=subscription"
                      className="px-5 py-2.5 bg-accent text-[#141210] rounded-lg text-sm font-semibold hover:bg-accent-dark transition-colors min-h-[44px] inline-flex items-center"
                    >
                      Upgrade now
                    </a>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Typing indicator */}
            {isTyping && (
              <div className="px-4 py-1.5 text-xs text-muted flex items-center gap-1.5">
                <span className="flex gap-0.5">
                  <span className="w-1.5 h-1.5 bg-muted rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                  <span className="w-1.5 h-1.5 bg-muted rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                  <span className="w-1.5 h-1.5 bg-muted rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                </span>
                {activeConversation?.other_profile?.display_name} is typing...
              </div>
            )}

            {/* Input or upgrade prompt */}
            {sendLimited ? (
              <div className="p-4 border-t border-card-border bg-card text-center">
                <p className="text-sm text-muted mb-2">You&apos;ve sent your free opening message</p>
                <a
                  href="/settings?tab=subscription"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-accent text-[#141210] rounded-lg text-sm font-semibold hover:bg-accent-dark transition-colors min-h-[44px]"
                >
                  <Lock size={14} />
                  Upgrade for unlimited messaging
                </a>
              </div>
            ) : (
            <form
              onSubmit={handleSend}
              className="p-4 border-t border-card-border bg-card flex gap-2"
            >
              <label htmlFor="chat-input" className="sr-only">Message</label>
              <input
                id="chat-input"
                value={newMessage}
                onChange={(e) => {
                  setNewMessage(e.target.value);
                  if (activeConversation) {
                    chatSocketRef.current?.sendTyping(activeConversation.id);
                  }
                }}
                placeholder="Type a message..."
                onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSend(); } }}
                className="flex-1 px-4 py-2.5 bg-background border border-card-border rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-accent/50"
              />
              <button
                aria-label="Send message"
                type="button"
                onClick={() => handleSend()}
                disabled={!newMessage.trim() || sending}
                className="w-10 h-10 bg-accent text-[#141210] rounded-full flex items-center justify-center hover:bg-accent-dark transition-colors disabled:opacity-50"
              >
                <Send size={16} />
              </button>
            </form>
            )}
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-6">
            <div className="w-16 h-16 bg-muted-bg rounded-full flex items-center justify-center mb-4">
              <MessageCircle size={28} className="text-muted" />
            </div>
            <p className="font-medium mb-1">Select a conversation</p>
            <p className="text-sm text-muted">Choose from your matches to start chatting</p>
          </div>
        )}
      </div>

      {/* Report modal */}
      {reportTarget && (
        <ReportModal
          profileId={reportTarget.id}
          profileName={reportTarget.name}
          onClose={() => setReportTarget(null)}
          onDone={() => setReportTarget(null)}
        />
      )}

      {/* Block confirmation */}
      {blockTarget && (
        <ConfirmDialog
          title={`Block ${blockTarget.name}?`}
          message="They won't be able to see your profile or message you. This conversation will be removed."
          confirmLabel="Block"
          destructive
          onCancel={() => setBlockTarget(null)}
          onConfirm={async () => {
            try {
              await api.post(`/api/safety/block/${blockTarget.id}`);
              setBlockTarget(null);
              setActiveConversation(null);
              fetchConversations();
            } catch {}
          }}
        />
      )}
    </div>
  );
}
