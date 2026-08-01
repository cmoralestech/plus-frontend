"use client";

import { useEffect, useRef, useState } from "react";
import api from "@/lib/api";
import { Profile } from "@/lib/store";
import {
  capitalize,
  formatIncome,
  formatLifestyle,
  formatHeight,
  timeAgo,
} from "@/lib/utils";
import {
  X,
  Heart,
  MapPin,
  Plane,
  Briefcase,
  GraduationCap,
  BadgeCheck,
  DollarSign,
  Sparkles,
  MessageCircle,
  Flag,
  Ban,
  Clock,
  User,
  Bookmark,
  XCircle,
} from "lucide-react";

const pronounsMap: Record<string, string> = {
  he_him: "He/Him",
  she_her: "She/Her",
  they_them: "They/Them",
  he_they: "He/They",
  she_they: "She/They",
  other: "Other",
};

function formatPronouns(value?: string): string {
  if (!value || value === "prefer_not_to_say") return "";
  return pronounsMap[value] || capitalize(value);
}

function formatOrientation(value?: string): string {
  if (!value || value === "prefer_not_to_say") return "";
  return capitalize(value);
}

interface ProfileDetailModalProps {
  profile: Profile;
  onClose: () => void;
  onLike: () => void;
  onPass?: () => void;
  onReport?: () => void;
  onBlock?: () => void;
  autoMessage?: boolean;
}

export default function ProfileDetailModal({
  profile,
  onClose,
  onLike,
  onPass,
  onReport,
  onBlock,
  autoMessage,
}: ProfileDetailModalProps) {
  const [photoIndex, setPhotoIndex] = useState(0);
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const isSugar = profile.user_type === "sugar";
  const [showMessageInput, setShowMessageInput] = useState(autoMessage || false);
  const [messageText, setMessageText] = useState("");
  const [sendingMessage, setSendingMessage] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);
  const [togglingFav, setTogglingFav] = useState(false);

  const handleSendMessage = async () => {
    if (!messageText.trim() || sendingMessage) return;
    setSendingMessage(true);
    try {
      const { data } = await api.post(`/api/messages/start/${profile.id}`, { content: messageText.trim() });
      onClose();
      window.location.href = `/messages?match=${data.conversation_id}`;
    } catch {
      setSendingMessage(false);
    }
  };

  // Check if profile is already favorited
  useEffect(() => {
    api.get("/api/engagement/favorites").then(({ data }) => {
      if (Array.isArray(data) && data.some((p: any) => p.id === profile.id)) {
        setIsFavorited(true);
      }
    }).catch(() => {});
  }, [profile.id]);

  const handleToggleFavorite = async () => {
    if (togglingFav) return;
    setTogglingFav(true);
    try {
      if (isFavorited) {
        await api.delete(`/api/engagement/favorites/${profile.id}`);
        setIsFavorited(false);
      } else {
        await api.post(`/api/engagement/favorites/${profile.id}`);
        setIsFavorited(true);
      }
    } catch {}
    setTogglingFav(false);
  };

  useEffect(() => {
    api.post(`/api/engagement/views/${profile.id}`).catch(() => {});
  }, [profile.id]);

  const apiBase = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
  const photos = profile.photos || [];

  // Touch gesture support — swipe horizontal (photos), swipe down (dismiss)
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);
  const [dragY, setDragY] = useState(0);
  const isDragging = useRef(false);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
    isDragging.current = false;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStartY.current === null || touchStartX.current === null) return;
    const dy = e.touches[0].clientY - touchStartY.current;
    const dx = e.touches[0].clientX - touchStartX.current;
    // Only track vertical drag if moving more down than sideways and scrolled to top
    if (dy > 0 && Math.abs(dy) > Math.abs(dx) && modalRef.current?.scrollTop === 0) {
      isDragging.current = true;
      setDragY(Math.min(dy * 0.6, 200)); // damped drag
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    const dy = e.changedTouches[0].clientY - touchStartY.current;

    // Swipe down to dismiss (if dragging > 100px)
    if (isDragging.current && dragY > 80) {
      onClose();
      setDragY(0);
      touchStartX.current = null;
      touchStartY.current = null;
      return;
    }
    setDragY(0);

    // Horizontal swipe for photos (only if not vertical drag)
    if (!isDragging.current && Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) {
      if (dx < 0 && photoIndex < photos.length - 1) setPhotoIndex(i => i + 1);
      if (dx > 0 && photoIndex > 0) setPhotoIndex(i => i - 1);
    }

    isDragging.current = false;
    touchStartX.current = null;
    touchStartY.current = null;
  };

  // Tap left/right thirds of photo to navigate
  const handlePhotoTap = (e: React.MouseEvent) => {
    if (photos.length <= 1) return;
    const rect = (e.target as HTMLElement).getBoundingClientRect();
    const x = e.clientX - rect.left;
    if (x < rect.width / 3 && photoIndex > 0) setPhotoIndex(i => i - 1);
    else if (x > rect.width * 2 / 3 && photoIndex < photos.length - 1) setPhotoIndex(i => i + 1);
  };

  // Focus trap + keyboard
  useEffect(() => {
    closeButtonRef.current?.focus();
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") { onClose(); return; }
      if (e.key === "ArrowLeft" && photoIndex > 0) setPhotoIndex(i => i - 1);
      if (e.key === "ArrowRight" && photoIndex < photos.length - 1) setPhotoIndex(i => i + 1);
      if (e.key === "Tab" && modalRef.current) {
        const focusable = modalRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", handleKeyDown); document.body.style.overflow = ""; };
  }, [onClose, photoIndex, photos.length]);

  // Build stats row items
  const stats: { icon: React.ReactNode; text: string }[] = [];
  if (profile.last_active) stats.push({ icon: <Clock size={12} />, text: profile.is_online ? "Online" : timeAgo(profile.last_active) });
  if (profile.height_cm) stats.push({ icon: <User size={12} />, text: formatHeight(profile.height_cm) });
  if (profile.relationship_status) stats.push({ icon: <Heart size={12} />, text: capitalize(profile.relationship_status) });
  if (profile.body_type && stats.length < 4) stats.push({ icon: null, text: capitalize(profile.body_type) });

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-black/60"
      role="dialog"
      aria-modal="true"
      aria-label={`${profile.display_name}'s profile`}
      onClick={(e) => {
        // Close when clicking the backdrop (outer or middle wrapper, but not the modal card itself)
        const target = e.target as HTMLElement;
        if (!modalRef.current?.contains(target)) onClose();
      }}
    >
      <div className="min-h-full flex items-end md:items-center justify-center p-0 md:p-4">
        <div
          ref={modalRef}
          className="bg-card w-full max-w-lg md:rounded-2xl md:border md:border-card-border shadow-2xl rounded-t-2xl"
          style={{
            maxHeight: "95vh",
            overflowY: dragY > 0 ? "hidden" : "auto",
            WebkitOverflowScrolling: "touch",
            transform: dragY > 0 ? `translateY(${dragY}px)` : undefined,
            opacity: dragY > 0 ? 1 - dragY / 300 : 1,
            transition: dragY > 0 ? "none" : "transform 0.2s, opacity 0.2s",
          }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Swipe handle — mobile only */}
          <div className="md:hidden flex justify-center pt-2 pb-1">
            <div className="w-10 h-1 rounded-full bg-muted/30" />
          </div>

          {/* ═══ PHOTO AREA — full bleed ═══ */}
          <div
            className="relative aspect-[3/4] md:aspect-[4/3] bg-muted-bg"
            onClick={handlePhotoTap}
          >
            {photos.length > 0 ? (
              <img
                src={`${apiBase}${photos[photoIndex]?.url}`}
                alt={`${profile.display_name}, photo ${photoIndex + 1}`}
                className="w-full h-full object-cover"
                draggable={false}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-accent/10 via-muted-bg to-card">
                <span className="text-6xl font-display text-accent/30">{profile.display_name[0]}</span>
              </div>
            )}

            {/* Dot indicators at top */}
            {photos.length > 1 && (
              <div className="absolute top-3 left-0 right-0 flex justify-center gap-1 px-16">
                {photos.map((_, i) => (
                  <div
                    key={i}
                    className={`h-[3px] flex-1 rounded-full transition-all ${
                      i === photoIndex ? "bg-white" : "bg-white/30"
                    }`}
                    style={{ maxWidth: "48px" }}
                  />
                ))}
              </div>
            )}

            {/* Close button */}
            <button
              ref={closeButtonRef}
              onClick={(e) => { e.stopPropagation(); onClose(); }}
              aria-label="Close profile"
              className="absolute top-3 right-3 w-9 h-9 bg-black/40 rounded-full flex items-center justify-center text-white hover:bg-black/60 transition-colors"
            >
              <X size={16} />
            </button>

            {/* Name + headline overlay on photo */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-5 pt-20">
              <div className="flex items-center gap-2">
                <h2 className="text-white text-2xl font-bold">{profile.display_name}</h2>
                <span className="text-white/70 text-xl">{profile.age}</span>
                {profile.is_photo_verified && (
                  <BadgeCheck size={20} className="text-accent fill-accent/30" />
                )}
                {profile.is_online && (
                  <span className="w-2.5 h-2.5 bg-success rounded-full border-2 border-black/50" />
                )}
              </div>
              {profile.pronouns && profile.pronouns !== "prefer_not_to_say" && (
                <span className="text-white/50 text-sm ml-1">{formatPronouns(profile.pronouns)}</span>
              )}
              {profile.headline && (
                <p className="text-white/70 text-sm mt-0.5">{profile.headline}</p>
              )}
            </div>
          </div>

          {/* ═══ STATS ROW — compact, scannable ═══ */}
          {stats.length > 0 && (
            <div className="flex items-center divide-x divide-card-border border-b border-card-border">
              {stats.map((s, i) => (
                <div key={i} className="flex-1 flex items-center justify-center gap-1.5 py-2.5 text-xs text-muted">
                  {s.icon}
                  <span>{s.text}</span>
                </div>
              ))}
            </div>
          )}

          {/* ═══ LOCATION + CAREER ROW ═══ */}
          <div className="px-5 pt-4 flex flex-wrap gap-1.5">
            {(profile.city || profile.travel_city) && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-muted-bg text-xs rounded-full">
                <MapPin size={11} className="text-accent" />
                {profile.is_traveling ? profile.travel_city : profile.city}{profile.state && !profile.is_traveling ? `, ${profile.state}` : ""}
                {profile.distance_miles != null && <span className="text-muted"> · {profile.distance_miles} mi</span>}
              </span>
            )}
            {profile.is_traveling && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-accent/10 text-accent text-xs rounded-full">
                <Plane size={11} /> Traveling
              </span>
            )}
            {profile.occupation && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-muted-bg text-xs rounded-full">
                <Briefcase size={11} className="text-muted" /> {profile.occupation}
              </span>
            )}
            {profile.education && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-muted-bg text-xs rounded-full">
                <GraduationCap size={11} className="text-muted" /> {capitalize(profile.education)}
              </span>
            )}
          </div>

          {/* ═══ FINANCIAL BADGE ═══ */}
          {/* Verification status only. Exact income is never shown to other
              members — they see that it was checked, not the amount. */}
          {(isSugar && profile.is_income_verified) || (!isSugar && profile.lifestyle_expectation) ? (
            <div className="px-5 pt-3">
              {isSugar && profile.is_income_verified && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gold-bg text-gold text-sm rounded-lg font-medium">
                  <BadgeCheck size={14} /> Financially verified
                </span>
              )}
              {!isSugar && profile.lifestyle_expectation && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-accent/10 text-accent text-sm rounded-lg font-medium">
                  <Sparkles size={14} /> {formatLifestyle(profile.lifestyle_expectation)}
                </span>
              )}
              {profile.is_income_verified && (
                <span className="inline-flex items-center gap-1 ml-2 px-2.5 py-1 bg-success/10 text-success text-xs rounded-full font-medium">
                  <BadgeCheck size={12} /> Verified
                </span>
              )}
            </div>
          ) : null}

          {/* ═══ OPEN TO ═══ */}
          {profile.arrangement_types && profile.arrangement_types.length > 0 && (
            <div className="px-5 pt-4">
              <p className="text-[11px] uppercase tracking-wide text-muted mb-2">Open to</p>
              <div className="flex flex-wrap gap-1.5">
                {profile.arrangement_types.map((t) => (
                  <span key={t} className="px-2.5 py-1 bg-accent/5 text-accent text-xs rounded-full font-medium border border-accent/15">
                    {capitalize(t)}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* ═══ TEXT SECTIONS ═══ */}
          <div className="px-5 pt-4 pb-2 space-y-4">
            {profile.looking_for && (
              <div>
                <p className="text-[11px] uppercase tracking-wide text-muted mb-1">Looking for</p>
                <p className="text-sm leading-relaxed">{profile.looking_for}</p>
              </div>
            )}
            {profile.offering && (
              <div>
                <p className="text-[11px] uppercase tracking-wide text-muted mb-1">{isSugar ? "What I offer" : "What I bring"}</p>
                <p className="text-sm leading-relaxed">{profile.offering}</p>
              </div>
            )}
            {profile.bio && (
              <div>
                <p className="text-[11px] uppercase tracking-wide text-muted mb-1">About</p>
                <p className="text-sm leading-relaxed text-foreground/80">{profile.bio}</p>
              </div>
            )}
            {profile.ideal_first_date && (
              <div>
                <p className="text-[11px] uppercase tracking-wide text-muted mb-1">Ideal first date</p>
                <p className="text-sm leading-relaxed italic text-foreground/70">&ldquo;{profile.ideal_first_date}&rdquo;</p>
              </div>
            )}
          </div>

          {/* ═══ INTERESTS ═══ */}
          {profile.interests && profile.interests.length > 0 && (
            <div className="px-5 pt-2 pb-4">
              <p className="text-[11px] uppercase tracking-wide text-muted mb-2">Interests</p>
              <div className="flex flex-wrap gap-1.5">
                {profile.interests.map((interest) => (
                  <span key={interest} className="px-2.5 py-1 bg-muted-bg text-xs rounded-full">
                    {capitalize(interest)}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* ═══ LIFESTYLE ═══ */}
          {profile.lifestyle_tags && profile.lifestyle_tags.length > 0 && (
            <div className="px-5 pt-2 pb-4">
              <p className="text-[11px] uppercase tracking-wide text-muted mb-2">Lifestyle</p>
              <div className="flex flex-wrap gap-1.5">
                {profile.lifestyle_tags.map((tag: string) => {
                  const labels: Record<string, string> = {
                    enm: "ENM", dom: "Dom", sub: "Sub", "420_friendly": "420 Friendly",
                    open_relationship: "Open Relationship", kink_friendly: "Kink Friendly",
                    couples_friendly: "Couples Friendly", group_friendly: "Group Friendly",
                  };
                  return (
                    <span key={tag} className="px-2.5 py-1 bg-pink-500/10 text-pink-400 text-xs rounded-full">
                      {labels[tag] || tag.replace(/_/g, " ").replace(/\b\w/g, (c: string) => c.toUpperCase())}
                    </span>
                  );
                })}
              </div>
            </div>
          )}

          {/* ═══ DETAILS ROW (drinking, smoking, languages) ═══ */}
          {(profile.drinking || profile.smoking || profile.languages || (profile.sexual_orientation && profile.sexual_orientation !== "prefer_not_to_say")) && (
            <div className="px-5 pb-4 flex flex-wrap gap-x-5 gap-y-1 text-xs text-muted">
              {profile.sexual_orientation && profile.sexual_orientation !== "prefer_not_to_say" && (
                <span>Orientation: {formatOrientation(profile.sexual_orientation)}</span>
              )}
              {profile.drinking && <span>Drinks: {capitalize(profile.drinking)}</span>}
              {profile.smoking && <span>Smokes: {capitalize(profile.smoking)}</span>}
              {profile.languages && <span>Speaks: {profile.languages}</span>}
            </div>
          )}

          {/* ═══ ACTION BAR — sticky bottom ═══ */}
          <div className="sticky bottom-0 bg-card border-t border-card-border" style={{ paddingBottom: "env(safe-area-inset-bottom)" }}>
            {showMessageInput ? (
              <div className="p-3 flex gap-2">
                <input
                  autoFocus
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  onKeyDown={(e) => { if (e.key === "Enter" && messageText.trim()) handleSendMessage(); if (e.key === "Escape") { setShowMessageInput(false); setMessageText(""); } }}
                  placeholder={`Message ${profile.display_name}...`}
                  className="flex-1 px-4 py-2.5 bg-background border border-card-border rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-accent/50"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!messageText.trim() || sendingMessage}
                  className="px-5 py-2.5 bg-accent text-background rounded-full text-sm font-semibold disabled:opacity-50"
                >
                  {sendingMessage ? "..." : "Send"}
                </button>
              </div>
            ) : (
              <div className="p-3 flex gap-2">
                {onPass && (
                  <button
                    onClick={onPass}
                    aria-label="Pass"
                    className="flex items-center justify-center px-3 py-3.5 border border-card-border rounded-xl text-muted hover:text-foreground hover:bg-muted-bg transition-colors"
                  >
                    <XCircle size={18} />
                  </button>
                )}
                <button
                  onClick={onLike}
                  className="flex-1 flex items-center justify-center gap-2 py-3.5 bg-accent text-background rounded-xl font-semibold hover:bg-accent-dark transition-colors text-sm"
                >
                  <Heart size={16} /> Like
                </button>
                <button
                  onClick={() => setShowMessageInput(true)}
                  className="flex-1 flex items-center justify-center gap-2 py-3.5 border border-card-border rounded-xl font-medium hover:bg-muted-bg transition-colors text-sm"
                >
                  <MessageCircle size={16} /> Message
                </button>
                <button
                  onClick={handleToggleFavorite}
                  disabled={togglingFav}
                  aria-label={isFavorited ? "Remove from favorites" : "Save to favorites"}
                  className={`flex items-center justify-center px-3 py-3.5 border border-card-border rounded-xl transition-colors ${
                    isFavorited ? "text-accent bg-accent/10 border-accent/30" : "text-muted hover:text-accent hover:bg-accent/5"
                  }`}
                >
                  <Bookmark size={18} className={isFavorited ? "fill-accent" : ""} />
                </button>
                {(onBlock || onReport) && (
                  <div className="flex">
                    {onReport && (
                      <button onClick={onReport} aria-label="Report" className="px-2.5 py-3.5 text-muted hover:text-danger transition-colors">
                        <Flag size={15} />
                      </button>
                    )}
                    {onBlock && (
                      <button onClick={onBlock} aria-label="Block" className="px-2.5 py-3.5 text-muted hover:text-danger transition-colors">
                        <Ban size={15} />
                      </button>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
