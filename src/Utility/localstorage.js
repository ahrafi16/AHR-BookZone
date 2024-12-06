// for wish list
const getstoredWishList = () => {
    const storedWishlist = localStorage.getItem('wishlists');
    if (storedWishlist) {
        try {
            return JSON.parse(storedWishlist);
        } catch (error) {
            console.error("Error parsing wishlists from localStorage", error);
            return [];
        }
    }
    return [];
}

const saveWishlist = bookId => {
    const storedWishlists = getstoredWishList();
    const exists = storedWishlists.find(id => id === bookId);
    if (!exists) {
        storedWishlists.push(bookId);
        localStorage.setItem('wishlists', JSON.stringify(storedWishlists));
    }
}

// for read list
const getstoredReadList = () => {
    const storedReadList = localStorage.getItem('readlists');
    if (storedReadList) {
        try {
            return JSON.parse(storedReadList);
        } catch (error) {
            console.error("Error parsing readlists from localStorage", error);
            return [];
        }
    }
    return [];
}

const saveReadlist = bookId => {
    const storedReadlists = getstoredReadList();
    const exists = storedReadlists.find(id => id === bookId);
    if (!exists) {
        storedReadlists.push(bookId);
        localStorage.setItem('readlists', JSON.stringify(storedReadlists));
    }
}

export { getstoredWishList, saveWishlist, getstoredReadList, saveReadlist };
