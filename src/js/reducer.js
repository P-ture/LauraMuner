import { INIT } from './types';

/**
 * @constant INITIAL_STATE
 * @type {Object}
 */
const INITIAL_STATE = {
    directories: []
};

export default (state = INITIAL_STATE, action) => {

    switch (action.type) {

        case INIT:
            return { directories: action.data.dirs };

    }

    return state;

};
