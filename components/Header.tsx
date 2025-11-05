
import React from 'react';

export const Header: React.FC = () => {
    return (
        <header className="bg-white dark:bg-slate-800 shadow-md">
            <div className="container mx-auto px-4 py-6">
                <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-teal-400">
                    MarkerMind
                </h1>
                <p className="text-slate-500 dark:text-slate-400 mt-1">
                    AI-Powered Biological Marker Extraction from Scientific Literature
                </p>
            </div>
        </header>
    );
};
