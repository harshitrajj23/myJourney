"use client";

import React, { useState, useMemo } from "react";
import {
  Image as ImageIcon,
  Plus,
  Trash2,
  Copy,
  Check,
  Maximize2,
  Search,
  ExternalLink,
  X,
} from "lucide-react";

interface MediaVaultTabProps {
  imageMap: Record<string, string[]>;
  onSaveImageMap: (updated: Record<string, string[]>) => void;
}

export default function MediaVaultTab({
  imageMap,
  onSaveImageMap,
}: MediaVaultTabProps) {
  const [selectedAlbum, setSelectedAlbum] = useState<string>("all");
  const [search, setSearch] = useState("");
  const [copiedPath, setCopiedPath] = useState<string | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newAlbumName, setNewAlbumName] = useState("");
  const [newImagePath, setNewImagePath] = useState("");

  const albumList = useMemo(() => {
    return Object.keys(imageMap).sort();
  }, [imageMap]);

  const allAssets = useMemo(() => {
    const list: { album: string; path: string }[] = [];
    Object.entries(imageMap).forEach(([album, paths]) => {
      paths.forEach((p) => {
        list.push({ album, path: p });
      });
    });
    return list;
  }, [imageMap]);

  const filteredAssets = useMemo(() => {
    return allAssets.filter((item) => {
      const matchAlbum =
        selectedAlbum === "all" || item.album === selectedAlbum;
      const matchSearch =
        item.path.toLowerCase().includes(search.toLowerCase()) ||
        item.album.toLowerCase().includes(search.toLowerCase());
      return matchAlbum && matchSearch;
    });
  }, [allAssets, selectedAlbum, search]);

  const copyToClipboard = (path: string) => {
    navigator.clipboard.writeText(path);
    setCopiedPath(path);
    setTimeout(() => setCopiedPath(null), 2000);
  };

  const handleDeleteAsset = (album: string, pathToDelete: string) => {
    if (confirm(`Remove asset ${pathToDelete} from album "${album}"?`)) {
      const copy = { ...imageMap };
      copy[album] = copy[album].filter((p) => p !== pathToDelete);
      onSaveImageMap(copy);
    }
  };

  const handleAddAsset = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAlbumName.trim() || !newImagePath.trim()) return;

    const copy = { ...imageMap };
    const targetAlbum = newAlbumName.trim();
    if (!copy[targetAlbum]) {
      copy[targetAlbum] = [];
    }

    if (!copy[targetAlbum].includes(newImagePath.trim())) {
      copy[targetAlbum] = [...copy[targetAlbum], newImagePath.trim()];
    }

    onSaveImageMap(copy);
    setShowAddModal(false);
    setNewImagePath("");
    setSelectedAlbum(targetAlbum);
  };

  return (
    <div className="space-y-6">
      {/* Top Controller Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-[#090d16] border border-white/5">
        <div className="flex flex-wrap items-center gap-3 flex-1">
          {/* Search Bar */}
          <div className="relative min-w-[200px] flex-1 max-w-sm">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search assets, album keys..."
              className="w-full pl-10 pr-4 py-2 bg-white/[0.03] border border-white/10 rounded-xl text-xs text-white placeholder-white/30 focus:outline-none focus:border-cyan-500/50"
            />
          </div>

          {/* Album Selector */}
          <select
            value={selectedAlbum}
            onChange={(e) => setSelectedAlbum(e.target.value)}
            className="px-3 py-2 bg-white/[0.03] border border-white/10 rounded-xl text-xs text-white/80 focus:outline-none focus:border-cyan-500/50"
          >
            <option value="all" className="bg-[#090d16]">
              All Albums ({allAssets.length} assets)
            </option>
            {albumList.map((alb) => (
              <option key={alb} value={alb} className="bg-[#090d16]">
                {alb} ({imageMap[alb].length})
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-pink-600 hover:bg-pink-500 text-white font-medium text-xs tracking-wide transition-all shadow-[0_0_20px_rgba(236,72,153,0.3)] cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Register Media Asset</span>
        </button>
      </div>

      {/* Album Badges Scroller */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
        <button
          onClick={() => setSelectedAlbum("all")}
          className={`px-3 py-1.5 rounded-xl text-xs font-mono shrink-0 transition-colors cursor-pointer ${
            selectedAlbum === "all"
              ? "bg-pink-500/20 text-pink-300 border border-pink-500/40"
              : "bg-white/[0.02] text-white/40 hover:text-white border border-white/5"
          }`}
        >
          All ({allAssets.length})
        </button>
        {albumList.map((alb) => (
          <button
            key={alb}
            onClick={() => setSelectedAlbum(alb)}
            className={`px-3 py-1.5 rounded-xl text-xs font-mono shrink-0 transition-colors cursor-pointer ${
              selectedAlbum === alb
                ? "bg-pink-500/20 text-pink-300 border border-pink-500/40"
                : "bg-white/[0.02] text-white/40 hover:text-white border border-white/5"
            }`}
          >
            {alb} ({imageMap[alb].length})
          </button>
        ))}
      </div>

      {/* Assets Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {filteredAssets.length === 0 ? (
          <div className="col-span-full p-12 text-center rounded-2xl bg-[#090d16] border border-white/5">
            <ImageIcon className="w-8 h-8 text-white/20 mx-auto mb-3" />
            <p className="text-sm text-white/50">No media assets match your query.</p>
          </div>
        ) : (
          filteredAssets.map((asset, idx) => {
            return (
              <div
                key={`${asset.album}-${asset.path}-${idx}`}
                className="group relative rounded-2xl bg-[#090d16] border border-white/5 hover:border-pink-500/30 overflow-hidden flex flex-col justify-between transition-all duration-200"
              >
                {/* Image Container */}
                <div
                  onClick={() => setPreviewImage(asset.path)}
                  className="relative aspect-video w-full bg-black/40 overflow-hidden cursor-pointer"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={asset.path}
                    alt={asset.album}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Maximize2 className="w-5 h-5 text-white drop-shadow" />
                  </div>
                  <span className="absolute top-2 left-2 px-1.5 py-0.5 rounded text-[9px] font-mono bg-black/60 backdrop-blur-md text-white/70">
                    WEBP
                  </span>
                </div>

                {/* Info & Footer */}
                <div className="p-3 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-pink-400 truncate">
                      {asset.album}
                    </span>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => copyToClipboard(asset.path)}
                        title="Copy image URL"
                        className="p-1 rounded text-white/40 hover:text-white cursor-pointer"
                      >
                        {copiedPath === asset.path ? (
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                      <button
                        onClick={() =>
                          handleDeleteAsset(asset.album, asset.path)
                        }
                        title="Remove asset"
                        className="p-1 rounded text-red-400/60 hover:text-red-400 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                  <p
                    className="text-[10px] font-mono text-white/30 truncate"
                    title={asset.path}
                  >
                    {asset.path}
                  </p>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Lightbox Preview Modal */}
      {previewImage && (
        <div
          onClick={() => setPreviewImage(null)}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-6"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-4xl max-h-[85vh] rounded-2xl overflow-hidden bg-[#090d16] border border-white/10"
          >
            <button
              onClick={() => setPreviewImage(null)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/60 text-white/70 hover:text-white cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={previewImage}
              alt="Asset Preview"
              className="max-h-[80vh] w-auto object-contain mx-auto"
              decoding="async"
            />
            <div className="p-4 border-t border-white/5 flex items-center justify-between text-xs font-mono text-white/50">
              <span>{previewImage}</span>
              <a
                href={previewImage}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-pink-400 hover:text-pink-300"
              >
                <span>Full Resolution</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Add Media Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-[#0a0e17] border border-white/10 rounded-2xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-white/5">
              <h3 className="text-base font-bold text-white">
                Register Media Asset
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-white/40 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddAsset} className="space-y-4">
              <div>
                <label className="block text-xs font-mono text-white/60 mb-1">
                  Target Album Folder
                </label>
                <input
                  type="text"
                  list="album-options"
                  value={newAlbumName}
                  onChange={(e) => setNewAlbumName(e.target.value)}
                  placeholder="e.g. trips, nakshatra, mediAi..."
                  required
                  className="w-full px-3 py-2 bg-white/[0.03] border border-white/10 rounded-xl text-xs text-white placeholder-white/30 focus:outline-none focus:border-pink-500/50"
                />
                <datalist id="album-options">
                  {albumList.map((a) => (
                    <option key={a} value={a} />
                  ))}
                </datalist>
              </div>

              <div>
                <label className="block text-xs font-mono text-white/60 mb-1">
                  Image Path / Public URL
                </label>
                <input
                  type="text"
                  value={newImagePath}
                  onChange={(e) => setNewImagePath(e.target.value)}
                  placeholder="e.g. /images/trips/image.webp"
                  required
                  className="w-full px-3 py-2 bg-white/[0.03] border border-white/10 rounded-xl text-xs text-white placeholder-white/30 focus:outline-none focus:border-pink-500/50"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl text-xs text-white/50 hover:text-white cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-pink-600 hover:bg-pink-500 text-white font-medium text-xs shadow-lg cursor-pointer"
                >
                  Save Asset
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
