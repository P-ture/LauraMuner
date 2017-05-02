import { readdirSync } from 'fs';

/**
 * @constant directories
 * @type {Array}
 */
export const directories = () => {
    const isServer = typeof readdirSync === 'function';
    return isServer ? readdirSync(`${__dirname}/../images/gallery`) : JSON.parse(document.currentScript.getAttribute('data-store'));
};

/**
 * @constant INITIAL_STATE
 * @type {Object}
 */
const INITIAL_STATE = {
    directories: directories()
};

export default (state = INITIAL_STATE) => {
    return state;
};
