"use client";

import { useState, useRef } from "react";
import api from "@/lib/api";
import { Photo } from "@/lib/store";
import { Plus, X, Star, Loader2, ImagePlus } from "lucide-react";

interface PhotoUploadProps {
  photos: Photo[];
  onUpdate: () => void;
  maxPhotos?: number;
}

export default function PhotoUpload({
  photos,
  onUpdate,
  maxPhotos = 6,
}: PhotoUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
      setError("Only JPEG, PNG, and WebP images are allowed");
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      setError("File too large (max 10MB)");
      return;
    }

    setError("");
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("is_primary", photos.length === 0 ? "true" : "false");
      await api.post("/api/photos/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'photo_upload', { context: 'onboarding' });
      }
      onUpdate();
    } catch (err: any) {
      setError(err.response?.data?.detail || "Upload failed");
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleDelete = async (photoId: number) => {
    try {
      await api.delete(`/api/photos/${photoId}`);
      onUpdate();
    } catch (err: any) {
      setError(err.response?.data?.detail || "Delete failed");
    }
  };

  const handleSetPrimary = async (photoId: number) => {
    try {
      await api.patch(`/api/photos/${photoId}/primary`);
      onUpdate();
    } catch (err: any) {
      setError(err.response?.data?.detail || "Failed to set primary");
    }
  };

  const apiBase = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

  return (
    <div>
      <div className="grid grid-cols-3 gap-3">
        {photos.map((photo) => (
          <div
            key={photo.id}
            className="aspect-square rounded-xl bg-muted-bg relative overflow-hidden group border border-card-border"
          >
            <img
              src={`${apiBase}${photo.url}`}
              alt="Profile photo"
              loading="lazy"
              className="w-full h-full object-cover"
            />
            {photo.is_primary && (
              <div className="absolute top-1.5 left-1.5 bg-accent text-[#F5EDE4] px-1.5 py-0.5 rounded text-xs font-medium flex items-center gap-0.5">
                <Star size={10} />
                Main
              </div>
            )}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
              {!photo.is_primary && (
                <button
                  onClick={() => handleSetPrimary(photo.id)}
                  aria-label="Set as primary photo"
                  className="w-10 h-10 bg-white/90 rounded-full flex items-center justify-center text-accent hover:bg-white transition-colors focus-visible:ring-2 focus-visible:ring-accent"
                >
                  <Star size={14} />
                </button>
              )}
              <button
                onClick={() => handleDelete(photo.id)}
                aria-label="Delete photo"
                className="w-10 h-10 bg-white/90 rounded-full flex items-center justify-center text-danger hover:bg-white transition-colors focus-visible:ring-2 focus-visible:ring-danger"
              >
                <X size={14} />
              </button>
            </div>
          </div>
        ))}

        {photos.length < maxPhotos && (
          <label className="aspect-square rounded-xl border-2 border-dashed border-card-border hover:border-accent/50 cursor-pointer flex flex-col items-center justify-center gap-1.5 text-muted hover:text-accent transition-colors">
            {uploading ? (
              <Loader2 size={24} className="animate-spin" />
            ) : (
              <>
                <ImagePlus size={24} />
                <span className="text-xs font-medium">Add photo</span>
              </>
            )}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={handleUpload}
              className="hidden"
              disabled={uploading}
            />
          </label>
        )}
      </div>

      {error && (
        <p className="text-danger text-xs mt-2 bg-danger/5 px-3 py-1.5 rounded-lg">
          {error}
        </p>
      )}

      <p className="text-xs text-muted mt-2">
        {photos.length}/{maxPhotos} photos. First photo is your main photo.
      </p>
    </div>
  );
}
