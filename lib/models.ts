
import { v4 as uuidv4 } from 'uuid';
import { CanvasType, CanvasItem } from '../types';

export const getCanvasTemplate = (type: CanvasType): CanvasItem[] => {
  const templates: { [key in CanvasType]: Omit<CanvasItem, 'content'>[] } = {
    [CanvasType.BMC]: [
      { id: uuidv4(), titleKey: "bmc_keyPartners", placeholderKey: "bmc_keyPartners_placeholder", guideKey: "bmc_keyPartners_guide" },
      { id: uuidv4(), titleKey: "bmc_keyActivities", placeholderKey: "bmc_keyActivities_placeholder", guideKey: "bmc_keyActivities_guide" },
      { id: uuidv4(), titleKey: "bmc_valuePropositions", placeholderKey: "bmc_valuePropositions_placeholder", guideKey: "bmc_valuePropositions_guide" },
      { id: uuidv4(), titleKey: "bmc_customerRelationships", placeholderKey: "bmc_customerRelationships_placeholder", guideKey: "bmc_customerRelationships_guide" },
      { id: uuidv4(), titleKey: "bmc_customerSegments", placeholderKey: "bmc_customerSegments_placeholder", guideKey: "bmc_customerSegments_guide" },
      { id: uuidv4(), titleKey: "bmc_keyResources", placeholderKey: "bmc_keyResources_placeholder", guideKey: "bmc_keyResources_guide" },
      { id: uuidv4(), titleKey: "bmc_channels", placeholderKey: "bmc_channels_placeholder", guideKey: "bmc_channels_guide" },
      { id: uuidv4(), titleKey: "bmc_costStructure", placeholderKey: "bmc_costStructure_placeholder", guideKey: "bmc_costStructure_guide" },
      { id: uuidv4(), titleKey: "bmc_revenueStreams", placeholderKey: "bmc_revenueStreams_placeholder", guideKey: "bmc_revenueStreams_guide" },
    ],
    [CanvasType.PEST]: [
      { id: uuidv4(), titleKey: "pest_political", placeholderKey: "pest_political_placeholder", guideKey: "pest_political_guide" },
      { id: uuidv4(), titleKey: "pest_economic", placeholderKey: "pest_economic_placeholder", guideKey: "pest_economic_guide" },
      { id: uuidv4(), titleKey: "pest_social", placeholderKey: "pest_social_placeholder", guideKey: "pest_social_guide" },
      { id: uuidv4(), titleKey: "pest_technological", placeholderKey: "pest_technological_placeholder", guideKey: "pest_technological_guide" },
    ],
    [CanvasType.SWOT]: [
      { id: uuidv4(), titleKey: "swot_strengths", placeholderKey: "swot_strengths_placeholder", guideKey: "swot_strengths_guide" },
      { id: uuidv4(), titleKey: "swot_weaknesses", placeholderKey: "swot_weaknesses_placeholder", guideKey: "swot_weaknesses_guide" },
      { id: uuidv4(), titleKey: "swot_opportunities", placeholderKey: "swot_opportunities_placeholder", guideKey: "swot_opportunities_guide" },
      { id: uuidv4(), titleKey: "swot_threats", placeholderKey: "swot_threats_placeholder", guideKey: "swot_threats_guide" },
    ],
    [CanvasType.STP]: [
      { id: uuidv4(), titleKey: "stp_segmentation", placeholderKey: "stp_segmentation_placeholder", guideKey: "stp_segmentation_guide" },
      { id: uuidv4(), titleKey: "stp_targeting", placeholderKey: "stp_targeting_placeholder", guideKey: "stp_targeting_guide" },
      { id: uuidv4(), titleKey: "stp_positioning", placeholderKey: "stp_positioning_placeholder", guideKey: "stp_positioning_guide" },
    ],
  };

  return templates[type].map(item => ({ ...item, content: '' }));
};
