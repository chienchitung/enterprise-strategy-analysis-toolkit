import React from 'react';
import { useAppContext } from '../contexts/AppContext';

interface EditableCardProps {
  title: string;
  content: string;
  placeholder: string;
  onEdit: () => void;
}

const EditableCard: React.FC<EditableCardProps> = ({ title, content, placeholder, onEdit }) => {
  const { t } = useAppContext();

  const isContentEmpty = !content || content.replace(/<[^>]*>?/gm, '').trim().length === 0;

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-200 h-full flex flex-col">
      <h3 className="font-bold text-slate-800 text-sm mb-2">{title}</h3>
      <div 
        className="flex-grow text-sm text-slate-600 overflow-y-auto cursor-pointer"
        onClick={onEdit}
      >
        {isContentEmpty ? (
          <p className="text-slate-400">{placeholder}</p>
        ) : (
          <div className="ql-snow card-content-display h-full">
            <div className="ql-editor" dangerouslySetInnerHTML={{ __html: content }} />
          </div>
        )}
      </div>
      <div className="mt-4 pt-4 border-t border-slate-100 flex justify-end">
        <button
          onClick={onEdit}
          className="px-3 py-1 bg-slate-200 text-slate-700 text-xs font-semibold rounded-md hover:bg-slate-300"
        >
          {t('edit')}
        </button>
      </div>
    </div>
  );
};

export default EditableCard;