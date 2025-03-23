import { useState } from 'react';

// Remove Material imports from this component for now
// import '@material/web/textfield/outlined-text-field.js';

export default function CreateAlbum() {
    const [isCreating, setIsCreating] = useState(false);
    
    const handleClick = () => {
        console.log("Button clicked!");
        setIsCreating(!isCreating);
    };

    return (
        <div className='flex flex-row items-center gap-5 w-full py-2 min-h-20'>
            <button className='flex flex-row gap-1 bg-button text-button-text rounded-full p-3 cursor-pointer' onClick={handleClick}>
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#C4C7C5"><path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z"/></svg>
            </button>
            
            {isCreating && (
                <>
                <div>
                   <md-outlined-text-field label="Favorite food">
                   </md-outlined-text-field>
                </div>

                <md-filled-icon-button>
                <md-icon><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#C4C7C5"><path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"/></svg></md-icon>
                </md-filled-icon-button>
                </>
            )}
        </div>
    );
}