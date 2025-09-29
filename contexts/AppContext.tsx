
import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { v4 as uuidv4 } from 'uuid';
import useLocalStorage from '../hooks/useLocalStorage';
import { Project, Canvas, CanvasType, Language } from '../types';
import { getCanvasTemplate } from '../lib/models';
import { getTranslator } from '../lib/i18n';

interface AppState {
  projects: Project[];
  currentProjectId: string | null;
  currentCanvasId: string | null;
  language: Language;
}

type Action =
  | { type: 'ADD_PROJECT'; payload: { name: string } }
  | { type: 'SELECT_PROJECT'; payload: { projectId: string | null } }
  | { type: 'UPDATE_PROJECT_NAME'; payload: { projectId: string; name: string } }
  | { type: 'DELETE_PROJECT'; payload: { projectId: string } }
  | { type: 'ADD_CANVAS'; payload: { name: string; type: CanvasType } }
  | { type: 'SELECT_CANVAS'; payload: { canvasId: string | null } }
  | { type: 'UPDATE_CANVAS_ITEM'; payload: { itemId: string; content: string } }
  | { type: 'UPDATE_CANVAS_NAME'; payload: { canvasId: string; name: string } }
  | { type: 'DELETE_CANVAS'; payload: { canvasId: string } }
  | { type: 'SET_LANGUAGE'; payload: { language: Language } };


const initialState: AppState = {
  projects: [],
  currentProjectId: null,
  currentCanvasId: null,
  language: Language.EN,
};

const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<Action>;
  t: (key: string) => string;
} | undefined>(undefined);

const appReducer = (state: AppState, action: Action): AppState => {
  switch (action.type) {
    case 'ADD_PROJECT': {
      const newProject: Project = {
        id: uuidv4(),
        name: action.payload.name,
        canvases: [],
        createdAt: new Date().toISOString(),
      };
      return {
        ...state,
        projects: [...state.projects, newProject],
        currentProjectId: newProject.id,
        currentCanvasId: null,
      };
    }
    case 'SELECT_PROJECT':
      return {
        ...state,
        currentProjectId: action.payload.projectId,
        currentCanvasId: null,
      };
    case 'UPDATE_PROJECT_NAME':
        return {
            ...state,
            projects: state.projects.map(p =>
                p.id === action.payload.projectId ? { ...p, name: action.payload.name } : p
            ),
        };
    case 'DELETE_PROJECT': {
        const remainingProjects = state.projects.filter(p => p.id !== action.payload.projectId);
        const newCurrentProjectId = state.currentProjectId === action.payload.projectId ? null : state.currentProjectId;
        return {
            ...state,
            projects: remainingProjects,
            currentProjectId: newCurrentProjectId,
            currentCanvasId: newCurrentProjectId === null ? null : state.currentCanvasId,
        };
    }
    case 'ADD_CANVAS': {
      if (!state.currentProjectId) return state;
      const newCanvas: Canvas = {
        id: uuidv4(),
        name: action.payload.name,
        type: action.payload.type,
        items: getCanvasTemplate(action.payload.type),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      const updatedProjects = state.projects.map(p =>
        p.id === state.currentProjectId
          ? { ...p, canvases: [...p.canvases, newCanvas] }
          : p
      );
      return {
        ...state,
        projects: updatedProjects,
        currentCanvasId: newCanvas.id,
      };
    }
    case 'SELECT_CANVAS':
      return { ...state, currentCanvasId: action.payload.canvasId };
    case 'UPDATE_CANVAS_ITEM': {
        if (!state.currentProjectId || !state.currentCanvasId) return state;
        const updatedProjects = state.projects.map(p => {
            if (p.id !== state.currentProjectId) return p;
            const updatedCanvases = p.canvases.map(c => {
                if (c.id !== state.currentCanvasId) return c;
                const updatedItems = c.items.map(i =>
                    i.id === action.payload.itemId ? { ...i, content: action.payload.content } : i
                );
                return { ...c, items: updatedItems, updatedAt: new Date().toISOString() };
            });
            return { ...p, canvases: updatedCanvases };
        });
        return { ...state, projects: updatedProjects };
    }
    case 'UPDATE_CANVAS_NAME': {
        if (!state.currentProjectId) return state;
        return {
            ...state,
            projects: state.projects.map(p => {
                if (p.id !== state.currentProjectId) return p;
                return {
                    ...p,
                    canvases: p.canvases.map(c =>
                        c.id === action.payload.canvasId ? { ...c, name: action.payload.name } : c
                    )
                };
            }),
        };
    }
    case 'DELETE_CANVAS': {
        if (!state.currentProjectId) return state;
        const newCurrentCanvasId = state.currentCanvasId === action.payload.canvasId ? null : state.currentCanvasId;
        return {
            ...state,
            projects: state.projects.map(p => {
                if (p.id !== state.currentProjectId) return p;
                return { ...p, canvases: p.canvases.filter(c => c.id !== action.payload.canvasId) };
            }),
            currentCanvasId: newCurrentCanvasId,
        };
    }
    case 'SET_LANGUAGE':
      return { ...state, language: action.payload.language };
    default:
      return state;
  }
};

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [persistedState, setPersistedState] = useLocalStorage<AppState>('strategy-toolkit-state', initialState);

  const reducer = (state: AppState, action: Action) => {
    const newState = appReducer(state, action);
    setPersistedState(newState);
    return newState;
  };
  
  const [state, dispatch] = useReducer(reducer, persistedState);
  
  const t = getTranslator(state.language);

  return (
    <AppContext.Provider value={{ state, dispatch, t }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within a AppProvider');
  }
  return context;
};