const rand = require('randomstring').generate;

module.exports = function(number) {
    const tokens = [];
    for (let i = 0; i < number; i++) {
        tokens.push(rand(16) + i + (new Date()).getTime());
    }
    return tokens;
};
