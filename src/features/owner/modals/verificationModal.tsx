import { VenueVerification, VenueVerificationSubmit } from "@/types/turf.types";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { turfApi } from "@/api/turf.api";
import { VerificationEditModal } from "./verificationEditModal";
import { venueQueryKeys } from "../hooks/useTurfs";

export function VerificationModal({
  status,
  onClose,
  onRefresh,
}: {
  status: VenueVerification;
  onClose: () => void;
  onRefresh?: () => void;
}
) {
  const [editModalId, setEditModalId] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const queryClient = useQueryClient();

  // Build VenueVerificationSubmit from document files
  const buildVerificationPayload = (documents: {
    citizenshipFront: File;
    citizenshipBack: File;
    panCard: File;
    businessRegistration: File;
  }): VenueVerificationSubmit => {
    return {
      citizenshipFront: documents.citizenshipFront,
      citizenshipBack: documents.citizenshipBack,
      panCard: documents.panCard,
      businessRegistration: documents.businessRegistration,
    };
  };

  const resubmitMutation = useMutation({
    mutationFn: async (documents: {
      citizenshipFront: File;
      citizenshipBack: File;
      panCard: File;
      businessRegistration: File;
    }) => {
      const payload = buildVerificationPayload(documents);
      return turfApi.submitVenueVerification(status.venue, payload);
    },
    onSuccess: () => {
      setSuccessMessage("Documents submitted successfully for review!");
      setEditModalId(null);
      void queryClient.invalidateQueries({ queryKey: venueQueryKeys.all });
      onRefresh?.();
      // Close modal after showing success message
      setTimeout(() => {
        onClose();
      }, 2000);
    },
    onError: (error: Error) => {
      alert(`Failed to submit documents: ${error.message}`);
    },
  });

  const handleEditClick = () => {
    setEditModalId(status.venue);
    setSuccessMessage(null);
  };

  const handleBack = () => {
    setEditModalId(null);
    setSuccessMessage(null);
  };

  // Show VerificationEditModal when in edit mode
  if (editModalId) {
    return (
      <VerificationEditModal
        onSubmit={(documents) => {
          resubmitMutation.mutate(documents);
        }}
        onCancel={handleBack}
        isLoading={resubmitMutation.isPending}
      />
    );
  }

  // Show success message
  if (successMessage) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md mx-4">
          <div className="flex justify-center mb-4">
            <span className="text-4xl">✅</span>
          </div>
          <h2 className="text-lg font-semibold text-gray-900 text-center mb-2">
            Success
          </h2>
          <p className="text-sm text-gray-700 text-center">{successMessage}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md mx-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-900">
            Verification Status
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-xl"
          >
            ✕
          </button>
        </div>

        <div className="space-y-4">
          <div
            className={`flex items-center gap-2 px-4 py-3 rounded-lg ${status.verified ? "bg-green-50" : "bg-red-50"}`}
          >
            <span className="text-2xl">{status.verified ? "✅" : "❌"}</span>
            <div>
              <p
                className={`font-semibold ${status.verified ? "text-green-700" : "text-red-700"}`}
              >
                {status.verified ? "Verified" : "Not Verified"}
              </p>
            </div>
          </div>

          {status.rejectionReason && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-sm font-medium text-red-800 mb-1">
                Rejection Reason
              </p>
              <p className="text-sm text-red-700">{status.rejectionReason}</p>
              <button
                onClick={handleEditClick}
                disabled={resubmitMutation.isPending}
                className="mt-3 w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 text-sm font-medium transition"
              >
                {resubmitMutation.isPending ? "Submitting..." : "Edit & Resubmit Information"}
              </button>
            </div>
          )}

          {status.id && (
            <p className="text-xs text-gray-400">
              Verification ID: {status.id}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}