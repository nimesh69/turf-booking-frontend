import { useState } from 'react';
import { ChevronRight, Edit, Trash2, Plus } from 'lucide-react';

interface Step2Props {
  onNext: (data: CourtsData) => void;
  onBack: () => void;
}

export interface Court {
  id: string;
  sportType: string;
  name: string;
  description: string;
  pricePerHour: number;
  maxPlayers: number;
  openingTime: string;
  closingTime: string;
}

export interface CourtsData {
  courts: Court[];
}

export default function Step2AddCourts({ onNext, onBack }: Step2Props) {
  const [courts, setCourts] = useState<Court[]>([
  ]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState<Partial<Court>>({
    sportType: 'Futsal',
    openingTime: '06:00',
    closingTime: '22:00',
  });
  const [editingId, setEditingId] = useState<string | null>(null);

  const sportOptions = ['Futsal', 'Basketball', 'Tennis', 'Badminton', 'Cricket', 'Volleyball', 'Pickleball', 'Table Tennis'];

  const handleAddCourt = () => {
    if (
      formData.name &&
      formData.sportType &&
      formData.pricePerHour &&
      formData.maxPlayers &&
      formData.openingTime &&
      formData.closingTime
    ) {
      if (editingId) {
        setCourts(courts.map(c => (c.id === editingId ? { ...formData, id: editingId } as Court : c)));
        setEditingId(null);
      } else {
        setCourts([...courts, { ...formData, id: Date.now().toString() } as Court]);
      }
      setShowModal(false);
      setFormData({ sportType: 'Futsal', openingTime: '06:00', closingTime: '22:00' });
    }
  };

  const handleEdit = (court: Court) => {
    setFormData(court);
    setEditingId(court.id);
    setShowModal(true);
  };

  const handleDelete = (id: string) => {
    setCourts(courts.filter(c => c.id !== id));
  };

  const handleNext = () => {
    if (courts.length > 0) {
      onNext({ courts });
    }
  };

  const getSportIcon = (sport: string) => {
    const icons: { [key: string]: string } = {
      Futsal: 'sports_soccer',
      Basketball: 'sports_basketball',
      Tennis: 'sports_tennis',
      Badminton: 'sports_badminton',
      Cricket: 'sports_cricket',
      Volleyball: 'sports_volleyball',
      Pickleball: 'sports_tennis',
      'Table Tennis': 'sports_tennis',
    };
    return icons[sport] || 'sports_soccer';
  };

  return (
    <main className="pt-[88px] pb-8 max-w-5xl mx-auto px-6">
      {/* Progress Indicator */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-3">
          <span className="font-semibold text-blue-600 uppercase tracking-wider text-sm">Step 2 of 5</span>
          <span className="font-semibold text-gray-600 text-sm">40% Complete</span>
        </div>
        <div className="flex gap-2 h-1 w-full bg-gray-200 rounded-full overflow-hidden">
          <div className="h-full w-1/5 bg-blue-500 rounded-full"></div>
          <div className="h-full w-1/5 bg-blue-500 rounded-full"></div>
          <div className="h-full w-1/5 bg-gray-300 rounded-full"></div>
          <div className="h-full w-1/5 bg-gray-300 rounded-full"></div>
          <div className="h-full w-1/5 bg-gray-300 rounded-full"></div>
        </div>
        <h1 className="text-3xl font-bold mt-4">Add Your Courts</h1>
        <p className="text-gray-600 text-sm">List the individual spaces or courts available at your venue.</p>
      </div>

      {/* Courts List */}
      <div className="space-y-4" id="court-list-container">
        {courts.map(court => (
          <div key={court.id} className="bg-white border border-gray-200 p-6 rounded-xl flex items-center justify-between group hover:shadow-md transition">
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 rounded-lg bg-blue-100 flex items-center justify-center">
                <span className="material-symbols-outlined text-2xl text-blue-600">
                  {getSportIcon(court.sportType)}
                </span>
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">{court.name}</h3>
                <div className="flex gap-3 mt-2">
                  <span className="text-xs font-semibold px-3 py-1 bg-gray-100 rounded text-gray-700">
                    {court.sportType}
                  </span>
                  <span className="text-xs font-semibold px-3 py-1 bg-gray-100 rounded text-gray-700">
                    ${court.pricePerHour}/hr
                  </span>
                  <span className="text-xs font-semibold px-3 py-1 bg-gray-100 rounded text-gray-700">
                    {court.maxPlayers} Players Max
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={() => handleEdit(court)}
                className="p-2 hover:bg-gray-100 rounded-lg text-gray-600"
              >
                <Edit size={20} />
              </button>
              <button
                onClick={() => handleDelete(court.id)}
                className="p-2 hover:bg-red-100 hover:text-red-600 rounded-lg text-gray-600"
              >
                <Trash2 size={20} />
              </button>
            </div>
          </div>
        ))}

        {/* Add Court Button */}
        <button
          onClick={() => {
            setEditingId(null);
            setFormData({ sportType: 'Futsal', openingTime: '06:00', closingTime: '22:00' });
            setShowModal(true);
          }}
          className="w-full border-2 border-dashed border-gray-300 rounded-xl p-8 flex flex-col items-center justify-center gap-4 hover:border-blue-500 transition-all hover:bg-blue-50"
        >
          <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
            <Plus size={24} className="text-blue-600" />
          </div>
          <div className="text-center">
            <p className="text-lg font-bold text-gray-900">Add New Court</p>
            <p className="text-gray-600 text-sm">Setup price, capacity, and availability for another space.</p>
          </div>
        </button>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center px-6">
          <div className="bg-white w-full max-w-2xl rounded-xl shadow-xl overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-2xl font-bold">{editingId ? 'Edit Court' : 'New Court Details'}</h2>
              <button
                onClick={() => {
                  setShowModal(false);
                  setEditingId(null);
                }}
                className="p-1 hover:bg-gray-100 rounded-full"
              >
                ✕
              </button>
            </div>
            <form className="p-6 space-y-6 overflow-y-auto max-h-[600px]">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Sport Type</label>
                  <select
                    value={formData.sportType}
                    onChange={e => setFormData({ ...formData, sportType: e.target.value })}
                    className="w-full h-10 rounded-lg border border-gray-300 focus:border-blue-500 focus:outline-none px-3 text-gray-900"
                  >
                    {sportOptions.map(sport => (
                      <option key={sport} value={sport}>
                        {sport}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Court Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Center Court"
                    value={formData.name || ''}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    className="w-full h-10 rounded-lg border border-gray-300 focus:border-blue-500 focus:outline-none px-3 text-gray-900"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Description</label>
                <textarea
                  placeholder="Describe the court features (flooring, lighting, etc.)"
                  value={formData.description || ''}
                  onChange={e => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                  className="w-full rounded-lg border border-gray-300 focus:border-blue-500 focus:outline-none px-3 py-2 text-gray-900"
                ></textarea>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Price per Hour ($)</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600">$</span>
                    <input
                      type="number"
                      placeholder="0.00"
                      value={formData.pricePerHour || ''}
                      onChange={e => setFormData({ ...formData, pricePerHour: parseFloat(e.target.value) })}
                      className="w-full h-10 pl-8 rounded-lg border border-gray-300 focus:border-blue-500 focus:outline-none px-3 text-gray-900"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Max Players</label>
                  <input
                    type="number"
                    placeholder="10"
                    value={formData.maxPlayers || ''}
                    onChange={e => setFormData({ ...formData, maxPlayers: parseInt(e.target.value) })}
                    className="w-full h-10 rounded-lg border border-gray-300 focus:border-blue-500 focus:outline-none px-3 text-gray-900"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Opening Time</label>
                  <input
                    type="time"
                    value={formData.openingTime || '06:00'}
                    onChange={e => setFormData({ ...formData, openingTime: e.target.value })}
                    className="w-full h-10 rounded-lg border border-gray-300 focus:border-blue-500 focus:outline-none px-3 text-gray-900"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Closing Time</label>
                  <input
                    type="time"
                    value={formData.closingTime || '22:00'}
                    onChange={e => setFormData({ ...formData, closingTime: e.target.value })}
                    className="w-full h-10 rounded-lg border border-gray-300 focus:border-blue-500 focus:outline-none px-3 text-gray-900"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    setEditingId(null);
                  }}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleAddCourt}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold"
                >
                  {editingId ? 'Update Court' : 'Add Court'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="flex justify-between items-center mt-8 gap-4">
        <button
          onClick={onBack}
          className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition font-semibold"
        >
          Back
        </button>
        <button
          onClick={handleNext}
          disabled={courts.length === 0}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 transition font-semibold flex items-center gap-2"
        >
          Next <ChevronRight size={20} />
        </button>
      </div>
    </main>
  );
}
