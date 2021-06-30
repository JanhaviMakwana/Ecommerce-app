import { withState } from "../ecom-context";
import * as actionTypes from '../store/actionTypes';
import './Error.css';
const Error = (props) => {

    const backhandler = () => {
        props.dispatch({ type: actionTypes.REMOVE_ERROR });
    }

    return (
        <div className="error" onClick={backhandler}>
            <p>{props.state.error}</p>
        </div>
    );
};

export default withState(Error);