import React from 'react'
import { assets } from '../assets/forever-assets/assets/frontend_assets/assets'

const Footer = () => {
  return (
    <div>
        <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>

            <div>
                <img src={assets.logo} className='mb-5 w-32' alt="" />
                <p className='w-full md:w-2/3 text-gray-600'>
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iusto officiis voluptas consequatur rem, pariatur commodi fuga illo rerum reprehenderit. Repellat alias ipsam officiis, dolorem reprehenderit saepe dolore voluptates eligendi modi?
                </p>
            </div>

            <div>
                <p className='text-xl font-medium mb-5'>COMPANY</p>
                <ul className='flex flex-col gap-1 text-gray-600'>
                <l1>Home</l1>
                <l1>About Us</l1>
                <l1>Delivery</l1>
                <l1>Privacy Policy</l1>
                </ul>
            </div>

            <div>
                <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
                <ul className='flex flex-col gap-1 text-gray-600'>
                    <l1>+1-212-456-7890</l1>
                    <l1>foreverfashion.com</l1>

                </ul>
            </div>

        </div>

        <div>
            <hr />
            <p className='py-5 text-sm text-center'>Copyright 20240 forever.com .All Right Reserved</p>
        </div>
    </div>
  )
}

export default Footer