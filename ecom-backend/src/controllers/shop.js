const db = require('../models');
const Product = db.products;

exports.postCart = async (req, res, next) => {
    const { prodId } = req.body;
    let fetchedCart;
    let newQuantity = 1;
    req.user.getCart()
        .then(cart => {
            if (!cart) {
                req.user.createCart()
                    .then(result => {
                        fetchedCart = result;
                        return Product.findByPk(prodId);
                    })
                    .then(product => {
                        return fetchedCart.addProduct(product, {
                            through: { quantity: newQuantity }
                        });
                    })
            } else {
                fetchedCart = cart;
                return fetchedCart.getProducts({ where: { id: prodId } })
                    .then(products => {
                        let product;
                        if (products.length > 0) {
                            product = products[0];
                        }
                        if (product) {
                            const oldQuantity = product.cartItem.quantity;
                            newQuantity = oldQuantity + 1;
                            return product;
                        }
                        return Product.findByPk(prodId);
                    })
                    .then(product => {
                        return fetchedCart.addProduct(product, {
                            through: { quantity: newQuantity }
                        });
                    })
            }
        })
        .then(() => {
            res.status(200).json({ message: 'Product added successfully...' });
        })
        .catch((e) => {
            return res.status(500).json({ message: 'Internal Server Error'  });
        });
};

exports.getCart = async (req, res) => {
    try {
        const cart = await req.user.getCart();
        if (!cart) {
            res.send([]);
        } else {
            cart.getProducts().then(products => {
                res.send(products);
            })
        }
    } catch (e) {
        return res.status(500).json({ message: 'Internal Server Error'  });
    }
};

exports.deleteItemFromCart = async (req, res) => {
    const { prodId } = req.body;
    try {
        const cart = await req.user.getCart();
        if (!cart) {
            res.send([]);
        } else {
            cart.getProducts({ where: { id: prodId } }).then(products => {
                const product = products[0];
                return product.cartItem.destroy();
            })
                .then(result => {
                    res.send(result);
                })
        }
    } catch (e) {
        return res.status(500).json({ message: 'Internal Server Error'  });
    }
};

exports.postOrder = (req, res) => {
    let fetchedCart;
    let totalPrice = 0;
    let totalProducts = 0;
    req.user
        .getCart()
        .then(cart => {
            fetchedCart = cart;
            return cart.getProducts();
        })
        .then(products => {
            return req.user
                .createOrder({ totalPrice: 0, totalProducts: 0 })
                .then(order => {
                    return order.addProduct(
                        products.map(product => {
                            product.orderItem = { quantity: product.cartItem.quantity };
                            totalProducts += (product.cartItem.quantity)
                            totalPrice += (product.price) * (product.cartItem.quantity);
                            order.update({ totalPrice: totalPrice, totalProducts: totalProducts });
                            return product;
                        })
                    );
                })
        })
        .then(result => {
            return fetchedCart.setProducts(null);
        })
        .then(result => {
            res.status(200).json({ message: 'order placed successfully...' });
        })
        .catch(err =>
            res.status(500).json({ message: 'Internal Server Error' }));
};

exports.getOrders = (req, res) => {
    req.user
        .getOrders({ include: ['products'] })
        .then(orders => {
            res.send(orders);
        })
        .catch(err =>
            res.status(500).json({ message: 'Internal Server Error' }));
};