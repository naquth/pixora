"use client";
import { useState, useRef } from "react";
import Image from "next/image";
import { X, ImagePlus, MapPin, Tag, Smile, ChevronLeft, Loader2 } from "lucide-react";
import { useAppStore } from "@/lib/store";
import { cn } from "@/lib/utils";
import { Post } from "@/types";

const STEPS = ["upload", "filter", "details"] as const;
type Step = typeof STEPS[number];

const FILTERS = [
  { name: "Normal", css: "" },
  { name: "Clarendon", css: "brightness-110 contrast-110 saturate-150" },
  { name: "Moon", css: "grayscale brightness-110 contrast-110" },
  { name: "Fade", css: "brightness-110 contrast-90 saturate-80" },
  { name: "Lark", css: "brightness-115 contrast-95 saturate-110" },
  { name: "Reyes", css: "brightness-110 saturate-75 sepia-[20%]" },
  { name: "Gingham", css: "brightness-105 hue-rotate-[350deg]" },
  { name: "Juno", css: "contrast-105 saturate-150 brightness-105" },
];

export default function CreatePostModal() {
  const { showCreateModal, setShowCreateModal, currentUser, addPost } = useAppStore();
  const [step, setStep] = useState<Step>("upload");
  const [preview, setPreview] = useState<string | null>(null);
  const [filter, setFilter] = useState(FILTERS[0]);
  const [caption, setCaption] = useState("");
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  if (!showCreateModal) return null;

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setPreview(url);
    setStep("filter");
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setPreview(url);
    setStep("filter");
  };

  const handleShare = async () => {
    setLoading(true);
    await new Promise(r => setTimeout(r, 1200));
    const newPost: Post = {
      id: `new_${Date.now()}`,
      author: currentUser,
      images: [preview || "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80"],
      caption,
      likes: 0,
      comments: 0,
      saves: 0,
      shares: 0,
      isLiked: false,
      isSaved: false,
      tags: [],
      location: location || undefined,
      createdAt: new Date().toISOString(),
    };
    addPost(newPost);
    setLoading(false);
    setShowCreateModal(false);
    setPreview(null);
    setCaption("");
    setLocation("");
    setStep("upload");
    setFilter(FILTERS[0]);
  };

  const handleClose = () => {
    setShowCreateModal(false);
    setPreview(null);
    setCaption("");
    setLocation("");
    setStep("upload");
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4 animate-fade-in"
      onClick={handleClose}
    >
      <div
        className="bg-[var(--bg)] rounded-2xl overflow-hidden w-full max-w-lg shadow-2xl animate-scale-in"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--border)]">
          <button
            onClick={step === "upload" ? handleClose : () => setStep(STEPS[STEPS.indexOf(step) - 1])}
            className="text-[var(--text-muted)] hover:text-[var(--text)] p-1"
          >
            {step === "upload" ? <X size={20} /> : <ChevronLeft size={20} />}
          </button>
          <h2 className="text-sm font-semibold text-[var(--text)]">
            {step === "upload" ? "Create new post" : step === "filter" ? "Apply filter" : "New post"}
          </h2>
          {step !== "upload" && (
            <button
              onClick={step === "details" ? handleShare : () => setStep(STEPS[STEPS.indexOf(step) + 1])}
              disabled={loading}
              className="text-sm font-semibold text-sky-500 hover:text-sky-600 disabled:opacity-50"
            >
              {loading ? <Loader2 size={16} className="animate-spin" /> : step === "details" ? "Share" : "Next"}
            </button>
          )}
          {step === "upload" && <div className="w-8" />}
        </div>

        {/* Step: Upload */}
        {step === "upload" && (
          <div
            className="flex flex-col items-center justify-center h-80 gap-4 text-[var(--text-muted)] cursor-pointer hover:bg-[var(--bg-subtle)] transition-colors"
            onDrop={handleDrop}
            onDragOver={e => e.preventDefault()}
            onClick={() => fileRef.current?.click()}
          >
            <div className="w-20 h-20 rounded-2xl bg-[var(--bg-muted)] flex items-center justify-center">
              <ImagePlus size={36} className="text-[var(--text-muted)]" />
            </div>
            <div className="text-center">
              <p className="text-lg font-medium text-[var(--text)] mb-1">Drag photos here</p>
              <p className="text-sm text-[var(--text-muted)]">or click to select from device</p>
            </div>
            <button className="px-5 py-2.5 bg-sky-500 hover:bg-sky-600 text-white text-sm font-semibold rounded-xl transition-colors">
              Select from computer
            </button>
            <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />
          </div>
        )}

        {/* Step: Filter */}
        {step === "filter" && preview && (
          <div>
            <div className="relative aspect-square bg-black">
              <Image src={preview} alt="preview" fill className={cn("object-cover", filter.css)} />
            </div>
            <div className="p-4">
              <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
                {FILTERS.map(f => (
                  <button
                    key={f.name}
                    onClick={() => setFilter(f)}
                    className={cn(
                      "flex flex-col items-center gap-1.5 flex-shrink-0",
                      filter.name === f.name && "opacity-100",
                      filter.name !== f.name && "opacity-60 hover:opacity-80"
                    )}
                  >
                    <div className={cn("w-16 h-16 rounded-xl overflow-hidden ring-2 transition-all", filter.name === f.name ? "ring-sky-500" : "ring-transparent")}>
                      <Image src={preview} alt={f.name} width={64} height={64} className={cn("w-full h-full object-cover", f.css)} />
                    </div>
                    <span className={cn("text-[11px] font-medium", filter.name === f.name ? "text-sky-500" : "text-[var(--text-muted)]")}>{f.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Step: Details */}
        {step === "details" && preview && (
          <div className="flex flex-col md:flex-row">
            <div className="relative w-full md:w-64 aspect-square flex-shrink-0">
              <Image src={preview} alt="preview" fill className={cn("object-cover", filter.css)} />
            </div>
            <div className="flex-1 p-4 space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
                  <Image src={currentUser.avatar} alt="me" width={32} height={32} className="w-full h-full object-cover" />
                </div>
                <textarea
                  value={caption}
                  onChange={e => setCaption(e.target.value)}
                  placeholder="Write a caption…"
                  rows={4}
                  className="flex-1 bg-transparent text-sm text-[var(--text)] placeholder-[var(--text-muted)] outline-none resize-none"
                />
              </div>
              <div className="flex items-center justify-between text-[var(--text-muted)]">
                <button><Smile size={18} /></button>
                <span className="text-xs">{caption.length}/2200</span>
              </div>
              <div className="border-t border-[var(--border)] pt-3">
                <div className="flex items-center gap-3">
                  <MapPin size={18} className="text-[var(--text-muted)]" />
                  <input
                    type="text"
                    value={location}
                    onChange={e => setLocation(e.target.value)}
                    placeholder="Add location"
                    className="flex-1 bg-transparent text-sm text-[var(--text)] placeholder-[var(--text-muted)] outline-none"
                  />
                </div>
              </div>
              <div className="border-t border-[var(--border)] pt-3">
                <div className="flex items-center gap-3">
                  <Tag size={18} className="text-[var(--text-muted)]" />
                  <span className="text-sm text-[var(--text-muted)]">Tag people</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
