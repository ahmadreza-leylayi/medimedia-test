'use client';

import React from 'react';

interface DraggablePanelProps {
  children: React.ReactNode;
  id: string;
  isCustomizing: boolean;
  isHidden: boolean;
  isDragging?: boolean;
  onDragStart: (id: string) => void;
  onDragOver: (e: React.DragEvent, targetId: string) => void;
  onDragEnd?: () => void;
  onDrop: (e: React.DragEvent, targetId: string) => void;
  onHide: (id: string) => void;
}

export const DraggablePanel: React.FC<DraggablePanelProps> = ({
  children,
  id,
  isCustomizing,
  isHidden,
  isDragging = false,
  onDragStart,
  onDragOver,
  onDragEnd,
  onDrop,
  onHide,
}) => {
  if (isHidden) return null;

  return (
    <div
      draggable={isCustomizing}
      onDragStart={() => onDragStart(id)}
      onDragOver={(e) => {
        e.preventDefault();
        onDragOver(e, id);
      }}
      onDragEnd={() => {
        if (onDragEnd) onDragEnd();
      }}
      onDrop={(e) => onDrop(e, id)}
      className="relative transition-all duration-300 ease-in-out"
      style={{
        cursor: isCustomizing ? (isDragging ? 'grabbing' : 'grab') : 'default',
      }}
    >
      {children}
      {isCustomizing && (
        <div className="absolute bottom-0 left-0 right-0 flex items-center justify-center gap-2 p-2 bg-gray-100 rounded-b-2xl border-t border-gray-200">
          <button
            onMouseDown={(e) => e.stopPropagation()}
            className="p-1.5 hover:bg-gray-200 rounded-lg transition-colors cursor-move"
            title="جابجایی"
          >
            <svg className="w-4 h-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <button
            onClick={() => onHide(id)}
            className="p-1.5 hover:bg-red-100 rounded-lg transition-colors"
            title="مخفی کردن"
          >
            <svg className="w-4 h-4 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
};

