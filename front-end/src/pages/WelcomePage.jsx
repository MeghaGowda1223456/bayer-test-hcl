import React from 'react'
import { NavLink } from 'react-router-dom'

const DATA = [
    {
        title: 'COVID-19 Updates',
        description: 'Stay informed about the latest COVID-19 guidelines and vaccination information.',
        btn_txt: 'learn more'
    },
    {
        title: 'Heart Health',
        description: 'Discover tips and information for maintaining a healthy heart and cardiovascular system.',
        btn_txt: 'learn more'
    },
    {
        title: 'Mental Wellness',
        description: 'Explore resources and support options for maintaining good mental health.',
        btn_txt: 'learn more'
    },
    {
        title: 'Nutrition & Diet',
        description: 'Learn about balanced nutrition and healthy eating habits for overall wellbeing.',
        btn_txt: 'learn more'
    },
]


function Header() {
    return (
        <header className='w-full h-[50%] bg-custom-blue text-white flex flex-col items-center '>
            <h1 className=' text-3xl font-bold mb-8 mt-6'>Bayer Healthcare</h1>
            <nav className=' p-3 bg-custom-green w-full'>
                <ul className=' flex justify-center gap-3'>
                    <l1><NavLink to='#' className=' cursor-pointer'>Home</NavLink></l1>
                    <l1><NavLink to='#' className=' cursor-pointer'>Health Topics</NavLink></l1>
                    <l1><NavLink to='#' className=' cursor-pointer'>Resources</NavLink></l1>
                    <l1><NavLink to='#' className=' cursor-pointer'>About Us</NavLink></l1>
                    <l1><NavLink to='#' className=' cursor-pointer'>Contact</NavLink></l1>
                </ul>
            </nav>
            < h2 className=' mt-7 text-3xl font-bold mb-3'>Your Health, Our Priority</h2>
            <p>Explore the latest health information and resources from Bayer Healthcare</p>
        </header>
    )
}

function Content() {
    return (
        <div className=' h-[100%]'>
            <h1 className=' text-2xl font-bold mb-8 mt-6'>Featured Health Topics</h1>

            <div className=' w-full flex flex-wrap flex-row gap-3'>
                {DATA.map(item=>< div className=' p-1 bg-white rounded-md w-52'>
                <h1 className=' text-xl font-bold mb-8 mt-6'>{item.title}</h1>
                <p className=' w-24'>{item.description}</p>
                <button>{item.btn_txt}</button>
                </div>)}
            </div>
        </div>
    )
}

function WelcomePage() {
    return (
        <div className=' w-full h-[2000]'>
            {/* Header */}
            <Header />
            {/* Content */}
            <Content />
        </div>
    )
}

export default WelcomePage