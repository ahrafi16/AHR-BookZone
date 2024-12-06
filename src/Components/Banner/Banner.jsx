import React from 'react';
import { Link } from 'react-router-dom';

const Banner = () => {
    return (
        <div className='flex justify-between items-center bg-gray-100 rounded-xl px-20 py-5 mt-10'>
            <div className='space-y-10'>
                <h1 className='md:text-6xl font-bold'>Books to freshen up <br /> your bookshelf</h1>

                <div>
                <Link to="/listedbooks">
                    <button className='btn text-white bg-[#85A98F]'>View The List</button>
                </Link>
                </div>


            </div>
            <div className='w-[318px]'>
                <img src="../../../Images/rb_2149334866.png" alt="" />
            </div>
        </div>
    );
};

export default Banner;