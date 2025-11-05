
import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { InputForm } from './components/InputForm';
import { ResultsDisplay } from './components/ResultsDisplay';
import { extractTextFromPdf } from './services/pdfService';
import { extractMarkersFromText } from './services/geminiService';
import type { MarkerData } from './types';

const App: React.FC = () => {
    const [results, setResults] = useState<MarkerData[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const handleExtract = useCallback(async (
        pdfFile: File | null,
        inputText: string,
        species: string,
        tissue: string
    ) => {
        setIsLoading(true);
        setError(null);
        setResults([]);

        try {
            let textToProcess = inputText;
            if (pdfFile) {
                textToProcess = await extractTextFromPdf(pdfFile);
            }

            if (!textToProcess.trim()) {
                throw new Error("No text to process. Please upload a PDF or paste text.");
            }

            const extractedData = await extractMarkersFromText(textToProcess, species, tissue);
            setResults(extractedData);

        } catch (e) {
            console.error(e);
            const errorMessage = e instanceof Error ? e.message : 'An unknown error occurred.';
            setError(`Failed to extract markers: ${errorMessage}`);
        } finally {
            setIsLoading(false);
        }
    }, []);

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-200 font-sans">
            <Header />
            <main className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    <div className="lg:col-span-4">
                        <InputForm onExtract={handleExtract} isLoading={isLoading} />
                    </div>
                    <div className="lg:col-span-8">
                        <ResultsDisplay
                            results={results}
                            isLoading={isLoading}
                            error={error}
                        />
                    </div>
                </div>
            </main>
        </div>
    );
};

export default App;
