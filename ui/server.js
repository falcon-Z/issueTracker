require('dotenv').config();

const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

app.use(express.static('public'));

const apiProxyTarget = process.env.API_PROXY_TARGET;
if (apiProxyTarget) {
    app.use('/graphql', createProxyMiddleware({ target: apiProxyTarget, changeOrigin: true }));
}

const API_ENDPOINT = process.env.API_ENDPOINT ||
    'http://localhost:3000/graphql';
const env = { API_ENDPOINT };

app.get('/env.js', function(req, res) {
    res.send(`window.ENV = ${JSON.stringify(env)}`)
})

const host = process.env.UI_HOST || 'localhost';
const port = process.env.UI_PORT || 8000;

app.listen(port, function() {
    console.log(`UI started on http://${host}:${port}`);
});