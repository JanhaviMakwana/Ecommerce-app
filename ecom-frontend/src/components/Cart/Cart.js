import { useEffect, useState } from 'react';
import { withState } from '../../ecom-context';
import { withRouter } from 'react-router-dom';
import ProductService from '../../services/product';
import { SET_ERROR } from '../../store/actionTypes';

const Cart = props => {
    const userId = props.state.user.id;
    const [products, setProducts] = useState([]);

    const fetch =  () => {
        ProductService.getCart(userId).then(products => {
            setProducts(products);
        }).catch(err => {
            props.dispatch({ type: SET_ERROR, error: err.message })
        });
    }

    useEffect(() => {
        fetch();
        // eslint-disable-next-line
    }, []);

    const deleteProductFromCart = (prodId) => {
        ProductService.deleteProductFromCart(userId, { prodId: prodId })
            .then(res => {
                fetch();
            }).catch(err => {
                this.props.dispatch({ type: SET_ERROR, error: err.message })
            });
    }

    const placeOrderHandler = () => {
        ProductService.placeOrder(userId)
            .then(res => {
                props.history.push('/orders');
            }).catch(err => {
                this.props.dispatch({ type: SET_ERROR, error: err.message })
            });
    };

    return (
        <div className="container-sm">
            <ul className="list-group px-5 py-1">
                <div className="d-flex flex-column px-5 py-1">
                    {products.length > 0 && products.map((product) => {
                        return <li className="list-group-item border border-dark my-1">
                            <div className="d-flex flex-row-reverse">
                                <div className="text-danger ml-5">
                                    <button className="btn" onClick={() => deleteProductFromCart(product.id)}><p className="text-danger h6 mb-1">Remove Item</p></button>
                                </div>
                                <div className="d-flex flex-row">
                                    <p className="h5 ml-5">Price: </p>
                                    <p className="h5 ml-5 text-secondary">{product.price} .Rs</p>
                                </div>
                                <div className="d-flex flex-row mx-3">
                                    <p className="h5 ml-5">Quantity: </p>
                                    <div className="ml-5">
                                        <i class="bi bi-dash-lg"></i>
                                    </div>
                                    <p className="h6 ml-3 text-secondary">{product.cartItem.quantity}</p>
                                    <div className="ml-3">
                                        <i class="bi bi-plus-lg"></i>
                                    </div>
                                </div>
                                <p className="h4 mx-5 d-inline-flex justify-content-start">{product.title}</p>
                            </div>
                        </li>
                    })}
                </div>
            </ul>
            {products.length > 0
                ? <button className="btn btn-outline-primary" onClick={placeOrderHandler}>
                    <p className="h5">Place Order</p>
                </button>
                : <p className="display-4">Cart is empty !!!</p>}
        </div>
    );

};

export default withRouter(withState(Cart));