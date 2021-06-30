import React from "react";
import ShowProducts from "../ShowProducts/ShowProducts";
import EditProducts from "../EditProducts/EditProducts";
import { withState } from "../../ecom-context";
const Home = (props) => {
    return (
        <div className="container-fluid">
            {props.state.user && props.state.user.role === 'admin' ?
                <EditProducts />
                : <ShowProducts />
            }
        </div>

    );
};

export default withState(Home);