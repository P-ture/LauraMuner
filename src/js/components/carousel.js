import React, { PureComponent, PropTypes } from 'react';
import generate                            from 'shortid';

/**
 * @class Carousel
 * @extends {PureComponent}
 */
export default class Carousel extends PureComponent {

    /**
     * @constant propTypes
     * @type {Object}
     */
    static propTypes = {
        id:        PropTypes.string.isRequired,
        items:     PropTypes.array.isRequired,
        component: PropTypes.func.isRequired,
        isActive:  PropTypes.func.isRequired
    };

    /**
     * @constant defaultProps
     * @type {Object}
     */
    static defaultProps = {
        id: '',
        isActive: () => {}
    };

    /**
     * @method render
     * @return {XML}
     */
    render() {

        const { items, component, isActive } = this.props;
        const id                             = this.props.id || generate();

        return (
            <section className="carousel">

                {items.map((model, index) => {

                    const length  = items.length - 1;
                    const isFirst = index === 0;
                    const isLast  = index === length;

                    return [
                        <input type="radio" defaultChecked={isActive({ index, model })} name={id} id={`${id}-${index}`} />,
                        <div className="item">
                            <label htmlFor={`${id}-${isFirst ? length : index - 1}`} className="previous" />
                            {component({ model, index })}
                            <label htmlFor={`${id}-${isLast ? 0 : index + 1}`} className="next" />
                        </div>
                    ];

                })}

            </section>
        );

    }

}
