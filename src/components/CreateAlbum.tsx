import { useState } from 'react'

export default function CreateAlbum() {
  const [inputValue, setInputValue] = useState('')
  const [isFocused, setIsFocused] = useState(false)

  return (
    <div className="flex flex-row items-center gap-5 w-full pb-3.5">
      {/* Material Design 3 Input Field */}
      <div className="relative flex-grow max-w-md">
        <input
          type="text"
          className={`w-full px-4 pt-5 pb-1 rounded-md border-b-2 bg-input outline-none transition-all text-secondary ${
            isFocused ? 'border-button' : 'border-input'
          }`}
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder=" "
        />
        <label
          className={`absolute left-4 pointer-events-none transition-all ${
            isFocused || inputValue
              ? 'text-xs text-button top-1'
              : 'text-gray-500 top-3'
          }`}
        >
          Album name
        </label>
        {isFocused && (
          <div className="absolute bottom-0 left-0 w-full h-0.5 bg-button transform scale-x-100 origin-left transition-transform"></div>
        )}
      </div>

      {/* Button */}
      <button className="flex flex-row gap-1 bg-button text-button-text rounded-full p-2 cursor-pointer">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 -960 960 960"
          width="24px"
          fill="#C4C7C5"
        >
          <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" />
        </svg>
      </button>
    </div>
  )
}
