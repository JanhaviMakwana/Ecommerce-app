import { useEffect, useState } from "react";
import { withState } from "../ecom-context";
import { withRouter } from "react-router-dom";
import ProductService from "../services/product";
import { SET_ERROR } from "../store/actionTypes";
import './Orders.css';

const Orders = (props) => {
    const userId = props.state.user.id;
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetch = () => {
            ProductService.getOrders(userId)
                .then(fetchedOrders => {
                    setOrders(fetchedOrders);
                })
                .catch(err => {
                    props.dispatch({ type: SET_ERROR, error: err.message })
                });

        }
        fetch();
        // eslint-disable-next-line
    }, []);

    return (
        <div className="container-fluid">
            <ul className="list-group px-5 py-1">
                {orders.length > 0 && orders.map((order) => {
                    return <div className="d-flex flex-column px-5 py-1">
                        <li className="orderItem list-group-item my-1">
                            <div className="d-flex flex-row">
                                <div className="px-5 py-1">
                                    <p className="h6">{order.createdAt}</p>
                                </div>
                                <div className="d-flex flex-row mx-3">
                                    <p className="h6 px-1 py-1">Amount :</p>
                                    <p className="h5 text-secondary">{order.totalPrice} Rs.</p>
                                </div>
                                <div className="d-flex flex-row mx-5">
                                    <p className="h6 px-1 py-1">No of Products :</p>
                                    <p className="h5 text-secondary">{order.totalProducts}</p>
                                </div>
                            </div>

                        </li>
                    </div>
                })}

            </ul>
        </div>
    );
};

export default withRouter(withState(Orders));