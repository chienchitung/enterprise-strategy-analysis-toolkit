
import React, { useState } from 'react';
import { useAppContext } from '../contexts/AppContext';
import Modal from './Modal';
import { CanvasType, Project, Canvas } from '../types';

interface SidebarProps {
  isOpen: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen }) => {
  const { state, dispatch, t } = useAppContext();
  
  // State for creation modals
  const [isProjectModalOpen, setProjectModalOpen] = useState(false);
  const [isCanvasModalOpen, setCanvasModalOpen] = useState(false);
  const [newProjectName, setNewProjectName] = useState('');
  const [newCanvasName, setNewCanvasName] = useState('');
  const [newCanvasType, setNewCanvasType] = useState<CanvasType>(CanvasType.BMC);

  // State for editing and deleting
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [editingCanvas, setEditingCanvas] = useState<Canvas | null>(null);
  const [deletingProject, setDeletingProject] = useState<Project | null>(null);
  const [deletingCanvas, setDeletingCanvas] = useState<Canvas | null>(null);
  const [updatedName, setUpdatedName] = useState('');


  const handleCreateProject = () => {
    if (newProjectName.trim()) {
      dispatch({ type: 'ADD_PROJECT', payload: { name: newProjectName.trim() } });
      setNewProjectName('');
      setProjectModalOpen(false);
    }
  };
  
  const handleCreateCanvas = () => {
    if (newCanvasName.trim()) {
      dispatch({ type: 'ADD_CANVAS', payload: { name: newCanvasName.trim(), type: newCanvasType } });
      setNewCanvasName('');
      setCanvasModalOpen(false);
    }
  };

  const handleUpdateProject = () => {
    if (editingProject && updatedName.trim()) {
        dispatch({ type: 'UPDATE_PROJECT_NAME', payload: { projectId: editingProject.id, name: updatedName.trim() } });
        setEditingProject(null);
        setUpdatedName('');
    }
  };

  const handleDeleteProject = () => {
    if (deletingProject) {
        dispatch({ type: 'DELETE_PROJECT', payload: { projectId: deletingProject.id } });
        setDeletingProject(null);
    }
  };

  const handleUpdateCanvas = () => {
    if (editingCanvas && updatedName.trim()) {
        dispatch({ type: 'UPDATE_CANVAS_NAME', payload: { canvasId: editingCanvas.id, name: updatedName.trim() } });
        setEditingCanvas(null);
        setUpdatedName('');
    }
  };

    const handleDeleteCanvas = () => {
        if (deletingCanvas) {
            dispatch({ type: 'DELETE_CANVAS', payload: { canvasId: deletingCanvas.id } });
            setDeletingCanvas(null);
        }
    };

  const openEditProjectModal = (project: Project) => {
    setEditingProject(project);
    setUpdatedName(project.name);
  };

  const openEditCanvasModal = (canvas: Canvas) => {
    setEditingCanvas(canvas);
    setUpdatedName(canvas.name);
  };

  const currentProject = state.projects.find(p => p.id === state.currentProjectId);

  return (
    <>
      <aside className={`bg-slate-800 text-slate-100 flex flex-col transition-all duration-300 print:hidden ${isOpen ? 'w-64 p-4' : 'w-0 p-0 overflow-hidden'}`}>
        <h1 className="text-xl font-bold mb-6 text-white">{t('appTitle')}</h1>
        
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-400">{t('projects')}</h2>
          <button onClick={() => setProjectModalOpen(true)} className="p-1 rounded-md hover:bg-slate-700 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" /></svg>
          </button>
        </div>
        <ul className="space-y-1 mb-6">
          {state.projects.map(project => (
            <li key={project.id} className="group">
               <div className={`flex items-center justify-between w-full text-left rounded-md transition-colors ${state.currentProjectId === project.id ? 'bg-slate-900 text-white' : ''}`}>
                    <button
                        onClick={() => dispatch({ type: 'SELECT_PROJECT', payload: { projectId: project.id } })}
                        className={`flex-grow text-left px-3 py-2 text-sm rounded-md ${state.currentProjectId !== project.id ? 'hover:bg-slate-700' : ''}`}
                    >
                        {project.name}
                    </button>
                    <div className="flex items-center pr-2 space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button onClick={() => openEditProjectModal(project)} className="p-1 rounded hover:bg-slate-700"><svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" /><path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" /></svg></button>
                        <button onClick={() => setDeletingProject(project)} className="p-1 rounded hover:bg-slate-700"><svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm4 0a1 1 0 012 0v6a1 1 0 11-2 0V8z" clipRule="evenodd" /></svg></button>
                    </div>
                </div>
            </li>
          ))}
        </ul>

        {currentProject && (
           <>
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-400">{t('canvases')}</h2>
              <button onClick={() => setCanvasModalOpen(true)} className="p-1 rounded-md hover:bg-slate-700 transition-colors">
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" /></svg>
              </button>
            </div>
            <ul className="space-y-1 flex-1 overflow-y-auto">
              {currentProject.canvases.map(canvas => (
                <li key={canvas.id} className="group">
                    <div className={`flex items-center justify-between w-full text-left rounded-md transition-colors ${state.currentCanvasId === canvas.id ? 'bg-slate-700' : ''}`}>
                        <button
                            onClick={() => dispatch({ type: 'SELECT_CANVAS', payload: { canvasId: canvas.id } })}
                            className={`flex-grow text-left px-3 py-2 text-sm rounded-md ${state.currentCanvasId !== canvas.id ? 'hover:bg-slate-700' : ''}`}
                        >
                            <span className="font-medium">{canvas.name}</span>
                            <span className="block text-xs text-slate-400">{canvas.type}</span>
                        </button>
                        <div className="flex items-center pr-2 space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button onClick={() => openEditCanvasModal(canvas)} className="p-1 rounded hover:bg-slate-600"><svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" /><path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" /></svg></button>
                            <button onClick={() => setDeletingCanvas(canvas)} className="p-1 rounded hover:bg-slate-600"><svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm4 0a1 1 0 012 0v6a1 1 0 11-2 0V8z" clipRule="evenodd" /></svg></button>
                        </div>
                    </div>
                </li>
              ))}
            </ul>
           </>
        )}
      </aside>
      
      {/* Create Project Modal */}
      <Modal isOpen={isProjectModalOpen} onClose={() => setProjectModalOpen(false)} title={t('createProject')}>
        <div className="space-y-4">
          <label htmlFor="projectName" className="block text-sm font-medium text-slate-700">{t('projectName')}</label>
          <input
            type="text"
            id="projectName"
            value={newProjectName}
            onChange={(e) => setNewProjectName(e.target.value)}
            placeholder={t('enterProjectName')}
            className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div className="mt-6 flex justify-end space-x-2">
            <button onClick={() => setProjectModalOpen(false)} className="px-4 py-2 bg-slate-200 text-slate-800 rounded-md hover:bg-slate-300 transition-colors">{t('cancel')}</button>
            <button onClick={handleCreateProject} className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors">{t('create')}</button>
        </div>
      </Modal>

      {/* Create Canvas Modal */}
      <Modal isOpen={isCanvasModalOpen} onClose={() => setCanvasModalOpen(false)} title={t('createCanvas')}>
        <div className="space-y-4">
          <div>
            <label htmlFor="canvasName" className="block text-sm font-medium text-slate-700">{t('canvasName')}</label>
            <input
              type="text"
              id="canvasName"
              value={newCanvasName}
              onChange={(e) => setNewCanvasName(e.target.value)}
              placeholder={t('enterCanvasName')}
              className="mt-1 w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <label htmlFor="canvasType" className="block text-sm font-medium text-slate-700">{t('canvasType')}</label>
            <select
              id="canvasType"
              value={newCanvasType}
              onChange={(e) => setNewCanvasType(e.target.value as CanvasType)}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-slate-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            >
              {Object.values(CanvasType).map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="mt-6 flex justify-end space-x-2">
            <button onClick={() => setCanvasModalOpen(false)} className="px-4 py-2 bg-slate-200 text-slate-800 rounded-md hover:bg-slate-300 transition-colors">{t('cancel')}</button>
            <button onClick={handleCreateCanvas} className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors">{t('create')}</button>
        </div>
      </Modal>

      {/* Edit Project Modal */}
        <Modal isOpen={!!editingProject} onClose={() => setEditingProject(null)} title={t('editProject')}>
            <div className="space-y-4">
                <label htmlFor="editProjectName" className="block text-sm font-medium text-slate-700">{t('projectName')}</label>
                <input
                    type="text"
                    id="editProjectName"
                    value={updatedName}
                    onChange={(e) => setUpdatedName(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
            </div>
            <div className="mt-6 flex justify-end space-x-2">
                <button onClick={() => setEditingProject(null)} className="px-4 py-2 bg-slate-200 text-slate-800 rounded-md hover:bg-slate-300 transition-colors">{t('cancel')}</button>
                <button onClick={handleUpdateProject} className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors">{t('update')}</button>
            </div>
        </Modal>

        {/* Delete Project Modal */}
        <Modal isOpen={!!deletingProject} onClose={() => setDeletingProject(null)} title={t('deleteProject')}>
            <p className="text-sm text-slate-600">{t('deleteProjectConfirm')}</p>
            <div className="mt-6 flex justify-end space-x-2">
                <button onClick={() => setDeletingProject(null)} className="px-4 py-2 bg-slate-200 text-slate-800 rounded-md hover:bg-slate-300 transition-colors">{t('cancel')}</button>
                <button onClick={handleDeleteProject} className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors">{t('delete')}</button>
            </div>
        </Modal>

        {/* Edit Canvas Modal */}
        <Modal isOpen={!!editingCanvas} onClose={() => setEditingCanvas(null)} title={t('editCanvas')}>
            <div className="space-y-4">
                <label htmlFor="editCanvasName" className="block text-sm font-medium text-slate-700">{t('canvasName')}</label>
                <input
                    type="text"
                    id="editCanvasName"
                    value={updatedName}
                    onChange={(e) => setUpdatedName(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
            </div>
            <div className="mt-6 flex justify-end space-x-2">
                <button onClick={() => setEditingCanvas(null)} className="px-4 py-2 bg-slate-200 text-slate-800 rounded-md hover:bg-slate-300 transition-colors">{t('cancel')}</button>
                <button onClick={handleUpdateCanvas} className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors">{t('update')}</button>
            </div>
        </Modal>

        {/* Delete Canvas Modal */}
        <Modal isOpen={!!deletingCanvas} onClose={() => setDeletingCanvas(null)} title={t('deleteCanvas')}>
            <p className="text-sm text-slate-600">{t('deleteCanvasConfirm')}</p>
            <div className="mt-6 flex justify-end space-x-2">
                <button onClick={() => setDeletingCanvas(null)} className="px-4 py-2 bg-slate-200 text-slate-800 rounded-md hover:bg-slate-300 transition-colors">{t('cancel')}</button>
                <button onClick={handleDeleteCanvas} className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors">{t('delete')}</button>
            </div>
        </Modal>

    </>
  );
};

export default Sidebar;