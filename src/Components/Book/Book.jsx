import React from 'react';
import { FaRegStar } from "react-icons/fa6";
import { Link } from 'react-router-dom';

const Book = ({ book }) => {
    const { bookId, image, bookName, author, category, rating } = book;
    return (
        <Link to={`/book/${bookId}`}>
            <div className='border rounded-xl p-5'>
                <div className='flex justify-center bg-gray-200 rounded-xl p-5'>
                    <img className='rounded-xl h-48 object-cover' src={image} alt="" />
                </div>
                <div className='space-y-3 mt-2'>
                    <h1 className='font-bold text-2xl'>{bookName}</h1>
                    <p className='flex gap-2'>
                        {
                            book.tags.map(tag => <p className="text-[#85A98F] font-bold">{tag}</p>)
                        }
                    </p>
                    <p>By : {author}</p>
                    <div className='flex justify-between'>
                        <p>{category}</p>
                        <p className='flex items-center gap-1'>{rating} <FaRegStar /></p>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default Book;