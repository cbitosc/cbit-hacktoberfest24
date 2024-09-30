import React from 'react'
import StackedTextDark from './StackedTextdark'
import heart from "./assets/loveascii.png"
import Image from 'next/image'
import Link from 'next/link'

const Preptember = () => {
  return (
    <div className="preptember-cta flex flex-col items-center justify-between  bg-beige p-8">
      <h1 className='text-4xl w-full text-center flex items-center justify-center'><StackedTextDark text="Preptember" fontSize='55px' /></h1>
      <div className='lg:flex-row w-full flex flex-col items-center justify-between my-16 px-2 lg:px-28'>
      <div className="text-center lg:text-left lg:w-1/2">
        <h1 className="text-2xl lg:text-4xl font-bold text-darkgrey"> Prepare for Hacktoberfest with Preptember. Get on board with COSC as a month of learning, coding, and open source contributions awaits!</h1>
        
        <Link href="/preptember">
        <button className="mt-6 bg-deeppink text-white px-6 py-3 rounded-full shadow-lg hover:bg-pink hover:text-black transition duration-300">
          Join Preptember Today
        </button></Link>
      </div>
      
      <div className="mt-8 lg:mt-0 lg:w-1/2 flex justify-center">
        <Image 
          src={heart}
          alt="Preptember Event" 
          className="w-full max-w-lg "
        />
      </div>
      </div>
      

    </div>
  )
}

export default Preptember
