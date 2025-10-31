import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const DraggableSection = ({ id, children }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div ref={setNodeRef} {...attributes} className='bg-gradient-to-r from-blue-50 to-white dark:from-gray-800 dark:to-gray-800 p-6 pt-1 rounded-xl outline outline-slate-300 shadow-sm mb-8' style={{touchAction: 'none'}}>
      <div className="cursor-move dark:bg-gray-800 p-1 mb-1 rounded flex items-center justify-center" {...listeners}>
        <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16" />
        </svg>
      </div>
      <div style={style}>
        {children}
      </div>
    </div>
  );
};

export default DraggableSection;