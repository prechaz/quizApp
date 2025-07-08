import React from 'react'
type Props = {
    score: number;
    quiz: string[];
}
export default function QuizHeader({score, quiz}:Props) {
  return (
    <div className='flex justify-between items-center'>
        <h1 className='text-[20px] text-[#f5f5f5] font-bold'>Bible Quiz</h1>
        <div className='bg-gradient px-6 rounded-2xl'>
            <h1>🏆{score}/{quiz.length}</h1>

        </div>
    </div>
  )
}
