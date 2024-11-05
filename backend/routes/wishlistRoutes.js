import express from 'express';
import { getWishlist, addToWishlist, removeFromWishlist } from '../controllers/wishlistController.js';

const router = express.Router();

// Get user's wishlist
router.get('/:userId', getWishlist);

// Add item to wishlist
router.post('/:userId', addToWishlist);

// Remove item from wishlist
router.delete('/:userId/:productId', removeFromWishlist);

export default router;
