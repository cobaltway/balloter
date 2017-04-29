module.exports = function(ressource, overwrites) {
    return Object.assign(ressource.toObject(), {
        password: undefined,
        email: undefined,
        __v: undefined,
        canAccessKeystone: undefined,
        activeKeys: undefined,
        consumedKeys: undefined,
        votes: undefined
    }, overwrites);
};
