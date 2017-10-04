import React          from 'react';
import { render }     from 'react-dom';
import ready          from 'document-ready-promise';
import { HashRouter } from 'react-router-dom';
import createStore    from './containers/layout';
import 'whatwg-fetch';

ready().then(async () => {

    const media     = await fetch('/api/media.php').then(response => response.json());
    const mountNode = document.querySelector('section.app');
    mountNode && render(createStore({ media }, app => <HashRouter>{app}</HashRouter>), mountNode);

});
