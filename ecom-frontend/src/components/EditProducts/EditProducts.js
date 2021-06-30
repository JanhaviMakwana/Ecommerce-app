import { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import AdminService from '../../services/admin';
import ProductService from '../../services/product';
import { withState } from '../../ecom-context';
import { SET_ERROR } from '../../store/actionTypes';
import './EditProducts.css';

const EditProducts = (props) => {

    const [products, setProducts] = useState([]);
    const keyword = props.state.searchKeyword;
    useEffect(() => {
        const fetch = () => {
            ProductService.getProducts(`?keyword=${keyword}`)
                .then(fetchedProducts => {
                    setProducts(fetchedProducts);
                }).catch(err => {
                    props.dispatch({ type: SET_ERROR, error: err.message });
                });
        }
        fetch();
        // eslint-disable-next-line 
    }, [])


    const deleteProductHandler = (id) => {
        AdminService.deleteProduct(id).then(res => {
            setProducts(res)
        }).catch(err => {
            props.dispatch({ type: SET_ERROR, error: err.message });
        })
    };

    const editProductHandler = (product) => {
        props.history.push({
            pathname: `/product/${product.id}`,
            state: {
                product: product
            }
        })
    };

    return (
        <div className="container-lg">
            <div className="d-flex flex-row py-1">
                {products.length > 0 && products.map((product) => {
                    return (
                        <div className="product mx-1" key={product.id}>
                            <div className="my-3 mx-1">
                                <div id="">
                                    <h5>{product.title}</h5>
                                </div>
                                <div className="description">
                                    <div className="product-desc">{product.description}</div>
                                </div>
                                <div className="d-flex flex-row my-1 mx-5">
                                    <label className="h6 pt-1 pr-3">Price: </label>
                                    <p className="h5">{" " + product.price} Rs.</p>
                                </div>
                                <div className="d-flex flex-row  container-fluid px-1">
                                    <button className="btn btn-danger mx-3" onClick={() => editProductHandler(product)}>UPDATE</button>
                                    <button className="btn btn-danger mx-3 " onClick={() => deleteProductHandler(product.id)}>DELETE</button>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );

};

export default withRouter(withState(EditProducts));