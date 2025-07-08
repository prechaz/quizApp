import Image from 'next/image'
import React from 'react'
import congrat from '../../public/congrats.png'


type Props =  {
    score: number ;
    Quiz: unknown[]
}


export default function EndScreen({score,Quiz}:Props) {
  return (
    <div>
          <div className="text-center bg-[#51486877] py-12 text-[#f5f5f5]">
            <Image
            src={congrat}
            alt=''
            className='m-auto'
            />
          <h2 className="text-2xl font-bold my-4 ">Quiz Complete!</h2>
          <p className="text-lg">Your final score: {score} out of {Quiz.length}</p>
          <p className="text-md">
            Percentage: {Math.round((score / Quiz.length) * 100)}%
          </p>
          <button className='bg-gradient py-2 px-10 mt-3 rounded'>Try Again</button>
        </div>
    </div>
  )
}
