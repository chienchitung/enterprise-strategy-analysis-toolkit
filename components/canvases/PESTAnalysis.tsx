import React, { useState } from 'react';
import { Canvas, CanvasItem } from '../../types';
import { useAppContext } from '../../contexts/AppContext';
import EditableCard from '../EditableCard';
import EditItemModal from '../EditItemModal';


interface PESTProps {
  canvas: Canvas;
}

const PESTAnalysis: React.FC<PESTProps> = ({ canvas }) => {
  const { dispatch, t } = useAppContext();
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<CanvasItem | null>(null);

  const handleEdit = (item: CanvasItem) => {
    setEditingItem(item);
    setEditModalOpen(true);
  };

  const handleSave = (itemId: string, content: string) => {
    dispatch({ type: 'UPDATE_CANVAS_ITEM', payload: { itemId, content } });
    setEditModalOpen(false);
    setEditingItem(null);
  };
  
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 min-h-[calc(100vh-150px)]">
        {canvas.items.map(item => (
          <EditableCard
            key={item.id}
            title={t(item.titleKey)}
            content={item.content}
            placeholder={t(item.placeholderKey)}
            onEdit={() => handleEdit(item)}
          />
        ))}
      </div>
      {editingItem && (
        <EditItemModal
            isOpen={isEditModalOpen}
            onClose={() => setEditModalOpen(false)}
            item={editingItem}
            onSave={handleSave}
        />
      )}
    </>
  );
};

export default PESTAnalysis;