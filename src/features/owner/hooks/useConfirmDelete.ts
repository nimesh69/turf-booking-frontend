// hooks/shared/useConfirmDelete.ts
import { useState } from "react";
import axios from "axios";
interface DeleteErrorResponse {
  password?: string;
  detail?: string;
}
export function useConfirmDelete<T>(
  deleteFn: (id: string, password: string) => Promise<T>,
  onSuccess: () => void,
) {
  const [password, setPassword] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | undefined>();

  const reset = () => {
    setPassword("");
    setError(undefined);
  };

  const confirmDelete = async (id: string) => {
    setIsDeleting(true);
    setError(undefined);

    try {
      await deleteFn(id, password);
      await onSuccess();
      reset();
      return true;
    } catch (err: unknown) {
      let message = "Failed to delete.";

      if (axios.isAxiosError<DeleteErrorResponse>(err)) {
        message =
          err.response?.data?.password ?? err.response?.data?.detail ?? message;
      }

      setError(message);
      return false;
    } finally {
      setIsDeleting(false);
    }
  };

  return { password, setPassword, isDeleting, error, confirmDelete, reset };
}
