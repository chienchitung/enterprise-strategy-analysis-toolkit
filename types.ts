
export enum Language {
  EN = 'en',
  ZH = 'zh',
}

export enum CanvasType {
  BMC = 'Business Model Canvas',
  PEST = 'PEST Analysis',
  SWOT = 'SWOT Analysis',
  STP = 'STP Analysis',
}

export interface CanvasItem {
  id: string;
  titleKey: string;
  content: string;
  placeholderKey: string;
  guideKey: string;
}

export interface Canvas {
  id: string;
  name: string;
  type: CanvasType;
  items: CanvasItem[];
  createdAt: string;
  updatedAt: string;
}

export interface Project {
  id: string;
  name: string;
  canvases: Canvas[];
  createdAt: string;
}
