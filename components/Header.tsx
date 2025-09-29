import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useAppContext } from '../contexts/AppContext';
import { Language } from '../types';

interface SearchResult {
    type: 'project' | 'canvas';
    id: string;
    name: string;
    projectId?: string;
    projectName?: string;
}

interface HeaderProps {
    onToggleLeftSidebar: () => void;
    isLeftSidebarOpen: boolean;
    onToggleAiPanel: () => void;
}

const Header: React.FC<HeaderProps> = ({ onToggleLeftSidebar, isLeftSidebarOpen, onToggleAiPanel }) => {
  const { state, dispatch, t } = useAppContext();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const [saveButtonText, setSaveButtonText] = useState(t('saveChanges'));
  
  const currentProject = state.projects.find(p => p.id === state.currentProjectId);
  const currentCanvas = currentProject?.canvases.find(c => c.id === state.currentCanvasId);

  useEffect(() => {
    setSaveButtonText(t('saveChanges'));
  }, [t, state.language]);


  const handlePrint = () => {
    window.print();
  };

  const handleSave = () => {
    setSaveButtonText(t('saved'));
    setTimeout(() => {
        setSaveButtonText(t('saveChanges'));
    }, 2000);
  };

  const allSearchableItems = useMemo(() => {
    const items: SearchResult[] = [];
    state.projects.forEach(project => {
      items.push({ type: 'project', id: project.id, name: project.name });
      project.canvases.forEach(canvas => {
        items.push({ type: 'canvas', id: canvas.id, name: canvas.name, projectId: project.id, projectName: project.name });
      });
    });
    return items;
  }, [state.projects]);

  useEffect(() => {
    if (searchQuery.trim().length > 0) {
      const results = allSearchableItems.filter(item => 
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  }, [searchQuery, allSearchableItems]);

  const handleResultClick = (result: SearchResult) => {
    if (result.type === 'project') {
      dispatch({ type: 'SELECT_PROJECT', payload: { projectId: result.id } });
    } else if (result.type === 'canvas' && result.projectId) {
      dispatch({ type: 'SELECT_PROJECT', payload: { projectId: result.projectId } });
      dispatch({ type: 'SELECT_CANVAS', payload: { canvasId: result.id } });
    }
    setSearchQuery('');
    setSearchResults([]);
    setIsSearchActive(false);
  };
  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setIsSearchActive(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);


  return (
    <>
    <header className="bg-white border-b border-slate-200 p-4 flex items-center justify-between print:hidden flex-shrink-0">
        <div className="flex items-center space-x-4">
            <button
                onClick={onToggleLeftSidebar}
                className="p-2 rounded-md hover:bg-slate-100 text-slate-500"
                title={isLeftSidebarOpen ? t('collapseSidebar') : t('expandSidebar')}
            >
                {isLeftSidebarOpen ? (
                     <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h8m-8 6h16" /></svg>
                ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
                )}
            </button>
            <div className="flex-1 min-w-0">
                <h2 className="text-xl font-semibold text-slate-800 truncate">
                {currentProject ? currentProject.name : t('appTitle')}
                </h2>
                {currentCanvas && <p className="text-sm text-slate-500 truncate">{currentCanvas.name} ({currentCanvas.type})</p>}
            </div>
        </div>
      
      <div className="flex-1 flex justify-center px-4">
        <div className="relative w-full max-w-md" ref={searchContainerRef}>
           <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                     <svg className="h-5 w-5 text-slate-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                    </svg>
                </div>
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => setIsSearchActive(true)}
                    className="block w-full bg-white border border-slate-300 rounded-md py-2 pl-10 pr-3 text-sm placeholder-slate-400 focus:outline-none focus:text-slate-900 focus:placeholder-slate-500 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Search projects & canvases"
                />
           </div>
          {isSearchActive && searchResults.length > 0 && (
            <div className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-md border border-slate-200">
              <ul className="max-h-60 overflow-auto rounded-md py-1 text-sm">
                {searchResults.map(result => (
                  <li key={`${result.type}-${result.id}`} onClick={() => handleResultClick(result)} className="text-slate-700 cursor-pointer select-none relative py-2 pl-3 pr-9 hover:bg-slate-100">
                    <span className="font-semibold block truncate">{result.name}</span>
                    {result.type === 'canvas' && <span className="text-slate-500 block truncate">{result.projectName}</span>}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center justify-end space-x-4">
        <div className="flex items-center space-x-2">
            <button onClick={handleSave} className="px-4 py-2 border border-slate-300 text-sm font-medium rounded-md text-slate-700 bg-white hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors text-center">
                {saveButtonText}
            </button>
            <button onClick={onToggleAiPanel} className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 -ml-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                </svg>
                {t('aiAssistant')}
            </button>
            <select
              value={state.language}
              onChange={(e) => dispatch({ type: 'SET_LANGUAGE', payload: { language: e.target.value as Language } })}
              className="rounded-md border border-slate-300 shadow-sm pl-3 pr-8 py-2 bg-white text-sm font-medium text-slate-700 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <option value={Language.EN}>{t('english')}</option>
              <option value={Language.ZH}>{t('traditionalChinese')}</option>
            </select>
        </div>
        
        {currentCanvas && (
          <button
            onClick={handlePrint}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 -ml-1" viewBox="0 0 20 20" fill="currentColor">
                <path d="M5 4a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2V6a2 2 0 00-2-2H5zm0 2h10v6H5V6zm2 10h6v2H7v-2z"/>
             </svg>
            {t('exportToPDF')}
          </button>
        )}
      </div>
    </header>
    </>
  );
};

export default Header;