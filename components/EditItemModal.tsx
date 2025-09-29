import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import { useAppContext } from '../contexts/AppContext';
import { CanvasItem } from '../types';

interface EditItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: CanvasItem;
  onSave: (itemId: string, newContent: string) => void;
}

const modules = {
  toolbar: [
    [{ 'header': ['1', '2', '3', '4', false] }],
    ['bold', 'italic', 'strike'], 
    ['blockquote', 'code-block'],
    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
    ['link'],
    ['clean']
  ],
};

const EditItemModal: React.FC<EditItemModalProps> = ({ isOpen, onClose, item, onSave }) => {
    const { t } = useAppContext();
    const [content, setContent] = useState('');
    
    useEffect(() => {
        if (isOpen) {
            setContent(item.content);
        }
    }, [isOpen, item.content]);

    if (!isOpen) return null;

    const handleSave = () => {
        onSave(item.id, content);
    };

    const formattedQuestions = t(item.guideKey).split('\n').map((line, index) => (
        <li key={index} className="text-slate-600">{line.replace('• ','')}</li>
    ));

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center" onClick={onClose}>
            <div 
                className="bg-white rounded-lg shadow-2xl w-full max-w-4xl h-[70vh] flex flex-col" 
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex justify-between items-center p-4 border-b border-slate-200">
                    <h3 className="text-lg font-semibold text-slate-900">{t('editItemTitle')}: {t(item.titleKey)}</h3>
                    <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                <div className="flex-grow flex p-4 gap-4 overflow-hidden">
                    <div className="flex-grow w-2/3 quill-editor-container">
                        <ReactQuill
                            theme="snow"
                            value={content}
                            onChange={setContent}
                            modules={modules}
                            placeholder={t(item.placeholderKey)}
                        />
                    </div>
                    <div className="w-1/3 bg-slate-50 p-4 rounded-md overflow-y-auto">
                        <h4 className="text-sm font-semibold text-slate-700 mb-3">{t('guidedQuestions')}</h4>
                        <ul className="space-y-2 text-xs list-disc pl-4">
                            {formattedQuestions}
                        </ul>
                    </div>
                </div>
                <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end space-x-2">
                    <button onClick={onClose} className="px-4 py-2 bg-white border border-slate-300 text-slate-800 rounded-md hover:bg-slate-100 transition-colors">{t('cancel')}</button>
                    <button onClick={handleSave} className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors">{t('save')}</button>
                </div>
            </div>
        </div>
    );
};

export default EditItemModal;