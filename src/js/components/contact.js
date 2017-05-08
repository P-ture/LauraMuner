import React, { PureComponent } from 'react';
/**
 * @class Carousel
 * @extends {PureComponent}
 */
export default class Contact extends PureComponent {

    /**
     * @constant state
     * @type {Object}
     */
    constructor() {
        super();
        this.state = {
            visible: false
        };
    }

    render() {

        return (
            <section className="contact">
                <a onClick={() => this.setState({visible: true})}></a>
                { this.state.visible ?
                    <section>
                        <section>
                            <div>
                                <h5>Contact</h5>
                                <p onClick={() => this.setState({visible: false})}></p>
                            </div>
                            <ul>
                                <li>0044 (0)77 91 075 281</li>
                                <li><a href="mailto:info@lauramunerarchitect.co.uk">info@lauramunerarchitect.co.uk</a></li>
                            </ul>
                        </section>
                    </section> : ''
                }
            </section>
        )
    }
}
