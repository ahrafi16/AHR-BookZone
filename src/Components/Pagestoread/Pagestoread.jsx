import { useEffect, useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import { getstoredReadList } from "../../Utility/localstorage";
import { BarChart, Bar, XAxis, YAxis } from 'recharts';

const Pagestoread = () => {
    const books = useLoaderData();
    const [readListbook, setReadlistBook] = useState([]);
    console.log(readListbook);
    useEffect(() => {
        const readBookId = getstoredReadList(); // Ensure you have this function for read list
        if (books.length > 0) {
            const booksRead = [];
            for (const bookId of readBookId) {
                const book = books.find(book => book.bookId === bookId);
                if (book) {
                    booksRead.push(book);
                }
            }
            setReadlistBook(booksRead);
        }
    }, [books]);
    return (
        <div className=' flex justify-center w-full my-10'>
            <BarChart width={600} height={300} data={readListbook}>
                <XAxis dataKey="bookName" />
                <YAxis />
                <Bar dataKey="totalPages" barSize={30} fill="#85A98F"/>
            </BarChart>
        </div>
    );
};

export default Pagestoread;