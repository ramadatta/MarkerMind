
import React, { useState } from 'react';

interface InputFormProps {
    onExtract: (pdfFile: File | null, inputText: string, species: string, tissue: string) => void;
    isLoading: boolean;
}

export const InputForm: React.FC<InputFormProps> = ({ onExtract, isLoading }) => {
    const [pdfFile, setPdfFile] = useState<File | null>(null);
    const [inputText, setInputText] = useState<string>('');
    const [species, setSpecies] = useState<string>('');
    const [tissue, setTissue] = useState<string>('');
    const [fileName, setFileName] = useState<string>('');

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setPdfFile(file);
            setFileName(file.name);
            setInputText(''); // Clear text input when a file is selected
        }
    };

    const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setInputText(e.target.value);
        if (e.target.value) {
            setPdfFile(null); // Clear file input when text is entered
            setFileName('');
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onExtract(pdfFile, inputText, species, tissue);
    };

    return (
        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg h-full">
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <h3 className="text-lg font-semibold text-slate-700 dark:text-slate-300 mb-2">Input Source</h3>
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="file-upload" className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">
                                Upload PDF
                            </label>
                            <label className="w-full flex items-center px-4 py-2 bg-slate-100 dark:bg-slate-700 text-blue-500 rounded-lg shadow-sm tracking-wide border border-slate-200 dark:border-slate-600 cursor-pointer hover:bg-blue-500 hover:text-white dark:hover:bg-blue-600">
                                <svg className="w-6 h-6 mr-2" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                    <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
                                </svg>
                                <span className="text-sm truncate">{fileName || 'Select a file...'}</span>
                                <input id="file-upload" type="file" className="hidden" accept=".pdf" onChange={handleFileChange} />
                            </label>
                        </div>
                        <div className="flex items-center">
                            <div className="flex-grow border-t border-slate-200 dark:border-slate-600"></div>
                            <span className="flex-shrink mx-4 text-slate-400 dark:text-slate-500 text-xs font-semibold">OR</span>
                            <div className="flex-grow border-t border-slate-200 dark:border-slate-600"></div>
                        </div>
                        <div>
                            <label htmlFor="text-input" className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">
                                Paste Text
                            </label>
                            <textarea
                                id="text-input"
                                rows={8}
                                className="w-full p-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                                placeholder="Paste relevant text from a publication..."
                                value={inputText}
                                onChange={handleTextChange}
                            ></textarea>
                        </div>
                    </div>
                </div>

                <div>
                    <h3 className="text-lg font-semibold text-slate-700 dark:text-slate-300 mb-2">Optional Context</h3>
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="species" className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">Species</label>
                            <input
                                type="text"
                                id="species"
                                value={species}
                                onChange={(e) => setSpecies(e.target.value)}
                                className="w-full p-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                                placeholder="e.g., Human, Mouse"
                            />
                        </div>
                        <div>
                            <label htmlFor="tissue" className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">Tissue</label>
                            <input
                                type="text"
                                id="tissue"
                                value={tissue}
                                onChange={(e) => setTissue(e.target.value)}
                                className="w-full p-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                                placeholder="e.g., Brain, Lung"
                            />
                        </div>
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={isLoading || (!pdfFile && !inputText.trim())}
                    className="w-full flex justify-center items-center text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-3 transition-colors disabled:bg-slate-400 dark:disabled:bg-slate-600 disabled:cursor-not-allowed"
                >
                    {isLoading ? (
                        <>
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Processing...
                        </>
                    ) : (
                        'Extract Markers'
                    )}
                </button>
            </form>
        </div>
    );
};
