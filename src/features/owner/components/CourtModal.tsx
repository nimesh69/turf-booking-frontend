import React from 'react';

export type TurfStatus = 'active' | 'inactive' | 'draft' | 'suspended';

export interface CourtFormData {
  sportType?: string;
  name?: string;
  description?: string;
  pricePerHour?: number;
  maxPlayers?: number;
  openingTime?: string;
  closingTime?: string;
  status?: TurfStatus;
}

interface CourtModalProps {
  showModal: boolean;
  editingId: string | number | null;
  formData: CourtFormData;
  sportOptions: string[];
  onFormChange: (data: CourtFormData) => void;
  onClose: () => void;
  onSubmit: () => void;
}

export default function CourtModal({
  showModal,
  editingId,
  formData,
  sportOptions,
  onFormChange,
  onClose,
  onSubmit,
}: CourtModalProps) {
  if (!showModal) return null;
  // console.log('Rendering CourtModal with formData:', editingId);
  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center px-6">
      <div className="bg-white w-full max-w-2xl rounded-xl shadow-xl overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-secondary">
            {editingId ? 'Edit Court' : 'New Court Details'}
          </h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full text-secondary transition font-semibold"
          >
            ✕
          </button>
        </div>

        <div className="p-6 space-y-6 overflow-y-auto max-h-[650px]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Sport Type
              </label>
              {editingId ? (
                <div className="w-full h-10 rounded-lg border border-gray-200 bg-gray-50 px-3 flex items-center gap-2">
                  <span className="text-gray-900 font-medium">{formData.sportType}</span>
                  {/* <span className="text-xs text-gray-400 font-normal">(cannot be changed)</span> */}
                </div>
              ) : (
                <select
                  value={formData.sportType ?? ''}
                  onChange={e => onFormChange({ ...formData, sportType: e.target.value })}
                  className="w-full h-10 rounded-lg border border-gray-300 focus:border-blue-500 focus:outline-none px-3 text-gray-900"
                >
                  {sportOptions.map(sport => (
                    <option key={sport} value={sport}>
                      {sport}
                    </option>
                  ))}
                </select>
              )}
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Court Name
              </label>
              <input
                type="text"
                placeholder="e.g. Center Court"
                value={formData.name || ''}
                onChange={e => onFormChange({ ...formData, name: e.target.value })}
                className="w-full h-10 rounded-lg border border-gray-300 focus:border-blue-500 focus:outline-none px-3 text-gray-900"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Description
            </label>
            <textarea
              placeholder="Describe the court features (flooring, lighting, etc.)"
              value={formData.description || ''}
              onChange={e => onFormChange({ ...formData, description: e.target.value })}
              rows={3}
              className="w-full rounded-lg border border-gray-300 focus:border-blue-500 focus:outline-none px-3 py-2 text-gray-900"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Price per Hour ($)
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600">$</span>
                <input
                  type="number"
                  placeholder="0.00"
                  value={formData.pricePerHour || ''}
                  onChange={e =>
                    onFormChange({ ...formData, pricePerHour: parseFloat(e.target.value) })
                  }
                  className="w-full h-10 pl-8 rounded-lg border border-gray-300 focus:border-blue-500 focus:outline-none px-3 text-gray-900"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Max Players
              </label>
              <input
                type="number"
                placeholder="10"
                value={formData.maxPlayers || ''}
                onChange={e =>
                  onFormChange({ ...formData, maxPlayers: parseInt(e.target.value) })
                }
                className="w-full h-10 rounded-lg border border-gray-300 focus:border-blue-500 focus:outline-none px-3 text-gray-900"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Opening Time
              </label>
              <input
                type="time"
                value={formData.openingTime || '06:00'}
                onChange={e => onFormChange({ ...formData, openingTime: e.target.value })}
                className="w-full h-10 rounded-lg border border-gray-300 focus:border-blue-500 focus:outline-none px-3 text-gray-900"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Closing Time
              </label>
              <input
                type="time"
                value={formData.closingTime || '22:00'}
                onChange={e => onFormChange({ ...formData, closingTime: e.target.value })}
                className="w-full h-10 rounded-lg border border-gray-300 focus:border-blue-500 focus:outline-none px-3 text-gray-900"
              />
            </div>
          </div>

          {editingId && (
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Status
              </label>
              {formData.status === 'draft' || formData.status === 'suspended' ? (
                <div className="flex items-center gap-3">
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide ${
                      formData.status === 'draft'
                        ? 'bg-yellow-100 text-yellow-700'
                        : 'bg-red-100 text-red-700'
                    }`}
                  >
                    {formData.status}
                  </span>
                  <span className="text-xs text-gray-400">
                    Controlled by admin — cannot be changed
                  </span>
                </div>
              ) : (
                <div className="flex gap-3">
                  {(['active', 'inactive'] as const).map(s => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => onFormChange({ ...formData, status: s })}
                      className={`flex-1 py-2 rounded-lg border text-sm font-semibold transition ${
                        formData.status === s
                          ? s === 'active'
                            ? 'bg-green-50 border-green-500 text-green-700'
                            : 'bg-gray-100 border-gray-400 text-gray-700'
                          : 'border-gray-300 text-gray-500 hover:bg-gray-50'
                      }`}
                    >
                      {s === 'active' ? '● Active' : '○ Inactive'}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition font-semibold"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={onSubmit}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold"
            >
              {editingId ? 'Update Court' : 'Add Court'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}