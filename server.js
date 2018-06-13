//import 'zone.js/dist/zone-node';
require('zone.js/dist/zone-node')
//import 'reflect-metadata';
require('reflect-metadata')
//import { renderModuleFactory } from '@angular/platform-server';
const {renderModuleFactory} = require('@angular/platform-server')
const express = require('express');
//import { readFileSync } from 'fs';
const {readFileSync} =require('fs')
//import { enableProdMode } from '@angular/core';
const {enableProdMode} = require('@angular/core')
const { AppServerModuleNgFactory } = require('./dist/user-web-v2-server/main');
enableProdMode();

const app = express();


const localStorage = require('localStorage')



localStorage.setItem('myFirstKey', 'myFirstValue');
console.log(localStorage.getItem('myFirstKey'));

const indexHtml = readFileSync(__dirname + '/dist/browser/index.html', 'utf-8').toString();


app.get('*.*', express.static(__dirname + '/dist/browser', {
    maxAge: '1y'
}));


app.route('*').get((req, res) => {

    renderModuleFactory(AppServerModuleNgFactory, {
        document: indexHtml,
        url: req.url
    })
        .then(html => {
            res.status(200).send(html);
        })
        .catch(err => {
            console.log(err);
            res.sendStatus(500);
        });

});

app.listen(process.env.PORT || 9000, () => {
    console.log(`Angular Universal Node Express server listening on http://localhost:9000`);
});