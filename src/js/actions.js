import { INIT } from './types';

/**
 * @method init
 * @param {Object} data
 * @return {Object}
 */
export const init = data => {
    return { type: INIT, data };
};
