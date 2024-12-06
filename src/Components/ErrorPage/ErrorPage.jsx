import React from 'react';
import { Link } from 'react-router-dom';


const ErrorPage = () => {
    return (
        <div>
            <h1 className='text-7xl font-extrabold text-center'>Oops !!</h1>
            <p className='text-center mt-7 text-3xl text-[#525B44] hover:text-red-700'><Link to="/">Go back Home</Link></p>
        </div>
    );
};

export default ErrorPage;