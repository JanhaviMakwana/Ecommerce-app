import { useEffect, useState } from 'react';
import { withState } from '../../ecom-context';
import { withRouter } from 'react-router-dom';
import ProductService from '../../services/product';
import { SET_ERROR } from '../../store/actionTypes';
import './ShowProducts.css';

const ShowProducts = (props) => {

    const [products, setProducts] = useState([]);

    const getUnique = (arr, comp) => {
        const unique = arr.map(e => e[comp])
            .map((e, i, final) => final.indexOf(e) === i && i)
            .filter((e) => arr[e]).map(e => arr[e]);
        return unique;
    }

    useEffect(() => {
        const fetch = () => {
            const keyword = props.state.searchKeyword
            ProductService.getProducts(`?keyword=${keyword}`)
                .then(res => {
                    setProducts(getUnique(res, 'id'));
                })
                .catch(err => {
                    props.dispatch({ type: SET_ERROR, error: err.message })
                });
        }
        fetch();
        // eslint-disable-next-line 
    }, [props.state.searchKeyword]);

    const addToCartHandler = (id) => {
        if (props.state.user) {
            const userId = props.state.user.id;
            ProductService.postCart({ prodId: id }, userId)
                .then(res => {

                })
                .catch(err => {
                    props.dispatch({ type: SET_ERROR, error: err.message })
                });
        } else {
            props.history.push('/auth');
        }
    };

    return (
        <div className="container-lg">
            <div className="d-flex flex-row py-1">
                {products.length > 0 && products.map((product, index) => {
                    return (
                        <div className="product px-5 py-3  border mx-1" key={index}>
                            <div id="">
                                <h5>{product.title}</h5>
                            </div>
                            <div className="description">
                                <div className="product-desc">{product.description}</div>
                            </div>
                            <div className="d-flex flex-row my-1">
                                <label className="h6 pt-1 pr-3">Price: </label>
                                <p className="h5">{" " + product.price} Rs.</p>
                            </div>
                            <button
                                className="btn btn-danger btn-block"
                                onClick={() => addToCartHandler(product.id)}
                            >
                                ADD TO CART
                            </button>
                        </div>
                    );
                })}
            </div>
        </div>
    );

};

export default withRouter(withState(ShowProducts));