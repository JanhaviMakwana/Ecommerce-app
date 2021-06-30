const express = require('express');
const router = express.Router();
const { postCart, getCart, deleteItemFromCart, postOrder, getOrders } = require('../controllers/shop');
const { getCurrentUser, authenticate } = require('../middleware/auth');

router.get('/cart/:userId', [authenticate, getCurrentUser], getCart);
router.post('/cart/:userId', [authenticate, getCurrentUser], postCart);
router.post('/cart-delete-item/:userId', [authenticate, getCurrentUser], deleteItemFromCart);
router.post('/order/:userId', [authenticate, getCurrentUser], postOrder);
router.get('/order/:userId', [authenticate, getCurrentUser], getOrders);
module.exports = router;