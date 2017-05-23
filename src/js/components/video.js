import React, { Component } from 'react';
/**
 * @class Carousel
 * @extends {PureComponent}
 */


export default class Video extends Component {

    /**
     * @constant state
     * @type {Object}
     */
    constructor() {
        super();
        this.state = {
            play: false,
            mute: false
        };
    }

    play() {
        const video = document.querySelector('video');
        this.setState({play: !this.state.play});
        return video.play()
    };
    pause() {
        const video = document.querySelector('video');
        this.setState({play: !this.state.play});
        return video.pause()
    };

    render() {
        return (
            <section className="video">
                {this.state.play ? '' : <div className="playBtn" />}
                <video src={this.props.src} onClick={this.state.play ? () => this.pause() : () => this.play()} />

            </section>
        )

    }

}
