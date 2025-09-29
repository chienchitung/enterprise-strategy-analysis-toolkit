
import React, { useState } from 'react';
import { AppProvider, useAppContext } from './contexts/AppContext';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import ProjectDashboard from './components/ProjectDashboard';
import CanvasContainer from './components/CanvasContainer';
import AICompanionPanel from './components/AICompanionPanel';

const MainContent: React.FC<{
  onToggleLeftSidebar: () => void;
  isLeftSidebarOpen: boolean;
  onToggleAiPanel: () => void;
}> = ({ onToggleLeftSidebar, isLeftSidebarOpen, onToggleAiPanel }) => {
  const { state } = useAppContext();
  const { currentProjectId } = state;

  const hasActiveProject = currentProjectId && state.projects.find(p => p.id === currentProjectId);

  return (
    <div className="flex-1 flex flex-col h-screen overflow-hidden">
      <Header 
        onToggleLeftSidebar={onToggleLeftSidebar}
        isLeftSidebarOpen={isLeftSidebarOpen}
        onToggleAiPanel={onToggleAiPanel}
      />
      <main className="flex-1 overflow-y-auto bg-slate-100 p-4 sm:p-6 lg:p-8">
        {!hasActiveProject ? (
          <ProjectDashboard />
        ) : (
          <CanvasContainer />
        )}
      </main>
    </div>
  );
};

const AppContent: React.FC = () => {
    const [isLeftSidebarOpen, setLeftSidebarOpen] = useState(true);
    const [isAiPanelOpen, setAiPanelOpen] = useState(false);

    const toggleLeftSidebar = () => setLeftSidebarOpen(!isLeftSidebarOpen);
    const toggleAiPanel = () => setAiPanelOpen(!isAiPanelOpen);

    return (
        <div className="flex h-screen font-sans">
            <Sidebar isOpen={isLeftSidebarOpen} />
            <MainContent 
                onToggleLeftSidebar={toggleLeftSidebar}
                isLeftSidebarOpen={isLeftSidebarOpen}
                onToggleAiPanel={toggleAiPanel}
            />
            <AICompanionPanel isOpen={isAiPanelOpen} onClose={toggleAiPanel} />
        </div>
    );
};


const App: React.FC = () => {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
};

export default App;
