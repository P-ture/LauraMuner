import React, { PureComponent, PropTypes } from 'react';
import { Provider, connect }               from 'react-redux';
import { identity }                        from 'ramda';
import { createStore, applyMiddleware }    from 'redux';
import thunk                               from 'redux-thunk';
import reducer                             from '../../../src/js/reducer';
import { init }                            from '../../../src/js/actions';

/**
 * @class Layout
 * @extends {PureComponent}
 */
const Layout = connect(identity)(class Layout extends PureComponent {

    /**
     * @constant directories
     * @type {Object}
     */
    static propTypes = {
        directories: PropTypes.array.isRequired
    };

    /**
     * @method render
     * @return {XML}
     */
    render() {

        return (
            <section className="layout">

                <header>
                    <h1>Laura Muner Architecture</h1>
                </header>

                <main>

                    <div className="gallery">
                        <img src="http://www.architecturalrecord.com/ext/resources/Issues/2016/May/1605-Architecture-Creativity-wHY-Louisville-Speed-Art-Museum-01.jpg" alt="" />
                        <ul className="description">
                            <li>Title</li>
                            <li>Synopsis</li>
                        </ul>
                    </div>

                    <ul className="list">
                        <li>Item 1</li>
                        <li>Item 2</li>
                        <li>Item 3</li>
                    </ul>

                </main>

                <footer>
                    <p>Web site graphics by Micro Muner / Web site structure by <a href="">Pture</a>.</p>
                </footer>

            </section>
        );

    }

});

/**
 * @param {Object} data
 * @return {Object}
 */
export default data => {
    const store = createStore(reducer, applyMiddleware(thunk));
    store.dispatch(init(data));
    return <Provider store={store}><Layout /></Provider>;
};
