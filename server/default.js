import http                          from 'http';
import { Z_BEST_COMPRESSION }        from 'zlib';
import { readFileSync, readdirSync } from 'fs';
import express                       from 'express';
import compression                   from 'compression';
import React                         from 'react';
import { renderToString }            from 'react-dom/server';
import format                        from 'string-template';
import createStore                   from '../src/js/containers/layout';

const app    = express();
const server = http.createServer(app);
const port   = process.env.PORT || 5000;
const index  = `${__dirname}/../public`;
const dirs   = readdirSync(`${__dirname}/../src/images/gallery`);

/**
 * @method indexPage
 * @param {Object} req
 * @param {Object} res
 * @return {Object}
 */
const indexPage = (req, res) => {
    const page = readFileSync(`${index}/index.html`, 'utf-8');
    const html = renderToString(createStore({ dirs }));
    res.send(format(page, { html }));
};

app.use(compression({ level: Z_BEST_COMPRESSION }));
app.get('/', indexPage);
app.get(/\.html$/i, indexPage);
app.get('/directories.json', (req, res) => res.send({ dirs }));
app.use(express.static(index));

server.listen(port);
