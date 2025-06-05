/* eslint-disable @typescript-eslint/no-explicit-any */

import axios from "axios";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import ConfirmModal from "./ConfirmModal";

type DeleteProps = {
  cacheKey: string | null;
  emailCount?: number | null;
  onSuccess?: () => void;
  onError?: (error: string) => void;
  disabled?: boolean;
  label?: string;
};

type DeleteResponse = {
  success: boolean;
};

export default function Delete({
    cacheKey,
    emailCount,
    onSuccess,
    onError,
    disabled = false,
    label = "Delete",
}: DeleteProps) {
    const [deleting, setDeleting] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [success, setSuccess] = useState(false);
    const { user } = useAuth();
    const accessToken = user?.accessToken || localStorage.getItem("accessToken");
    const userEmail = user?.email || localStorage.getItem("email");

    const handleDelete = async () => {
        if (deleting || disabled) return;

        setDeleting(true);
        try {
            const response = await axios.delete<DeleteResponse>("/api/gmail/email/delete", {
                headers: {
                    Authorization: `Bearer ${accessToken?? localStorage.getItem("accessToken")}`,
                },
                params: {
                    email: userEmail,
                    cacheKey,
                },
            });
            if (response.status === 200 && response.data?.success) {
                setSuccess(true);
                setTimeout(() => setSuccess(false), 3000);
                onSuccess?.();
              } else {
                throw new Error("Failed to delete emails");
              }
        } catch (error: any) {
            setDeleting(false);
            const errorMessage = error.response?.data?.message || "Failed to delete emails";
            onError?.(errorMessage);
            console.error("Delete error:", errorMessage);
        } finally {
            setDeleting(false);
            setShowModal(false);
        }
    };

    const buttonText = deleting
    ? "Deleting..."
    : success
        ? "Deleted ✓"
        : emailCount
        ? `Delete (${emailCount})`
        : label || "Delete";

    const buttonClass = `flex-1 py-3 rounded-md text-center text-lg font-semibold focus:outline-none focus:ring-2 ${
    success
        ? "bg-green-600 text-white hover:bg-green-700 focus:ring-green-500"
        : !disabled
        ? "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500"
        : "bg-gray-400 text-gray-200 cursor-not-allowed"
    }`;

    return (
        <>
            <button
            onClick={() => setShowModal(true)}
            className={buttonClass}
            disabled={disabled || deleting}
            >
            {buttonText}
            </button>
            {showModal && (
            <ConfirmModal
                onConfirm={handleDelete}
                onCancel={() => !deleting && setShowModal(false)}
            />
            )}
        </>
    )
}
