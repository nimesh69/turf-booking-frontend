import React, { useState, useEffect, useCallback, useRef } from 'react';
import { FiPlus, FiTrash2, FiCheck, FiImage, FiAlertTriangle, FiUpload, FiX } from 'react-icons/fi';
import { useToast } from '../../hooks/useToast';
import chatApi from '../../api/chatApi';
import { resizeToSquarePNG } from '../../utils/resizeToSquarePNG';

const MAX = 10;
const PREVIEW_MAX = 20;

export default function Gallery() {
  const showToast = useToast();
  const fileRef = useRef(null);
  const dragCounter = useRef(0);
  const previewScrollRef = useRef(null);

  const [uploaded, setUploaded] = useState([]);
  const [preview, setPreview] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [selectedIds, setSelectedIds] = useState(new Set());
  const [isLoading, setIsLoading] = useState(true);
  const [isDragging, setIsDragging] = useState(false);

  const usedSlots = uploaded.length;
  const remaining = MAX - usedSlots;
  const previewCount = preview.length;
  const totalInPreview = usedSlots + previewCount;
  const allSelected = uploaded.length > 0 && selectedIds.size === uploaded.length;

  useEffect(() => { fetchImages(); }, []);

  // Auto-scroll to bottom when new preview items added
  useEffect(() => {
    if (previewScrollRef.current && previewCount > 0) {
      previewScrollRef.current.scrollTop = previewScrollRef.current.scrollHeight;
    }
  }, [previewCount]);

  const fetchImages = useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await chatApi.getGalleryImages();
      setUploaded(res.data.images || []);
    } catch {
      showToast('Failed to load gallery', 'error');
    } finally {
      setIsLoading(false);
    }
  }, [showToast]);

  // ── Add files to preview (no API call yet) ────────────────────────────────
  const handleFiles = useCallback((files) => {
    const imgs = files.filter((f) => f.type.startsWith('image/'));
    if (!imgs.length) return;

    const availablePreviewSlots = PREVIEW_MAX - previewCount;
    const allowed = imgs.slice(0, Math.max(availablePreviewSlots, 0));
    const skipped = imgs.length - allowed.length;

    if (skipped > 0) {
      showToast(`Preview limit: ${PREVIEW_MAX} images max. ${skipped} image${skipped !== 1 ? 's' : ''} skipped.`, 'error');
    }
    if (!allowed.length) return;

    const newPreviewItems = allowed.map((file) => ({
      id: `preview-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      url: URL.createObjectURL(file),
      file,
    }));

    setPreview((prev) => [...prev, ...newPreviewItems]);
  }, [previewCount, showToast]);

  // ── Remove single image from preview ──────────────────────────────────────
  const removeFromPreview = useCallback((id) => {
    setPreview((prev) => {
      const item = prev.find((p) => p.id === id);
      if (item) URL.revokeObjectURL(item.url);
      return prev.filter((p) => p.id !== id);
    });
  }, []);

  // ── Clear all preview ─────────────────────────────────────────────────────
  const clearPreview = useCallback(() => {
    preview.forEach((p) => URL.revokeObjectURL(p.url));
    setPreview([]);
  }, [preview]);

  // ── Upload to backend ─────────────────────────────────────────────────────
  const handleUpload = useCallback(async () => {
    if (previewCount === 0) return;
    if (previewCount > remaining) {
      showToast(`You can only upload ${remaining} more image${remaining !== 1 ? 's' : ''}. Remove ${previewCount - remaining} from preview.`, 'error');
      return;
    }

    setUploading(true);
    try {
      const pngs = await Promise.all(preview.map((p) => resizeToSquarePNG(p.file)));
      await chatApi.uploadGalleryImages(pngs);
      showToast(`${pngs.length} image${pngs.length !== 1 ? 's' : ''} uploaded`, 'success');

      preview.forEach((p) => URL.revokeObjectURL(p.url));
      setPreview([]);
      await fetchImages();
    } catch (err) {
      showToast(err?.response?.data?.error || 'Upload failed', 'error');
    } finally {
      setUploading(false);
    }
  }, [preview, previewCount, remaining, fetchImages, showToast]);

  // ── Drag & drop ───────────────────────────────────────────────────────────
  const onDragEnter = (e) => { e.preventDefault(); dragCounter.current++; setIsDragging(true); };
  const onDragLeave = (e) => { e.preventDefault(); if (!--dragCounter.current) setIsDragging(false); };
  const onDragOver = (e) => e.preventDefault();
  const onDrop = (e) => {
    e.preventDefault();
    dragCounter.current = 0;
    setIsDragging(false);
    handleFiles(Array.from(e.dataTransfer.files));
  };

  // ── Selection / removal of uploaded images ─────────────────────────────────
  const toggleSelect = (id) =>
    setSelectedIds((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });

  const toggleSelectAll = useCallback(() => {
    setSelectedIds((prev) =>
      prev.size === uploaded.length
        ? new Set()
        : new Set(uploaded.map((img) => img.id))
    );
  }, [uploaded]);

  const handleRemove = async () => {
    if (!selectedIds.size) return;
    const ids = Array.from(selectedIds);
    setUploaded((prev) => prev.filter((g) => !selectedIds.has(g.id)));
    setSelectedIds(new Set());
    try {
      await Promise.all(ids.map((id) => chatApi.deleteGalleryImage(id)));
      showToast(`${ids.length} image${ids.length !== 1 ? 's' : ''} removed`, 'success');
    } catch (err) {
      showToast('Failed to remove some images', 'error');
      await fetchImages();
    }
  };

  const canAddToPreview = previewCount < PREVIEW_MAX && !uploading;
  const canUpload = previewCount > 0 &&
    previewCount <= remaining &&
    !uploading &&
    totalInPreview <= MAX;
  const uploadDisabledReason = previewCount === 0 ? 'No images to upload' :
    previewCount > remaining ? `Max ${remaining} can be uploaded (you have ${usedSlots} already)` :
      totalInPreview > MAX ? 'Total would exceed 10' : null;

  const usedPct = Math.round((usedSlots / MAX) * 100);

  return (
    <div className="gal-page">
      <div className="gal-wrap">

        {/* ── Header ── */}
        <header className="gal-header">
          <div>
            <h1 className="gal-title">Gallery</h1>
            <p className="gal-sub">Your images, available across all your messages</p>
          </div>
          {!isLoading && (
            <div className="gal-quota">
              <div className="gal-quota__bar">
                <div className="gal-quota__fill" style={{ width: `${usedPct}%` }} />
              </div>
              <span className="gal-quota__label">{usedSlots} / {MAX}</span>
            </div>
          )}
        </header>

        {/* ── Preview Section (Fixed Height + Scroll) ── */}
        {previewCount > 0 && (
          <div className="gal-preview-section">
            <div className="gal-preview-header">
              <div className="gal-preview-info">
                <span className="gal-preview-count">
                  {previewCount} in preview
                </span>
                {previewCount > remaining && (
                  <span className="gal-preview-warning">
                    <FiAlertTriangle size={13} />
                    Only {remaining} slot{remaining !== 1 ? 's' : ''} remaining — remove {previewCount - remaining} to upload
                  </span>
                )}
                {previewCount <= remaining && (
                  <span className="gal-preview-ready">
                    <FiCheck size={13} />
                    Will upload {previewCount} of {remaining} remaining slot{remaining !== 1 ? 's' : ''}
                  </span>
                )}
              </div>
              <div className="gal-preview-actions">
                <button
                  className="gal-btn gal-btn--outline"
                  onClick={clearPreview}
                  disabled={uploading}
                >
                  <FiX size={14} />
                  Clear All
                </button>
                <button
                  className="gal-btn gal-btn--primary"
                  onClick={handleUpload}
                  disabled={!canUpload}
                  title={uploadDisabledReason || 'Upload to gallery'}
                >
                  <FiUpload size={14} />
                  Upload {previewCount > 0 && `(${previewCount})`}
                </button>
              </div>
            </div>

            <div className="gal-preview-scroll" ref={previewScrollRef}>
              <div className="gal-preview-grid">
                {preview.map((p, i) => (
                  <PreviewCard
                    key={p.id}
                    preview={p}
                    index={i}
                    onRemove={() => removeFromPreview(p.id)}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── Toolbar for uploaded selection (incl. Select All) ── */}
        {previewCount === 0 && uploaded.length > 0 && (
          <div className="gal-toolbar">
            <label className="gal-toolbar__select-all">
              <input
                type="checkbox"
                checked={allSelected}
                onChange={toggleSelectAll}
                aria-label={allSelected ? 'Deselect all images' : 'Select all images'}
              />
              {allSelected ? 'Deselect all' : 'Select all'}
            </label>

            {selectedIds.size > 0 && (
              <>
                <span className="gal-toolbar__count">
                  {selectedIds.size} selected
                </span>
                <span className="gal-spacer" />
                <button className="gal-btn gal-btn--remove" onClick={handleRemove}>
                  <FiTrash2 size={14} />
                  Remove ({selectedIds.size})
                </button>
                <button className="gal-btn gal-btn--outline" onClick={() => setSelectedIds(new Set())}>
                  Cancel
                </button>
              </>
            )}
          </div>
        )}

        {/* ── Main Grid (Uploaded Images) ── */}
        <div
          className={`gal-drop-zone${isDragging ? ' gal-drop-zone--active' : ''}`}
          onDragEnter={onDragEnter}
          onDragLeave={onDragLeave}
          onDragOver={onDragOver}
          onDrop={onDrop}
        >
          {isLoading ? (
            <SkeletonGrid />
          ) : (
            <div className="gal-grid">
              {/* Add tile */}
              {canAddToPreview && (
                <button
                  className="gal-card gal-card--add"
                  onClick={() => fileRef.current?.click()}
                  aria-label="Add images"
                >
                  <FiPlus size={22} />
                  <span>Add</span>
                </button>
              )}

              {/* Uploaded covers */}
              {uploaded.map((img, i) => (
                <UploadedCard
                  key={img.id}
                  img={img}
                  index={i}
                  selected={selectedIds.has(img.id)}
                  onToggle={() => toggleSelect(img.id)}
                />
              ))}

              {/* Empty state */}
              {!uploaded.length && previewCount === 0 && (
                <EmptyState onAdd={() => fileRef.current?.click()} />
              )}
            </div>
          )}

          {isDragging && (
            <div className="gal-drop-overlay">
              <FiPlus size={28} />
              <span>Drop to preview</span>
            </div>
          )}
        </div>

        {/* ── Notices ── */}
        {!isLoading && remaining === 0 && previewCount === 0 && (
          <div className="gal-notice">
            <FiAlertTriangle size={13} />
            Gallery is full — remove images to add new ones
          </div>
        )}

        {!isLoading && previewCount === 0 && remaining > 0 && (
          <div className="gal-notice gal-notice--info">
            <FiImage size={13} />
            You can upload up to {remaining} more image{remaining !== 1 ? 's' : ''}
          </div>
        )}

      </div>

      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        multiple
        onChange={(e) => { handleFiles(Array.from(e.target.files)); e.target.value = ''; }}
        style={{ display: 'none' }}
      />
    </div>
  );
}

// ── Sub-components ────────────────────────────────────────────────────────────

function SkeletonGrid() {
  return (
    <div className="gal-grid">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="gal-card gal-card--skeleton" style={{ '--i': i }} />
      ))}
    </div>
  );
}

function EmptyState({ onAdd }) {
  return (
    <div className="gal-empty" onClick={onAdd} role="button" tabIndex={0}>
      <div className="gal-empty__icon"><FiImage size={24} /></div>
      <p className="gal-empty__title">No cover images yet</p>
      <p className="gal-empty__hint">Drag & drop images here, or click <strong>Add</strong></p>
    </div>
  );
}

function PreviewCard({ preview, index, onRemove }) {
  return (
    <div className="gal-card gal-card--preview" style={{ '--i': index }}>
      <img src={preview.url} alt="" className="gal-card__img" />
      <div className="gal-card__scrim" />
      <button
        className="gal-card__remove-btn"
        onClick={(e) => { e.stopPropagation(); onRemove(); }}
        aria-label="Remove from preview"
        type="button"
      >
        <FiX size={14} />
      </button>
      <span className="gal-card__badge">Preview</span>
    </div>
  );
}

function UploadedCard({ img, index, selected, onToggle }) {
  const src = `${import.meta.env.VITE_API_BASE_URL}${img.image_url}`;
  return (
    <div
      className={`gal-card gal-card--up${selected ? ' is-selected' : ''}`}
      style={{ '--i': index }}
      onClick={onToggle}
      role="checkbox"
      aria-checked={selected}
      tabIndex={0}
      onKeyDown={(e) => e.key === ' ' && onToggle()}
    >
      <img src={src} alt="" className="gal-card__img" />
      <div className="gal-card__scrim" />
      {selected && (
        <div className="gal-card__check">
          <FiCheck size={11} />
        </div>
      )}
    </div>
  );
}