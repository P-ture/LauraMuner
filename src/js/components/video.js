import React, { Component } from 'react';

/**
 * @class Carousel
 * @extends {PureComponent}
 */
export default class Video extends Component {

    /**
     * @constructor
     * @return {Video}
     */
    constructor() {
        super();
        this.state = {
            play: false,
            mute: false
        };
    }

    /**
     * @method play
     * @return {void}
     */
    play() {
        const video = document.querySelector('video');
        this.setState({ play: !this.state.play });
        return video.play()
    };

    /**
     * @method pause
     * @return {void}
     */
    pause() {
        const video = document.querySelector('video');
        this.setState({ play: !this.state.play });
        return video.pause()
    };

    /**
     * @method reset
     * @return {void}
     */
    reset() {
        const video = document.querySelector('video');
        video.currentTime = 0;
        video.pause();
        this.setState({ play: !this.state.play });
    }

    render() {
        return (
            <section className="video">
                {this.state.play ? '' : <div className="playBtn" />}
                <video src={this.props.src} onClick={() => this.state.play ? this.pause() : this.play()} onEnded={() => this.reset()} />
            </section>
        )

    }

}
