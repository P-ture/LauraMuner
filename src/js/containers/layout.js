import React, { PureComponent, PropTypes } from 'react';
import { Provider, connect }               from 'react-redux';
import { identity }                        from 'ramda';
import { createStore, applyMiddleware }    from 'redux';
import thunk                               from 'redux-thunk';
import { Route, withRouter }               from 'react-router-dom';
import { find }                            from 'ramda';
import generate                            from 'shortid';
import reducer                             from '../../../src/js/reducer';
import { init }                            from '../../../src/js/actions';
import Gallery                             from '../../../src/js/containers/gallery';
import Contact                             from '../../../src/js/components/contact';

/**
 * @class Layout
 * @extends {PureComponent}
 */
const Layout = withRouter(connect(identity)(class Layout extends PureComponent {

    /**
     * @constant propTypes
     * @type {Object}
     */
    static propTypes = {
        media: PropTypes.array.isRequired
    };

    /**
     * @method find
     * @param {String} slug
     * @return {Object}
     */
    find(slug) {

        const model = find(model => model.slug === slug)(this.props.media);
        const props = { model, media: this.props.media };

        return <Gallery key={generate()} {...props} />;

    }

    /**
     * @method render
     * @return {XML}
     */
    render() {

        const { media } = this.props;
        return (
            <section className="layout">

                <header>
                    <a href="/"><h1>Laura Muner Architecture</h1></a>
                </header>

                <main>
                    <Route path="/:name"  render={({ match }) => this.find(match.params.name)} />
                    <Route path="/" exact render={({ match }) => this.find(media[0].slug)} />
                </main>

                <footer>
                    <p>&copy;Copyright Laura Muner Architect / Website by <a href="www.assoonasseen.co.uk">AsSoonAsSeen</a> / Photographs by Michele Panzeri.</p>
                    <Contact />
                </footer>

            </section>
        );

    }

}));

/**
 * @param {Object} data
 * @param {Object} wrapper
 * @return {Object}
 */
export default (data, wrapper) => {
    const store = createStore(reducer, applyMiddleware(thunk));
    store.dispatch(init(data));
    return <Provider store={store}>{wrapper(<Layout />)}</Provider>;
};
