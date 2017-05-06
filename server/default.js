import http                   from 'http';
import { Z_BEST_COMPRESSION } from 'zlib';
import fs                     from 'fs';
import express                from 'express';
import yaml                   from 'js-yaml';
import compression            from 'compression';
import React                  from 'react';
import { renderToString }     from 'react-dom/server';
import format                 from 'string-template';
import createStore            from '../src/js/containers/layout';

const app       = express();
const server    = http.createServer(app);
const port      = process.env.PORT || 5000;
const metaFile  = 'meta.yml';
const mediaPath = 'images/media';
const index     = `${__dirname}/../public`;
const media     = () => fs.readdirSync(`${__dirname}/../src/${mediaPath}`).map(load);

/**
 * @method load
 * @param {String} dir
 * @return {Object}
 */
const load = dir => {

    const path     = `${__dirname}/../src/${mediaPath}/${dir}`;
    const files    = fs.readdirSync(path);
    const yamlPath = `${path}/${metaFile}`;
    const meta     =  fs.existsSync(yamlPath) ? fs.readFileSync(yamlPath, 'utf8') : '';

    return {
        ...yaml.safeLoad(meta),
        dir: `${mediaPath}/${dir}`,
        media: files.filter(file => file !== metaFile)
    };

};

/**
 * @method indexPage
 * @param {Object} req
 * @param {Object} res
 * @return {Object}
 */
const indexPage = (req, res) => {
    const page = fs.readFileSync(`${index}/index.html`, 'utf-8');
    const html = renderToString(createStore({ media: media() }));
    res.send(format(page, { html }));
};

app.use(compression({ level: Z_BEST_COMPRESSION }));
app.get('/', indexPage);
app.get(/\.html$/i, indexPage);
app.get('/media.json', (_, res) => res.send(media()));
app.use(express.static(index));

server.listen(port);
