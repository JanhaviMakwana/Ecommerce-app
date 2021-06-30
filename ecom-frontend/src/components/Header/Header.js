import React, { useState } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { withState } from '../../ecom-context';
import * as actionTypes from '../../store/actionTypes';

const Header = (props) => {

    const [keyword, setKeyword] = useState('');


    const keywordChangeHandler = (event) => {
        setKeyword(event.target.value);
    };

    const searchHandler = (event) => {
        event.preventDefault();
        props.dispatch({ type: actionTypes.SEARCH_START, searchKeyword: keyword });
    };

    const authHandler = () => {
        if (props.state.user) {
            props.dispatch({ type: actionTypes.LOGOUT });
            localStorage.removeItem('user');
            localStorage.removeItem('token');
        } else {
            props.history.push('/auth');
        }
    }

    return (
        <nav className="navbar navbar-expand-sm bg-dark navbar-dark d-flex flex-row">
            <div className="collapse navbar-collapse">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item active ml-3 h6">
                        <NavLink to="/" className="nav-link">
                            <p className="text-light font-weight-bold">Home</p>
                        </NavLink>
                    </li>
                    {props.state.user !== null && props.state.user.role === 'admin'
                        ? <li className="nav-item ml-3 h6">
                            <NavLink to="/add-product" className="nav-link">
                                <p className="text-light font-weight-bold">Add Product</p>
                            </NavLink>
                        </li>
                        : null
                    }
                    {props.state.user !== null && props.state.user.role === 'user'
                        ? <li className="nav-item ml-3 h6">
                            <NavLink to="/orders" className="nav-link">
                                <p className="text-light font-weight-bold">Orders</p>
                            </NavLink>
                        </li>
                        : null
                    }
                    <li>
                        <form className="form-inline mx-3" onSubmit={searchHandler}>
                            <input
                                className="form-control search-input"
                                aria-label="Search"
                                placeholder="Search"
                                value={keyword}
                                onChange={keywordChangeHandler}
                            />
                        </form>
                    </li>
                    <li className="nav-item ml-3">
                        <button className="nav-link btn auth-btn" onClick={authHandler}>
                            <p className="text-light font-weight-bold pb-1">{props.state.user !== null ? "Logout" : "Login"}</p>
                        </button>
                    </li>

                    {props.state.user !== null && props.state.user.role === 'user'
                        ? <li className="nav-item ml-3 h6">
                            <NavLink to="/cart" className="nav-link">
                                <p className="text-light font-weight-bold">Cart</p>
                            </NavLink>
                        </li>
                        : null
                    }

                </ul>
            </div>
        </nav>
    );
};

export default withRouter(withState(Header));