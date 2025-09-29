
import React from 'react';
import { useAppContext } from '../contexts/AppContext';

const ProjectDashboard: React.FC = () => {
  const { t } = useAppContext();
  return (
    <div className="flex items-center justify-center h-full">
      <div className="text-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
        <h3 className="mt-2 text-lg font-medium text-slate-900">{t('noProjectSelected')}</h3>
        <p className="mt-1 text-sm text-slate-500">{t('selectOrCreateProject')}</p>
      </div>
    </div>
  );
};

export default ProjectDashboard;
