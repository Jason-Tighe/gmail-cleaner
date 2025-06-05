import React, { useState, useEffect, useRef } from 'react';

interface ConfirmModalProps {
    onConfirm: () => void;
    onCancel: () => void;
}

export default function ConfirmModal({ onConfirm, onCancel }: ConfirmModalProps) {
    const [inputValue, setInputValue] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);

    const handleConfirm = () => {
        if (inputValue.toLowerCase() === 'confirm') {
            onConfirm();
        } else {
            alert('Please type "confirm" to proceed.');
        }
    };

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onCancel();
            } else if (e.key === 'Enter') {
                handleConfirm();
            }
        };

        inputRef.current?.focus();
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [onCancel, inputValue]);

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg w-80 text-center shadow-lg flex flex-col">
                <h2 className="text-lg font-bold mb-4">Are you sure?</h2>
                <p className="text-sm text-gray-600 mb-4">
                    This action is permanent. Please type "confirm" to proceed.
                </p>
                <input
                    type="text"
                    value={inputValue}
                    ref={inputRef}
                    onChange={(e) => setInputValue(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-red-500"
                />
                <div className="mt-auto flex justify-between">
                    <button
                        onClick={handleConfirm}
                        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 w-1/2 mr-2"
                    >
                        Confirm
                    </button>
                    <button
                        onClick={onCancel}
                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 w-1/2 ml-2"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
}
