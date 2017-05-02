import React                            from 'react';
import { render }                       from 'react-dom';
import ready                            from 'document-ready-promise';
import Layout                           from './containers/layout';

ready().then(() => {

    const mountNode = document.querySelector('section.app');
    mountNode && render(Layout, mountNode);

});
