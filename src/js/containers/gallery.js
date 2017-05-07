import React, { PureComponent, PropTypes } from 'react';
import hash                                from 'object-hash';

/**
 * @class Gallery
 * @extends {PureComponent}
 */
export default class Gallery extends PureComponent {

    /**
     * @constant propTypes
     * @type {Object}
     */
    static propTypes = {
        media: PropTypes.array.isRequired,
        model: PropTypes.shape({
            title: PropTypes.string.isRequired,
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
     * @method render
     * @return {XML}
     */
    render() {

        const { model } = this.props;

        return (
            <section className="gallery">

                <div className="left">

                    <div className="carousel">

                        {model.media.map((path, index) => {

                            const length  = model.media.length - 1;
                            const isFirst = index === 0;
                            const isLast  = index === length;

                            return [
                                <input type="radio" defaultChecked={index === 0} name="position" id={`position-${index}`} />,
                                <div className="item">
                                    <label htmlFor={`position-${isFirst ? length : index - 1}`} className="previous" />
                                    <img key={hash(path)} src={path} alt={`Image ${index}`} />
                                    <label htmlFor={`position-${isLast ? 0 : index + 1}`} className="next" />
                                </div>
                            ];

                        })}

                    </div>

                    <ul className="description">
                        <li>{model.title}</li>
                        <li>{model.synopsis}</li>
                    </ul>

                </div>

                <div className="right">

                    <ul className="list">
                        <li>Item 1</li>
                        <li>Item 2</li>
                        <li>Item 3</li>
                    </ul>

                </div>

            </section>
        );

    }

}
