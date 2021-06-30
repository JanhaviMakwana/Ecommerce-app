const db = require('../models');
const Product = db.products;
const { Op } = require('sequelize');

exports.addProduct = async (req, res, next) => {
    const { title, description, category, price } = req.body;
    try {

        const result = await req.user.createProduct({
            title: title,
            description: description,
            category: category,
            price: price
        });
        if (result) {
            const products = await req.user.getProducts();
            return res.send(products);
        }

    } catch (e) {
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

exports.deleteProductById = async (req, res) => {
    const { id } = req.params;
    try {
        const product = await (await Product.findByPk(id)).destroy();
        if (product) {
            const products = await Product.findAll();
            return res.status(200).send(products);
        }
        return res.status(404).json({ message: 'Product Not Found' })

    } catch (e) {
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

exports.updateProduct = async (req, res) => {
    const { id } = req.params;
    const data = req.body;
    try {
        const product = await Product.findByPk(id);
        if (product) {
            const updateProduct = await product.update(data);
            return res.send(updateProduct);
        }
    } catch (e) {
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

exports.getProducts = async (req, res) => {
    const { keyword } = req.query;
    try {
        if (keyword) {
            const productsArr1 = await Product.findAll({
                where: {
                    title: {
                        [Op.regexp]: keyword
                    }
                }
            });
            const productsArr2 = await Product.findAll({
                where: {
                    description: {
                        [Op.regexp]: keyword
                    }
                }
            });
            const productsArr3 = await Product.findAll({
                where: {
                    category: {
                        [Op.regexp]: keyword
                    }
                }
            });
            res.send(productsArr1.concat(productsArr2).concat(productsArr3));
        } else {
            const products = await Product.findAll();
            return res.send(products);
        }

    } catch (e) {
        console.log(e);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};


