import React, { PureComponent, PropTypes } from 'react';
import { Provider, connect }               from 'react-redux';
import { identity }                        from 'ramda';
import { createStore, applyMiddleware }    from 'redux';
import thunk                               from 'redux-thunk';
import { Route }                           from 'react-router-dom';
import { find }                            from 'ramda';
import reducer                             from '../../../src/js/reducer';
import { init }                            from '../../../src/js/actions';
import Gallery                             from '../../../src/js/containers/gallery';

/**
 * @class Layout
 * @extends {PureComponent}
 */
const Layout = connect(identity)(class Layout extends PureComponent {

    /**
     * @constant propTypes
     * @type {Object}
     */
    static propTypes = {
        media: PropTypes.array.isRequired
    };

    /**
     * @method load
     * @param {Object} match
     * @return {Object}
     */
    load({ match }) {

        const { name } = match.params;
        const model    = find(model => model.slug === name)(this.props.media);
        const props    = { model, media: this.props.media };

        return <Gallery {...props} />;

    }

    /**
     * @method render
     * @return {XML}
     */
    render() {

        return (
            <section className="layout">

                <header><h1>Laura Muner Architecture</h1></header>

                <main>

                    <Route path="/:name.html" render={this.load.bind(this)} />

                </main>

                <footer><p>Web site graphics by Micro Muner / Web site structure by <a href="">Pture</a>.</p></footer>

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
