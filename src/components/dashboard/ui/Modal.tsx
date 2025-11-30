'use client';

import React, { useEffect } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children, className = '' }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className={`relative bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 sm:mx-6 md:mx-auto ${className}`}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};

interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  message?: string;
}

export const DeleteModal: React.FC<DeleteModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title = 'حذف آیتم',
  message = 'پیش از حذف آیتم، باید به این نکته توجه داشته باشید',
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="p-4 sm:p-6 md:p-8 text-center">
        <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-3 sm:mb-4">
          {title}
        </h3>
        <p className="text-sm sm:text-base text-gray-600 mb-6 sm:mb-8">
          {message}
        </p>
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
          <button
            onClick={onConfirm}
            className="px-6 sm:px-8 py-2 sm:py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition-colors text-sm sm:text-base"
          >
            بله حذف شود
          </button>
          <button
            onClick={onClose}
            className="px-6 sm:px-8 py-2 sm:py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg font-medium transition-colors text-sm sm:text-base"
          >
            لغو
          </button>
        </div>
      </div>
    </Modal>
  );
};

