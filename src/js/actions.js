import { INIT } from './types';

/**
 * @method init
 * @param {Object} payload
 * @return {Object}
 */
export const init = payload => {
    return { type: INIT, payload };
};
