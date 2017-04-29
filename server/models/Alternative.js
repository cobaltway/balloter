const keystone = require('keystone'),
    Types = keystone.Field.Types;

const Alternative = new keystone.List('Alternative');

Alternative.add({
    name: {
        type: Types.Text,
        required: true,
        initial: true
    },
    description: {
        type: Types.Markdown,
        default: ''
    },
    note: {
        type: Number
    },
    rank: {
        type: Number
    }
});

Alternative.defaultColumns = 'name';
Alternative.register();
