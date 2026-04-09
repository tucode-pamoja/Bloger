import React, { useRef, useState, useEffect } from 'react';

const ImageUploader = ({ onImagesChange }) => {
    const [images, setImages] = useState([]);
    const fileInputRef = useRef(null);

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        if (!files.length) return;

        // Create preview URLs
        const newImages = files.map(file => ({
            file,
            previewUrl: URL.createObjectURL(file),
            id: Math.random().toString(36).substr(2, 9)
        }));

        setImages(prev => [...prev, ...newImages]);
    };

    const handleRemove = (idToRemove) => {
        setImages(prev => prev.filter(img => img.id !== idToRemove));
    };

    useEffect(() => {
        if (onImagesChange) {
            onImagesChange(images.map(img => img.file));
        }
    }, [images, onImagesChange]);

    // Clean up ObjectURLs on unmount or remove
    useEffect(() => {
        return () => {
            images.forEach(img => URL.revokeObjectURL(img.previewUrl));
        };
    }, []);

    return (
        <div className="w-full animate-slide-up" style={{ animationDelay: '50ms' }}>
            <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide snap-x">

                {/* Upload Button */}
                <div
                    onClick={() => fileInputRef.current?.click()}
                    className="flex-none snap-start w-[100px] h-[100px] bg-gray-100 rounded-2xl flex flex-col items-center justify-center cursor-pointer active:scale-95 transition-transform border border-gray-200/50"
                >
                    <svg className="w-7 h-7 text-gray-400 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span className="text-[12px] font-medium text-gray-500">{images.length}/10</span>
                </div>

                {/* Hidden Input */}
                <input
                    type="file"
                    accept="image/*"
                    multiple
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    className="hidden"
                />

                {/* Previews */}
                {images.map((img) => (
                    <div key={img.id} className="flex-none snap-start w-[100px] h-[100px] rounded-2xl relative group overflow-hidden border border-gray-200/50 shadow-sm">
                        <img
                            src={img.previewUrl}
                            alt="preview"
                            className="w-full h-full object-cover"
                        />
                        {/* Delete button */}
                        <button
                            onClick={() => handleRemove(img.id)}
                            className="absolute top-1.5 right-1.5 bg-black/50 backdrop-blur-md text-white rounded-full p-1 
              opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity active:scale-95"
                        >
                            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                ))}

            </div>
        </div>
    );
};

export default ImageUploader;
