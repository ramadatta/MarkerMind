import type { MarkerData } from '../types';

const convertToCsv = (data: MarkerData[]): string => {
    if (data.length === 0) return '';
    
    // Use a fixed header order for consistency
    const headers: (keyof MarkerData)[] = [
        'cellType', 
        'positiveMarkers', 
        'negativeMarkers', 
        'method', 
        'species', 
        'tissue', 
        'condition', 
        'source'
    ];
    
    const csvRows = [headers.join(',')];

    for (const row of data) {
        const values = headers.map(header => {
            const value = row[header];
            let formattedValue = '';

            if (Array.isArray(value)) {
                // Join array items with a semicolon, and enclose in quotes
                formattedValue = `"${value.join('; ')}"`;
            } else {
                // Escape double quotes and enclose in quotes
                const escaped = ('' + value).replace(/"/g, '""');
                formattedValue = `"${escaped}"`;
            }
            return formattedValue;
        });
        csvRows.push(values.join(','));
    }

    return csvRows.join('\n');
};

const downloadFile = (content: string, fileName: string, mimeType: string) => {
    const blob = new Blob([content], { type: mimeType });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(link.href);
};

export const exportToCsv = (data: MarkerData[], fileName: string) => {
    const csvContent = convertToCsv(data);
    downloadFile(csvContent, fileName, 'text/csv;charset=utf-8;');
};

export const exportToJson = (data: MarkerData[], fileName: string) => {
    const jsonContent = JSON.stringify(data, null, 2);
    downloadFile(jsonContent, fileName, 'application/json;charset=utf-8;');
};
