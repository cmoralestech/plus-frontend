"use client";

export function CardSkeleton() {
  return (
    <div className="bg-card rounded-xl border border-card-border overflow-hidden animate-pulse">
      <div className="aspect-[3/4] bg-muted-bg" />
      <div className="p-3 space-y-2">
        <div className="h-4 bg-muted-bg rounded w-2/3" />
        <div className="h-3 bg-muted-bg rounded w-1/3" />
      </div>
    </div>
  );
}

export function StackSkeleton() {
  return (
    <div className="bg-card rounded-2xl border border-card-border overflow-hidden max-w-lg mx-auto animate-pulse">
      <div className="aspect-[3/4] bg-muted-bg" />
      <div className="p-5 space-y-3">
        <div className="h-5 bg-muted-bg rounded w-1/2" />
        <div className="h-3 bg-muted-bg rounded w-full" />
        <div className="h-3 bg-muted-bg rounded w-3/4" />
      </div>
      <div className="flex justify-center gap-6 p-5 pt-0">
        <div className="w-14 h-14 rounded-full bg-muted-bg" />
        <div className="w-14 h-14 rounded-full bg-muted-bg" />
      </div>
    </div>
  );
}

export function ListItemSkeleton() {
  return (
    <div className="flex items-center gap-4 p-4 bg-card rounded-xl border border-card-border animate-pulse">
      <div className="w-14 h-14 rounded-full bg-muted-bg flex-shrink-0" />
      <div className="flex-1 space-y-2">
        <div className="h-4 bg-muted-bg rounded w-1/3" />
        <div className="h-3 bg-muted-bg rounded w-2/3" />
      </div>
    </div>
  );
}

export function ProfileSkeleton() {
  return (
    <div className="bg-card rounded-2xl border border-card-border overflow-hidden animate-pulse">
      <div className="h-48 bg-muted-bg" />
      <div className="pt-16 px-6 pb-6 space-y-4">
        <div className="h-6 bg-muted-bg rounded w-1/3" />
        <div className="h-4 bg-muted-bg rounded w-1/2" />
        <div className="flex gap-2">
          <div className="h-8 bg-muted-bg rounded-lg w-24" />
          <div className="h-8 bg-muted-bg rounded-lg w-20" />
          <div className="h-8 bg-muted-bg rounded-lg w-16" />
        </div>
        <div className="h-3 bg-muted-bg rounded w-full" />
        <div className="h-3 bg-muted-bg rounded w-3/4" />
      </div>
    </div>
  );
}
