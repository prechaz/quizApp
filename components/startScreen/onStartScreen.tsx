// Enable client-side rendering for this component
'use client'

// Import React hooks and components
import {useState} from 'react'
import Image from 'next/image'
import React from 'react'
// Import the bible image asset
import bible from '../../public/premium_vector-1746731652226-4826971b7cb2-removebg-preview.png'

// Define the props type for the component
type Props = {
    onStart: (difficulty: 'easy' | 'medium' | 'hard') => void
}

// Main component for the quiz start screen
export default function OnStartScreen({onStart}: Props) {
    // State to track the selected difficulty level
    const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard' | null>(null)

    return (
        // Main container - full screen height with proper overflow handling
        <div className='h-screen flex items-center justify-center p-4 overflow-hidden'>
            {/* Inner container with max width and full width */}
            <div className='max-w-md w-full flex flex-col justify-center h-full max-h-screen'>
                
                {/* Header Section */}
                <div className='text-center mb-4 sm:mb-6'>
                    {/* Bible image container */}
                    <div className='mb-3 sm:mb-4'>
                        <Image
                            src={bible} // Bible image source
                            alt='' // Empty alt text
                            width={80} // Reduced image width for mobile
                            className='mx-auto sm:w-[100px] md:w-[120px]' // Responsive image sizing
                        />
                    </div>
                    
                    {/* Main title with gradient text */}
                    <h1 className='font-bold text-xl sm:text-2xl md:text-3xl text-gradient mb-2 sm:mb-3'>
                        BIBLE QUIZ CHALLENGE
                    </h1>
                    
                    {/* Subtitle description */}
                    <p className='text-xs sm:text-sm text-[#f5f5f5]/80 leading-relaxed px-2'>
                        Test your Knowledge of the bible with questions of varying difficulty
                    </p>
                </div>

                {/* Difficulty Cards Section */}
                <div className='flex-1 flex flex-col justify-center mb-4 sm:mb-6'>
                    {/* Section title */}
                    <h2 className='text-base sm:text-lg font-semibold text-[#f5f5f5] text-center mb-3 sm:mb-4'>
                        Choose Your Challenge
                    </h2>
                    
                    {/* Container for difficulty cards with proper spacing */}
                    <div className='space-y-2 sm:space-y-3'>
                        {/* Map through difficulty options to create cards */}
                        {[
                            { level: 'easy', desc: 'Perfect for beginners', icon: '🌱' },
                            { level: 'medium', desc: 'Test your knowledge', icon: '⚡' },
                            { level: 'hard', desc: 'For true scholars', icon: '🔥' }
                        ].map(({ level, desc, icon }) => (
                            // Individual difficulty card
                            <div key={level}
                                onClick={() => setDifficulty(level as 'easy'|'medium'|"hard")} // Set selected difficulty on click
                                className={`p-3 sm:p-4 rounded-xl cursor-pointer transition-all duration-300 border-2 ${
                                    difficulty === level 
                                        ? 'bg-blue-600 border-blue-500 shadow-2xl transform scale-105' // Selected state styling
                                        : 'bg-white/5 border-white/10 hover:border-white/20 hover:bg-white/10' // Unselected state styling
                                }`}
                            >
                                {/* Card content container */}
                                <div className='flex items-center justify-between'>
                                    {/* Left side - icon and text */}
                                    <div className='flex items-center gap-2 sm:gap-3'>
                                        {/* Difficulty icon */}
                                        <span className='text-xl sm:text-2xl'>{icon}</span>
                                        
                                        {/* Text content */}
                                        <div>
                                            {/* Difficulty level name */}
                                            <h3 className='font-semibold text-white capitalize text-base sm:text-lg'>
                                                {level}
                                            </h3>
                                            {/* Difficulty description */}
                                            <p className='text-xs sm:text-sm text-white/70'>
                                                {desc}
                                            </p>
                                        </div>
                                    </div>
                                    
                                    {/* Right side - selection indicator (radio button style) */}
                                    <div className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full border-2 flex items-center justify-center ${
                                        difficulty === level 
                                            ? 'border-white bg-white' // Selected indicator styling
                                            : 'border-white/30' // Unselected indicator styling
                                    }`}>
                                        {/* Inner dot for selected state */}
                                        {difficulty === level && (
                                            <div className='w-2 h-2 sm:w-3 sm:h-3 bg-blue-500 rounded-full'></div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Start Button */}
                <button
                    onClick={() => difficulty && onStart(difficulty)} // Call onStart with selected difficulty
                    disabled={!difficulty} // Disable if no difficulty selected
                    className={`w-full py-3 sm:py-4 rounded-xl font-bold text-base sm:text-lg transition-all duration-300 ${
                        difficulty 
                            ? 'bg-green-600 text-white shadow-xl hover:shadow-2xl transform hover:scale-105 hover:bg-green-700' // Enabled state styling
                            : 'bg-gray-600/30 text-gray-400 cursor-not-allowed' // Disabled state styling
                    }`}
                >
                    {/* Dynamic button text based on selection */}
                    {difficulty ? `START ${difficulty.toUpperCase()} QUIZ` : 'SELECT DIFFICULTY FIRST'}
                </button>
            </div>
        </div>
    )
}