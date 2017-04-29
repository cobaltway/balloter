const keystone = require('keystone'),
    Types = keystone.Field.Types;

const Vote = new keystone.List('Vote');

Vote.add({
    key: {
        type: String,
        required: true,
        initial: true
    },
    alternative: {
        type: Types.Relationship,
        ref: 'Alternative',
        required: true,
        initial: true,
        default: []
    },
    note: {
        type: Number,
        required: true,
        initial: true
    }
});

Vote.defaultColumns = 'name';
Vote.register();
