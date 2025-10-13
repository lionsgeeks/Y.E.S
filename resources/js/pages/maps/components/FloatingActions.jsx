import React from "react";

const FloatingActions = ({ onHelp, onLocate }) => (
    <div className="fixed bottom-4 right-4 gap-3 flex flex-col items-end">
        <button onClick={onHelp} className="p-2 aspect-square animate-bounce bg-alpha text-white rounded-full ">
            <span className="font-bold text-xl">?</span>
        </button>
        <button onClick={onLocate} className="bg-alpha text-white p-3 rounded-full shadow-lg">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
        </button>
    </div>
);

export default FloatingActions;



