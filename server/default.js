import http                   from 'http';
import { Z_BEST_COMPRESSION } from 'zlib';
import { readFileSync }       from 'fs';
import express                from 'express';
import compression            from 'compression';
import React                  from 'react';
import { renderToString }     from 'react-dom/server';
import format                 from 'string-template';
import { directories }        from '../src/js/reducer';
import Layout                 from '../src/js/containers/layout';

const app    = express();
const server = http.createServer(app);
const port   = process.env.PORT || 5000;
const index  = `${__dirname}/../public`;

/**
 * @method indexPage
 * @param {Object} req
 * @param {Object} res
 * @return {Object}
 */
const indexPage = (req, res) => {
    const page = readFileSync(`${index}/index.html`, 'utf-8');
    const html = renderToString(Layout);
    const data = JSON.stringify(directories());
    res.send(format(page, { html, data }));
};

app.use(compression({ level: Z_BEST_COMPRESSION }));
app.get('/', indexPage);
app.get(/\.html$/i, indexPage);
app.use(express.static(index));

server.listen(port);
