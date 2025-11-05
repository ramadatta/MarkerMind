
import React from 'react';
import type { MarkerData } from '../types';
import { exportToCsv, exportToJson } from '../utils/exportUtils';
import { TableCellsIcon } from './icons/TableCellsIcon';
import { DocumentArrowDownIcon } from './icons/DocumentArrowDownIcon';

interface ResultsTableProps {
    data: MarkerData[];
}

export const ResultsTable: React.FC<ResultsTableProps> = ({ data }) => {
    if (!data || data.length === 0) {
        return <p>No data to display.</p>;
    }

    const handleExportCsv = () => {
        exportToCsv(data, 'markermind_results.csv');
    };

    const handleExportJson = () => {
        exportToJson(data, 'markermind_results.json');
    };

    const MarkerTag: React.FC<{ marker: string; type: 'positive' | 'negative' }> = ({ marker, type }) => {
        const baseClasses = "text-xs font-semibold mr-1 mb-1 px-2.5 py-0.5 rounded-full inline-block";
        const colorClasses = type === 'positive'
            ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
            : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
        const symbol = type === 'positive' ? '+' : '−';
        return (
            <span className={`${baseClasses} ${colorClasses}`}>{marker}{symbol}</span>
        );
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-slate-800 dark:text-slate-200">Extraction Results</h2>
                <div className="flex space-x-2">
                    <button onClick={handleExportCsv} className="flex items-center text-sm bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 font-medium py-2 px-3 rounded-lg transition">
                        <TableCellsIcon className="w-4 h-4 mr-2"/>
                        Export CSV
                    </button>
                    <button onClick={handleExportJson} className="flex items-center text-sm bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 font-medium py-2 px-3 rounded-lg transition">
                        <DocumentArrowDownIcon className="w-4 h-4 mr-2"/>
                        Export JSON
                    </button>
                </div>
            </div>
            <div className="overflow-x-auto rounded-lg border border-slate-200 dark:border-slate-700">
                <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-700">
                    <thead className="bg-slate-50 dark:bg-slate-700/50">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-300 uppercase tracking-wider">Cell Type</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-300 uppercase tracking-wider">Markers</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-300 uppercase tracking-wider">Method</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-300 uppercase tracking-wider">Context</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-slate-800 divide-y divide-slate-200 dark:divide-slate-700">
                        {data.map((row, index) => (
                            <tr key={index}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900 dark:text-slate-100">{row.cellType}</td>
                                <td className="px-6 py-4 whitespace-normal text-sm text-slate-500 dark:text-slate-400 max-w-xs">
                                    {row.positiveMarkers.map(m => <MarkerTag key={m} marker={m} type="positive" />)}
                                    {row.negativeMarkers.map(m => <MarkerTag key={m} marker={m} type="negative" />)}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">{row.method}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">
                                    <div className="font-semibold">{row.species} - {row.tissue}</div>
                                    <div className="text-xs">{row.condition}</div>
                                    <div className="text-xs italic text-slate-400 mt-1">{row.source}</div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
