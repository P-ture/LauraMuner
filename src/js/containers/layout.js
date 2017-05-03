import React, { PureComponent, PropTypes } from 'react';
import { Provider, connect }               from 'react-redux';
import { identity }                        from 'ramda';
import { createStore, applyMiddleware }    from 'redux';
import thunk                               from 'redux-thunk';
import reducer                             from '../../../src/js/reducer';
import { INIT }                            from '../../../src/js/types';

/**
 * @class Layout
 * @extends {PureComponent}
 */
const Layout = connect(identity)(class Layout extends PureComponent {

    /**
     * @constant directories
     * @type {Object}
     */
    // static propTypes = {
    //     directories: PropTypes.array.isRequired
    // };

    /**
     * @method render
     * @return {XML}
     */
    render() {

        return (
            <h1>Laura Muner {this.props.directories.length}</h1>
        );

    }

});

/**
 * @param {Object} data
 * @return {Object}
 */
export default data => {
    const store = createStore(reducer, applyMiddleware(thunk));
    store.dispatch({ type: INIT, data });
    return <Provider store={store}><Layout /></Provider>;
};
