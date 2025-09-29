import React, { useState } from 'react';
import { Canvas, CanvasItem } from '../../types';
import { useAppContext } from '../../contexts/AppContext';
import EditableCard from '../EditableCard';
import EditItemModal from '../EditItemModal';


interface SWOTProps {
  canvas: Canvas;
}

const SWOTAnalysis: React.FC<SWOTProps> = ({ canvas }) => {
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

  const getItem = (titleKey: string) => canvas.items.find(item => item.titleKey === titleKey)!;

  const sections = {
      strengths: getItem('swot_strengths'),
      weaknesses: getItem('swot_weaknesses'),
      opportunities: getItem('swot_opportunities'),
      threats: getItem('swot_threats'),
  };

  const renderCard = (section: CanvasItem) => (
    <EditableCard
        key={section.id}
        title={t(section.titleKey)}
        content={section.content}
        placeholder={t(section.placeholderKey)}
        onEdit={() => handleEdit(section)}
    />
  );
  
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 min-h-[calc(100vh-150px)]">
          {renderCard(sections.strengths)}
          {renderCard(sections.weaknesses)}
          {renderCard(sections.opportunities)}
          {renderCard(sections.threats)}
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

export default SWOTAnalysis;