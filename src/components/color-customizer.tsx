import { useState } from 'react';

const ColorCustomizer = () => {
    const initialColors = {
        '--color-primary': '#1e1b4b',
        '--color-secondary': '#6b7280',
        '--color-accent': '#f97316',
        '--color-text-primary': '#000000',
        '--color-text-secondary': '#6b7280',
        '--color-background': '#ffffff',
        '--color-surface': '#d1d5db',
        '--color-hover': '#374151',
        '--color-border': '#ffffff',
    };

    const [colors, setColors] = useState<Record<string, string>>(initialColors);

    const handleColorChange = (variable: string, value: string) => {
        const root = document.documentElement;
        root.style.setProperty(variable, value);
        setColors((prevColors) => ({
            ...prevColors,
            [variable]: value,
        }));
    };

    return (
        <div className="p-4">
            <h1 className="text-xl font-bold mb-4">Customize Theme Colors</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.keys(colors).map((variable) => (
                    <div key={variable} className="flex items-center gap-2">
                        <label htmlFor={variable} className="text-sm font-medium w-32">
                            {variable.replace('--color-', '').replace('-', ' ')}:
                        </label>
                        <input
                            id={variable}
                            type="color"
                            value={colors[variable]}
                            onChange={(e) => handleColorChange(variable, e.target.value)}
                            className="w-12 h-8 border rounded"
                        />
                        <span>{colors[variable]}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ColorCustomizer;
