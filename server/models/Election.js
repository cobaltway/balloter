const keystone = require('keystone'),
    Types = keystone.Field.Types;

const Election = new keystone.List('Election', {
    autokey: {
        path: 'slug',
        from: 'name',
        unique: true
    }
});

Election.add({
    name: {
        type: Types.Text,
        required: true,
        initial: true
    },
    description: {
        type: Types.Markdown,
        default: ''
    },
    broadcasted: {
        type: Boolean,
        default: false
    },
    ongoing: {
        type: Boolean,
        default: true
    },
    choices: {
        type: Types.Relationship,
        ref: 'Alternative',
        many: true,
        default: []
    },
    votes: {
        type: Types.Relationship,
        ref: 'Vote',
        many: true,
        default: []
    },
    activeKeys: {
        type: Types.TextArray,
        default: []
    },
    consumedKeys: {
        type: Types.TextArray,
        default: []
    }
});

Election.defaultColumns = 'name';
Election.register();
