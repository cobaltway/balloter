const fs = require('fs'),
    path = require('path');

const loadResource = function({app, handler, authNeeded, method, httpPath}) {
    app[method]('/api/' + httpPath, (req, res, next) => {
        if (!req.user && authNeeded) {
            res.status(403).send();
            return;
        }
        next();
    }, (req, res) => {
        handler(Object.assign({}, req.params, req.query, req.body), req, res)
        .then((data, successCode = 200) => {
            res.status(successCode).send(data);
        }).catch((err, errCode = 400) => {
            res.status(errCode).send(err.message);
        });
    });
};

module.exports = function(app) {
    fs.readdirSync(path.join(__dirname, '../resources/')).forEach((name) => {
        loadResource({
            app,
            handler: require('../resources/' + name),
            authNeeded: name.indexOf('&') === 0,
            method: name.split('_')[0].replace('&', '').toLowerCase(),
            httpPath: name.split('_')[1].replace(/-/g, '/')
                .replace(/\$/g, ':')
                .replace(/!/g, '?')
                .replace(/\.js/, '')
        });
    });
};
