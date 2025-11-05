import { GoogleGenAI, Type } from "@google/genai";
import type { MarkerData } from '../types';

export const extractMarkersFromText = async (
    text: string,
    species: string,
    tissue: string
): Promise<MarkerData[]> => {
    // A new GoogleGenAI instance should be created for each request
    // to ensure it uses the latest API key.
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    const context = `
        Additional context provided by the user:
        - Species: ${species || 'Not specified'}
        - Tissue: ${tissue || 'Not specified'}
    `;

    const prompt = `
        You are an expert biologist. Your task is to extract structured information about cell types and their corresponding protein or gene markers from the following scientific text.

        Instructions:
        1. Identify all mentions of cell types.
        2. For each cell type, list its positive markers (e.g., CD45+, AGER+) and negative markers (e.g., CD3-, TP63-).
        3. Identify the experimental method used to determine these markers (e.g., flow cytometry, scRNA-seq, CyTOF, immunohistochemistry, etc.). If not mentioned, state "Not specified".
        4. Identify the species being studied. If user context is available, use it. Otherwise, infer from the text. If not found, state "Not specified".
        5. Identify the tissue or organ of origin. If user context is available, use it. Otherwise, infer from the text. If not found, state "Not specified".
        6. Identify the experimental condition (e.g., healthy, tumor, treated with X). If not mentioned, state "Control" or "Not specified".
        7. Identify the source of the information within the text if possible (e.g., "Figure 1A", "in the methods section"). If not clear, state "From text".
        8. Format the output STRICTLY as a JSON array of objects, where each object represents a unique cell type profile. Do not include any explanations or text outside of the JSON array.

        ${context}

        Scientific Text:
        ---
        ${text.substring(0, 30000)}
        ---
    `;

    const responseSchema = {
        type: Type.ARRAY,
        items: {
            type: Type.OBJECT,
            properties: {
                cellType: { type: Type.STRING, description: 'Name of the cell type.' },
                positiveMarkers: { type: Type.ARRAY, items: { type: Type.STRING }, description: 'List of positive markers (gene/protein names only, without the "+").' },
                negativeMarkers: { type: Type.ARRAY, items: { type: Type.STRING }, description: 'List of negative markers (gene/protein names only, without the "-").' },
                method: { type: Type.STRING, description: 'Experimental method used.' },
                species: { type: Type.STRING, description: 'Species studied.' },
                tissue: { type: Type.STRING, description: 'Tissue or organ of origin.' },
                condition: { type: Type.STRING, description: 'Experimental condition (e.g., healthy, disease name).' },
                source: { type: Type.STRING, description: 'Source of the information (e.g., section, figure, or citation).' },
            },
            required: ['cellType', 'positiveMarkers', 'negativeMarkers', 'method', 'species', 'tissue', 'condition', 'source'],
        },
    };

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                responseMimeType: 'application/json',
                responseSchema,
            },
        });
        
        const jsonString = response.text.trim();
        if (!jsonString) {
            return []; // Return empty array if the model returns nothing
        }
        
        const parsedData = JSON.parse(jsonString);

        if (!Array.isArray(parsedData)) {
            console.error("API response is not an array:", parsedData);
            throw new Error("API did not return a valid array of marker data.");
        }
        
        return parsedData as MarkerData[];

    } catch (error) {
        console.error("Error calling Gemini API or parsing response:", error);
        if (error instanceof SyntaxError) {
            throw new Error("Failed to parse data from the model. The response was not valid JSON.");
        }
        throw new Error("An error occurred while communicating with the AI model.");
    }
};
