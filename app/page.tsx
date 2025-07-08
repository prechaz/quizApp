'use client'

import QuizGame from "@/components/quizGame/quizGame";
import OnStartScreen from "@/components/startScreen/onStartScreen";
import {useState} from 'react'




export default function Home() {
   const [difficulty, setDifficulty] = useState<'easy' |'medium' | 'hard'|null>(null)
  return (
    <>

    <div className="w-full md:w-[500px] py-3 m-auto rounded-[5px]">
      {
        !difficulty ? (<div className="bg-[#a3a0a031] py-3 "><OnStartScreen onStart={setDifficulty}/></div>):(<QuizGame selectedDifficulty={difficulty}/>)
      }
    
    </div>
    </>
      
  );
}
