import { useState, useEffect, useCallback } from 'react';
import { withRouter } from 'react-router-dom';
import { withState } from '../../ecom-context';
import AdminService from '../../services/admin';
import {SET_ERROR} from '../../store/actionTypes';
import './AddProduct.css';

const AddProduct = (props) => {
    const [formData, setForm] = useState({
        title: '',
        price: null,
        desc: '',
        category: "Men's Fashion"
    });

    const [isUpdate, setIsUpdate] = useState(false);

    const udpateForm = useCallback(() => {
        if (props.location.state !== null) {
            const fetchedForm = { ...formData }
            const product = props.location.state.product;
            fetchedForm['title'] = product.title;
            fetchedForm['desc'] = product.description;
            fetchedForm['price'] = product.price;
            fetchedForm['category'] = product.category;
            setForm(fetchedForm);
            setIsUpdate(true);
        }
        // eslint-disable-next-line 
    }, [])

    useEffect(() => {
        udpateForm();
    }, [udpateForm])

    const formHandler = (event) => {
        const fetchedForm = { ...formData };
        fetchedForm[event.target.name] = event.target.value;
        setForm(fetchedForm);
    };

    const formSubmitHandler = (event) => {
        event.preventDefault();
        const data = {
            title: formData.title,
            description: formData.desc,
            category: formData.category,
            price: formData.price
        };
        if (isUpdate) {
            const product = props.location.state.product;
            AdminService.updateProduct(product.id, data)
                .then(res => {
                    props.history.push('/');
                }).catch(err => {
                    props.dispatch({ type: SET_ERROR, error: err.message })
                })
        } else {
            AdminService.addProduct(data, props.state.user.id).then(res => {
                props.history.push('/');
            }).catch(err => {
                props.dispatch({ type: SET_ERROR, error: err.message })
            })
        }
    };

    return (
        <div className="add-product w-25 my-5 d-inline-block ">
            <form onSubmit={formSubmitHandler}>
                <div className="form-group my-auto">
                    <input
                        className="form-control my-1"
                        value={formData.title}
                        type="text"
                        name="title"
                        placeholder="title"
                        onChange={formHandler} />
                    <textarea
                        className="form-control my-1"
                        value={formData.desc}
                        name="desc"
                        placeholder="description"
                        id="description"
                        rows="3"
                        onChange={formHandler} />
                    <input
                        className="form-control my-1"
                        value={formData.price}
                        type="number"
                        name="price"
                        placeholder="price" step="0.01"
                        onChange={formHandler} />

                    <select onChange={formHandler} className="form-control my-1" name="category" value={formData.category}>
                        <option value="Men's Fashion" selected>Men's Fashion</option>
                        <option value="Women's Fashion">Women's Fashion</option>
                        <option value="Beauty">Beauty</option>
                        <option value="Skin care">Skin care</option>
                        <option value="Electronics">Electronics</option>
                        <option value="Jewelery">Jewelery</option>
                        <option value="Sports and Fitness">Sports &amp; Fitness</option>
                        <option value="Others">Others</option>
                    </select>
                    <button className="btn btn-primary btn-block" type="submit">{isUpdate ? 'UPDATE' : 'ADD'}</button>
                </div>
            </form>
        </div>
    );
};
export default withRouter(withState(AddProduct));