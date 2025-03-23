import { useState, useEffect } from "react";

interface SearchBarProps {
    photos: Array<{
        filename: string;
        mimeType?: string;
        // ... otros campos
    }>;
}

export default function SearchBar({ photos }: SearchBarProps) {
    const [query, setQuery] = useState("");
    const [showImages, setShowImages] = useState(true);
    const [showVideos, setShowVideos] = useState(true);

    useEffect(() => {
        let filtered = photos.filter(photo => {
            const matchesSearch = photo.filename.toLowerCase().includes(query.toLowerCase());
            const isImage = photo.mimeType?.startsWith('image/');
            const isVideo = photo.mimeType?.startsWith('video/');
            
            return matchesSearch && (
                (showImages && isImage) || 
                (showVideos && isVideo)
            );
        });
        
        // Emitir un evento personalizado que Astro puede escuchar
        const event = new CustomEvent('photosFiltered', {
            detail: {
                filteredPhotos: filtered
            }
        });
        document.dispatchEvent(event);
    }, [query, showImages, showVideos, photos]);

    return (
        <div className="flex flex-row items-center justify-between">
            <div className="relative w-full max-w-md">
                <input
                    type="text"
                    className="w-full pl-10 pr-10 py-2 rounded-full shadow-md bg-input text-secondary font-medium focus:rounded-sm focus:outline-none transition-all"
                    placeholder="Search..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                <svg className="absolute left-3 top-2.5 h-5 w-5" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#C4C7C5">
                    <path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z"/>
                </svg>
            </div>
            <div className="flex flex-row gap-5 text-primary font-medium">
                <label className="flex flex-row items-center gap-2">
                    <md-checkbox 
                        touch-target="wrapper" 
                        checked={showImages}
                        onClick={() => setShowImages(!showImages)}
                    ></md-checkbox>
                    Images
                </label>
                <label className="flex flex-row items-center gap-2">
                    <md-checkbox 
                        touch-target="wrapper" 
                        checked={showVideos}
                        onClick={() => setShowVideos(!showVideos)}
                    ></md-checkbox>
                    Videos
                </label>
            </div>
        </div>
    );
}
