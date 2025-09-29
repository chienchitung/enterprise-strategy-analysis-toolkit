
import React from 'react';
import { useAppContext } from '../contexts/AppContext';
import { CanvasType } from '../types';
import BusinessModelCanvas from './canvases/BusinessModelCanvas';
import PESTAnalysis from './canvases/PESTAnalysis';
import SWOTAnalysis from './canvases/SWOTAnalysis';
import STPAnalysis from './canvases/STPAnalysis';


const CanvasContainer: React.FC = () => {
    const { state, t } = useAppContext();
    const currentProject = state.projects.find(p => p.id === state.currentProjectId);
    const currentCanvas = currentProject?.canvases.find(c => c.id === state.currentCanvasId);

    if (!currentCanvas) {
        return (
            <div className="flex items-center justify-center h-full">
                <div className="text-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                    </svg>
                    <h3 className="mt-2 text-lg font-medium text-slate-900">{t('selectCanvasToView')}</h3>
                </div>
            </div>
        );
    }

    const renderCanvas = () => {
        switch (currentCanvas.type) {
            case CanvasType.BMC:
                return <BusinessModelCanvas canvas={currentCanvas} />;
            case CanvasType.PEST:
                return <PESTAnalysis canvas={currentCanvas} />;
            case CanvasType.SWOT:
                return <SWOTAnalysis canvas={currentCanvas} />;
            case CanvasType.STP:
                return <STPAnalysis canvas={currentCanvas} />;
            default:
                return <div>Unsupported Canvas Type</div>;
        }
    };

    return <div id="printable-area">{renderCanvas()}</div>;
};

export default CanvasContainer;
