import { create } from "zustand";
import api from "./api";

export interface User {
  id: number;
  email: string;
  user_type: "established" | "plus";
  is_verified: boolean;
  created_at: string;
  has_profile: boolean;
}

export interface Photo {
  id: number;
  url: string;
  is_primary: boolean;
  is_verified: boolean;
  is_private: boolean;
  order: number;
}

export interface Profile {
  id: number;
  user_id: number;
  user_type?: string;
  display_name: string;
  bio?: string;
  headline?: string;
  date_of_birth: string;
  age?: number;
  gender: string;
  seeking_gender?: string;
  city?: string;
  state?: string;
  country?: string;
  height_cm?: number;
  body_type?: string;
  ethnicity?: string;
  education?: string;
  occupation?: string;
  languages?: string;
  income_range?: string;
  net_worth_range?: string;
  lifestyle_expectation?: string;
  looking_for?: string;
  offering?: string;
  arrangement_types?: string[];
  interests?: string[];
  lifestyle_tags?: string[];
  relationship_status?: string;
  availability?: string;
  drinking?: string;
  smoking?: string;
  has_children?: boolean;
  ideal_first_date?: string;
  /** How you like to show up (max 4). */
  show_up_traits?: string[];
  /** What you're looking for in your + (max 5). */
  plus_traits?: string[];
  generosity?: string;
  net_worth?: string;
  sexual_orientation?: string;
  pronouns?: string;
  is_online?: boolean;
  last_active?: string;
  is_photo_verified: boolean;
  is_income_verified?: boolean;
  /** Demonstration profile — labelled in the UI and not interactive. */
  is_seed?: boolean;
  is_traveling?: boolean;
  travel_city?: string;
  distance_miles?: number;
  is_featured?: boolean;
  is_new?: boolean;
  is_popular?: boolean;
  subscription_tier?: string;
  photos: Photo[];
  created_at: string;
}

export interface Match {
  id: number;
  profile: Profile;
  created_at: string;
  has_conversation: boolean;
  last_message?: string;
  unread_count: number;
}

export interface Message {
  id: number;
  conversation_id: number;
  sender_profile_id: number;
  sender_name?: string;
  content: string;
  is_read: boolean;
  locked?: boolean;
  created_at: string;
}

export interface Conversation {
  id: number;
  match_id: number;
  other_profile?: Profile;
  last_message?: Message;
  unread_count: number;
  can_read?: boolean;
  created_at: string;
  updated_at: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
  setAuth: (user: User, token: string) => void;
  logout: () => void;
  checkAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: typeof window !== "undefined" ? localStorage.getItem("token") : null,
  loading: true,
  setAuth: (user, token) => {
    localStorage.setItem("token", token);
    set({ user, token, loading: false });
  },
  logout: () => {
    localStorage.removeItem("token");
    set({ user: null, token: null, loading: false });
  },
  checkAuth: async () => {
    if (typeof window === "undefined") {
      set({ loading: false });
      return;
    }
    // If user is already set (e.g. from setAuth after login), skip the API check
    const state = useAuthStore.getState();
    if (state.user) {
      set({ loading: false });
      return;
    }
    const token = localStorage.getItem("token");
    if (!token) {
      set({ loading: false });
      return;
    }
    try {
      const { data } = await api.get("/api/auth/me");
      set({ user: data, token, loading: false });
    } catch {
      localStorage.removeItem("token");
      set({ user: null, token: null, loading: false });
    }
  },
}));
