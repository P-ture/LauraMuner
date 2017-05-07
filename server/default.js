import http                   from 'http';
import { Z_BEST_COMPRESSION } from 'zlib';
import sharp                  from 'sharp';
import fs                     from 'fs';
import { basename }           from 'path';
import express                from 'express';
import yaml                   from 'js-yaml';
import compression            from 'compression';
import React                  from 'react';
import { renderToString }     from 'react-dom/server';
import format                 from 'string-template';
import { StaticRouter }       from 'react-router-dom';
import createStore            from '../src/js/containers/layout';

const app       = express();
const server    = http.createServer(app);
const port      = process.env.PORT || 5000;
const metaFile  = 'meta.yml';
const mediaPath = 'images/media';
const index     = `${__dirname}/../public`;
const media     = () => fs.readdirSync(`${__dirname}/../src/${mediaPath}`).map(load);
const path      = dir => `${__dirname}/../src/${mediaPath}/${dir}`;

/**
 * @method load
 * @param {String} dir
 * @return {Object}
 */
const load = dir => {

    const files    = fs.readdirSync(path(dir));
    const yamlPath = `${path(dir)}/${metaFile}`;
    const meta     =  fs.existsSync(yamlPath) ? fs.readFileSync(yamlPath, 'utf8') : '';

    return {
        ...yaml.safeLoad(meta),
        slug: dir,
        media: files.filter(file => file !== metaFile).map(file => `${mediaPath}/${dir}/${file}`)
    };

};

/**
 * @method indexPage
 * @param {Object} req
 * @param {Object} res
 * @return {void}
 */
const indexPage = (req, res) => {

    const page = fs.readFileSync(`${index}/index.html`, 'utf-8');
    const html = renderToString(
        createStore({ media: media() }, app => <StaticRouter context={{}} location={req.url}>{app}</StaticRouter>)
    );

    res.send(format(page, { html }));

};

/**
 * @method thumbPage
 * @param {Object} req
 * @param {Object} res
 * @return {void}
 */
const thumbPage = (req, res) => {

    const { dir } = req.params;
    const cover   = `${path(dir)}/${basename(load(dir).media[0])}`;

    sharp(cover).resize(200).toFormat(sharp.format.png).toBuffer((err, data) => {
        res.set('content-type', 'image/png');
        res.send(data);
    });

};

app.use(compression({ level: Z_BEST_COMPRESSION }));
app.get('/', indexPage);
app.get(/\.html$/i, indexPage);
app.get('/media/:dir/thumbnail.png', thumbPage);
app.get('/media.json', (_, res) => res.send(media()));
app.use(express.static(index));

server.listen(port);
