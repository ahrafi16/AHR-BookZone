import { useLoaderData, useParams } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { saveWishlist, saveReadlist } from "../../Utility/localstorage";


const BookDetails = () => {
    const books = useLoaderData();
    const { bookId } = useParams();
    // const bookIdInt = parseInt(bookId);
    const book = books.find(book => book.bookId == bookId);

    const handleWishlist = () =>{
        saveWishlist(bookId);
        toast('Added to Wishlist Successfully');
    }
    const handleReadlist = () =>{
        saveReadlist(bookId);
        toast('Added to Read list Successfully');
    }

    return (
        <div className="flex flex-col md:flex-row gap-10 flex-1 my-10">
            <div className="p-5 bg-gray-100 flex flex-1 justify-center items-center">
                <img src={book.image} alt="" />
            </div>
            <div className="space-y-4 flex-1">
                <h1 className="text-4xl font-bold">{book.bookName}</h1>
                <p>By : {book.author} </p>
                <p className="border-y py-2">{book.category}</p>
                <p><span className="font-bold">Review</span> : {book.review}</p>
                <div className="flex gap-4 items-center">
                    <p className="font-bold">Tag</p>

                    {
                        book.tags.map(tag => <p className="mr-4 font-bold text-[#5A6C57]">#{tag}</p>)
                    }

                </div>
                <div className="flex gap-10">
                    <div>
                        <p>Number of Pages:</p>
                        <p>Publisher:</p>
                        <p>Year of publishing:</p>
                        <p>Rating:</p>
                    </div>
                    <div className="font-bold">
                        <p>{book.totalPages}</p>
                        <p>{book.publisher}</p>
                        <p>{book.yearOfPublishing}</p>
                        <p>{book.rating}</p>
                    </div>
                </div>
                <div className="flex gap-5">
                    <button onClick={handleReadlist} className="btn border border-black">Read</button>
                    <button onClick={handleWishlist} className="btn bg-[#5A6C57] text-white">Wishlist</button>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default BookDetails;