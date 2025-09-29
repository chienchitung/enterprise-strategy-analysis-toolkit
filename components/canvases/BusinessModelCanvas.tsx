import React, { useState } from 'react';
import { Canvas, CanvasItem } from '../../types';
import { useAppContext } from '../../contexts/AppContext';
import EditableCard from '../EditableCard';
import EditItemModal from '../EditItemModal';

interface BMCProps {
  canvas: Canvas;
}

const BusinessModelCanvas: React.FC<BMCProps> = ({ canvas }) => {
  const { dispatch, t } = useAppContext();
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<CanvasItem | null>(null);

  const getItem = (titleKey: string) => canvas.items.find(item => item.titleKey === titleKey);

  const handleEdit = (item: CanvasItem) => {
    setEditingItem(item);
    setEditModalOpen(true);
  };

  const handleSave = (itemId: string, content: string) => {
    dispatch({ type: 'UPDATE_CANVAS_ITEM', payload: { itemId, content } });
    setEditModalOpen(false);
    setEditingItem(null);
  };
  
  const sections = {
    keyPartners: getItem('bmc_keyPartners')!,
    keyActivities: getItem('bmc_keyActivities')!,
    keyResources: getItem('bmc_keyResources')!,
    valuePropositions: getItem('bmc_valuePropositions')!,
    customerRelationships: getItem('bmc_customerRelationships')!,
    channels: getItem('bmc_channels')!,
    customerSegments: getItem('bmc_customerSegments')!,
    costStructure: getItem('bmc_costStructure')!,
    revenueStreams: getItem('bmc_revenueStreams')!,
  }

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
      <div className="grid grid-cols-10 grid-rows-[auto_auto_minmax(0,1fr)] gap-4 min-h-[calc(100vh-150px)]">
        {/* Top section */}
        <div className="col-span-2">{renderCard(sections.keyPartners)}</div>
        
        <div className="col-span-2">
          {renderCard(sections.keyActivities)}
        </div>
        
        <div className="col-span-2 row-span-2">
          {renderCard(sections.valuePropositions)}
        </div>

        <div className="col-span-2">
          {renderCard(sections.customerRelationships)}
        </div>
        
        <div className="col-span-2 row-span-2">
          {renderCard(sections.customerSegments)}
        </div>

        {/* Middle section (underneath top) */}
        <div className="col-span-2">
          {renderCard(sections.keyResources)}
        </div>
        <div className="col-span-2">
          {renderCard(sections.channels)}
        </div>

        {/* Bottom section */}
        <div className="col-start-1 col-span-5 row-start-3">
          {renderCard(sections.costStructure)}
        </div>
        <div className="col-start-6 col-span-5 row-start-3">
          {renderCard(sections.revenueStreams)}
        </div>
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

export default BusinessModelCanvas;