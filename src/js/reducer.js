import { INIT } from './types';

/**
 * @constant INITIAL_STATE
 * @type {Object}
 */
const INITIAL_STATE = {
    media: []
};

export default (state = INITIAL_STATE, action) => {

    switch (action.type) {

        case INIT:
            return { media: action.payload.media };

    }

    return state;

};
