import { useEffect, useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import { getstoredWishList, getstoredReadList } from "../../Utility/localstorage";
import { IoMdPeople } from "react-icons/io";
import { MdOutlineContactPage, MdOutlinePublishedWithChanges } from "react-icons/md";
import { RiArrowDropDownLine } from "react-icons/ri";

const ListedBooks = () => {
    const books = useLoaderData();
    const [wishlistedBook, setWishlistedBook] = useState([]);
    const [readListbook, setReadlistBook] = useState([]);
    const [activeSession, setActiveSession] = useState('read');
    const [sort, setSort] = useState('rating');

    const handleBooksort = criterion => {
        setSort(criterion);
        const sorterBooks = (booklist) => {
            return booklist.sort((a, b) => {
                if (criterion === 'rating') {
                    return b.rating - a.rating;
                }
                else if (criterion === 'numofpage') {
                    return b.totalPages - a.totalPages;
                }
                else if (criterion === 'publishingyear') {
                    return b.yearOfPublishing - a.yearOfPublishing;
                }
                return 0;
            })
        }
        if(activeSession === 'read'){
            setReadlistBook(sorterBooks([...readListbook]));
        }
        else if(activeSession === 'wishlist'){
            setWishlistedBook(sorterBooks([...wishlistedBook]));
        }
    }

    // Fetch and set wishlisted books
    useEffect(() => {
        const storedBookId = getstoredWishList();
        if (books.length > 0) {
            const booksStored = [];
            for (const bookId of storedBookId) {
                const book = books.find(book => book.bookId === bookId);
                if (book) {
                    booksStored.push(book);
                }
            }
            setWishlistedBook(booksStored);
        }
    }, [books]);

    // Fetch and set read books
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
        <div className="my-10">
            <h1 className="text-center text-4xl bg-gray-100 p-10 rounded-xl font-bold">Books</h1>

            {/* Sort By Dropdown */}
            <div className="text-center p-10">
                <details className="dropdown">
                    <summary className="btn m-1 text-white bg-[#85A98F]">Sort By <RiArrowDropDownLine className="text-2xl" /></summary>
                    <ul className="menu dropdown-content bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                        {/* Example filter options */}
                        <li onClick={() => handleBooksort('rating')}><a>Rating</a></li>
                        <li onClick={() => handleBooksort('numofpage')}><a>Number of pages</a></li>
                        <li onClick={() => handleBooksort('publishingyear')}><a>Publishing year</a></li>
                    </ul>
                </details>
            </div>

            {/* Active Section Buttons */}
            <div className="flex gap-5 pt-2 my-2">
                <h1
                    onClick={() => setActiveSession('read')}
                    className={`border-t border-l border-r p-2 rounded-lg cursor-pointer ${activeSession === 'read' ? 'bg-[#85A98F]' : ''}`}
                >
                    Read Books
                </h1>
                <h1
                    onClick={() => setActiveSession('wishlist')}
                    className={`border-t border-l border-r p-2 rounded-lg cursor-pointer ${activeSession === 'wishlist' ? 'bg-[#85A98F]' : ''}`}
                >
                    Wishlist Books
                </h1>
            </div>

            {/* Render the active section */}
            <div>
                {activeSession === 'read' ? (
                    // Render read books
                    readListbook.map(book => (
                        <div key={book.bookId} className="flex flex-col md:flex-row gap-10 border rounded-xl p-5 mb-5">
                            <div className="p-5 bg-gray-100 rounded-xl flex justify-center items-center">
                                <img className="h-32 object-cover" src={book.image} alt={book.bookName} />
                            </div>
                            <div className="space-y-3">
                                <h1 className="text-xl font-bold">{book.bookName}</h1>
                                <p>By : {book.author}</p>
                                <div div className="flex flex-col md:flex-row gap-2">
                                    <p className="font-bold">Tag</p>
                                    {book.tags.map((tag, index) => (
                                        <p key={index} className="text-[#85A98F] font-bold mr-2">#{tag}</p>
                                    ))}
                                    <p className="flex items-center gap-1">
                                        <MdOutlinePublishedWithChanges /> Year of publishing : {book.yearOfPublishing}
                                    </p>
                                </div>
                                <div className="flex gap-2">
                                    <p className="flex items-center gap-1"><IoMdPeople /> Publisher : {book.publisher}</p>
                                    <p className="flex items-center gap-1"><MdOutlineContactPage /> Page : {book.totalPages}</p>
                                </div>
                                <div className="flex flex-col md:flex-row gap-2">
                                    <p className="py-2 px-5 rounded-full bg-[#525B4426] text-[#525B44] font-bold text-center">Category : {book.category}</p>
                                    <p className="py-2 px-5 rounded-full text-[#5A6C57] bg-[#5A6C5726] font-bold text-center">Rating : {book.rating}</p>
                                    <Link to={`/book/${book.bookId}`}>
                                        <button className="btn py-2 px-5 rounded-full text-white bg-[#85A98F]">View Details</button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    // Render wishlist books
                    wishlistedBook.map(book => (
                        <div key={book.bookId} className="flex flex-col md:flex-row gap-10 border rounded-xl p-5 mb-5">
                            <div className="p-5 bg-gray-100 rounded-xl flex justify-center items-center">
                                <img className="h-32 object-cover" src={book.image} alt={book.bookName} />
                            </div>
                            <div className="space-y-3">
                                <h1 className="text-xl font-bold">{book.bookName}</h1>
                                <p>By : {book.author}</p>
                                <div className="flex flex-col md:flex-row gap-2">
                                    <p className="font-bold">Tag</p>
                                    {book.tags.map((tag, index) => (
                                        <p key={index} className="text-[#85A98F] font-bold mr-2">#{tag}</p>
                                    ))}
                                    <p className="flex items-center gap-1">
                                        <MdOutlinePublishedWithChanges /> Year of publishing : {book.yearOfPublishing}
                                    </p>
                                </div>
                                <div className="flex gap-2">
                                    <p className="flex items-center gap-1"><IoMdPeople /> Publisher : {book.publisher}</p>
                                    <p className="flex items-center gap-1"><MdOutlineContactPage /> Page : {book.totalPages}</p>
                                </div>
                                <div className="flex flex-col md:flex-row gap-2">
                                    <p className="py-2 px-5 rounded-full bg-[#525B4426] text-[#525B44] font-bold text-center">Category : {book.category}</p>
                                    <p className="py-2 px-5 rounded-full text-[#5A6C57] bg-[#5A6C5726] font-bold text-center">Rating : {book.rating}</p>
                                    <Link to={`/book/${book.bookId}`}>
                                        <button className="btn py-2 px-5 rounded-full text-white bg-[#85A98F]">View Details</button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default ListedBooks;
