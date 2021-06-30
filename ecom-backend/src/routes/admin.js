const express = require('express');
const {addProduct, getProducts,deleteProductById, updateProduct, searchProducts} = require('../controllers/admin');
const {authenticate, getCurrentUser} = require('../middleware/auth');
const router = express.Router();

router.post('/add-product/:userId',[authenticate,getCurrentUser], addProduct);
router.get('/get-products', getProducts);
router.post('/:id',[authenticate], deleteProductById);
router.post('/product/:id',[authenticate], updateProduct);

module.exports = router;