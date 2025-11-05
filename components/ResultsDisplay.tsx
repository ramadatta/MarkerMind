
import React from 'react';
import type { MarkerData } from '../types';
import { ResultsTable } from './ResultsTable';
import { Spinner } from './Spinner';

interface ResultsDisplayProps {
    results: MarkerData[];
    isLoading: boolean;
    error: string | null;
}

export const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ results, isLoading, error }) => {
    
    const WelcomeMessage = () => (
        <div className="text-center p-8 border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-xl">
            <svg className="mx-auto h-12 w-12 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path vectorEffect="non-scaling-stroke" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <h3 className="mt-2 text-lg font-medium text-slate-800 dark:text-slate-200">Awaiting Input</h3>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Upload a PDF or paste text to begin extracting biological markers.</p>
        </div>
    );

    const ErrorDisplay = ({ message }: { message: string }) => (
        <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-400 p-4 rounded-md">
            <div className="flex">
                <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                </div>
                <div className="ml-3">
                    <p className="text-sm font-medium text-red-800 dark:text-red-200">{message}</p>
                </div>
            </div>
        </div>
    );

    return (
        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg min-h-[400px] flex flex-col">
            {isLoading ? (
                <div className="flex-grow flex items-center justify-center">
                    <Spinner />
                </div>
            ) : error ? (
                <ErrorDisplay message={error} />
            ) : results.length > 0 ? (
                <ResultsTable data={results} />
            ) : (
                <WelcomeMessage />
            )}
        </div>
    );
};
