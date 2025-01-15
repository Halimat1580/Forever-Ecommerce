import React from 'react'
import { assets } from '../assets/forever-assets/assets/frontend_assets/assets'
import NewsletterBox from '../Components/NewsletterBox'
import Title from '../Components/Title'

const About = () => {
  return (
    <div>
      <div className='text-2xl text-center pt-8 border-t'>
    <Title text1={'About'} text2={'US'}/>
    </div>

    <div className='my-10 flex flex-col md:flex-row gap-16'>
      <img className='w-full md:max-w-[450px]' src={assets.about_img} alt="" />

      <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
      <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quasi illo illum quisquam modi expedita nisi sunt blanditiis ipsam dolor nihil numquam vel eos ut, omnis animi iure quos rerum beatae.</p>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae velit, et sed commodi enim corporis ratione beatae quia. Officia, ea!</p>
      <b className='text-gray-800'>Our Mission</b>
      <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Beatae, incidunt placeat ex nemo debitis explicabo.</p>
      </div>
      </div>

      <div className='text-xl py-4'>
        <Title text1={'WHY'} text2={'CHOOSE US'}/>

      </div>
      
      <div className='flex flex-col md:flex-row text-sm mb-20'>
       <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
        <b>Quality Assurance:</b>
        <p className='text-gray-600'>We meticulously Select and vet eact product to ensure it meets out stringnent quality standards.</p>
       </div>

       <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
        <b>Convenience:</b>
        <p className='text-gray-600'>We meticulously Select and vet eact product to ensure it meets out stringnent quality standards.</p>
       </div>

       <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
        <b>Exceptional customer service:</b>
        <p className='text-gray-600'>We meticulously Select and vet eact product to ensure it meets out stringnent quality standards.</p>
       </div>

      </div>

      <NewsletterBox/>

   
      
    </div>
  )
}

export default About