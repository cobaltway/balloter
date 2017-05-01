const resources = require('./resources'),
    client = require('./client.js');

module.exports = function(app) {
    resources(app);
    client(app);
    app.all('*', (req, res) => {
        res.status(404).send('');
    });
};
