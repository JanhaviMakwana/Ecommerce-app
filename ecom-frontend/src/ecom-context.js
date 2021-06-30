import React, { createContext, useReducer } from 'react';
import reducer, { initialState } from './store/reducer/auth';
export const EcomContext = createContext(initialState);

const Store = (props) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <EcomContext.Provider value={{ state, dispatch }}>
            {props.children}
        </EcomContext.Provider>
    );
};

const withState = (Child) => (props) => (
    <EcomContext.Consumer>
        {(context) => <Child {...props} {...context} />}
    </EcomContext.Consumer>
);

export { Store, withState };

