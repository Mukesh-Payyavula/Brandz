import Wishlist from '../models/wishlistModel.js'; // Assuming you have a Wishlist model set up

// Get user's wishlist
export const getWishlist = async (req, res) => {
    try {
        const wishlist = await Wishlist.find({ user: req.params.userId });
        res.status(200).json(wishlist);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Add item to wishlist
export const addToWishlist = async (req, res) => {
    const { productId } = req.body;
    const { userId } = req.params;

    try {
        const newItem = await Wishlist.create({ user: userId, product: productId });
        res.status(201).json(newItem);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Remove item from wishlist
export const removeFromWishlist = async (req, res) => {
    const { userId, productId } = req.params;

    try {
        await Wishlist.findOneAndDelete({ user: userId, product: productId });
        res.status(204).send(); // No content
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
