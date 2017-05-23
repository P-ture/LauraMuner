import React, { PureComponent, PropTypes } from 'react';
import { splitEvery, any }                 from 'ramda';
import { NavLink, withRouter }             from 'react-router-dom';
import hash                                from 'object-hash';
import MediaQuery                          from 'react-responsive';
import Carousel                            from '../components/carousel';
import Video                               from '../components/video';

/**
 * @method Item
 * @param {Object} props
 * @constructor
 */
const Item = props => {

    return (
        <div className="group">

            {props.model.map((model, index) => {
                return (
                    <NavLink to={`/${model.slug}`} key={hash(model)}>
                        <img src={`/api/thumbnail.php?slug=${model.slug}`} alt={`Image ${index}`} />
                        <label>{model.label}</label>
                    </NavLink>
                );

            })}

        </div>
    );

};

/**
 * @class Gallery
 * @extends {PureComponent}
 */
export default withRouter(class Gallery extends PureComponent {

    /**
     * @constant propTypes
     * @type {Object}
     */
    static propTypes = {
        media: PropTypes.array.isRequired,
        model: PropTypes.shape({
            title:    PropTypes.string.isRequired,
            synopsis: PropTypes.string.isRequired
        }).isRequired
    };

    /**
     * @constant defaultProps
     * @type {Object}
     */
    static defaultProps = {
        model: {
            title: '',
            synopsis: ''
        }
    };

    /**
     * @method isActive
     * @param {Array} model
     * @param {Number} index
     * @return {Boolean}
     */
    isActive({ model, index }) {

        const { name } = this.props.match.params;
        const slugs    = model.map(model => model.slug);

        return name ? any(slug => name === slug)(slugs) : index === 0;

    }

    /**
     * @method render
     * @return {XML}
     */
    render() {

        const { model, media } = this.props;

        return (
            <section className="gallery">



                <div className="left">
ß
                    <Carousel
                        id="carousel-left"
                        items={model.media}
                        component={({ model, index }) => {
                            const extension = model.split(/\./i).pop();
                            const isVideo = extension === 'mp4';
                            return isVideo ? <Video src={model} /> : <img src={model} alt={`Image ${index}`} />
                        }}
                        isActive={({ index }) => index === 0}
                        />

                    <ul className="description">
                        <li>{model.title}</li>
                        <li>{model.synopsis}</li>
                    </ul>

                </div>

                <div className="right">

                    <MediaQuery query="(min-width: 481px)">

                        <Carousel
                            id="carousel-right"
                            items={splitEvery(3, media)}
                            component={({ model, index }) => <Item model={model} index={index} />}
                            isActive={this.isActive.bind(this)}
                            />

                    </MediaQuery>

                    <MediaQuery query="(max-width: 480px)">

                        <Carousel
                            id="carousel-right"
                            items={splitEvery(2, media)}
                            component={({ model, index }) => <Item model={model} index={index} />}
                            isActive={this.isActive.bind(this)}
                            />

                    </MediaQuery>

                </div>

            </section>
        );

    }

});
