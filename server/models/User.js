const keystone = require('keystone'),
    Types = keystone.Field.Types;

const User = new keystone.List('User');

User.add({
    name: {
        type: Types.Text,
        required: true,
        initial: true
    },
    email: {
        type: Types.Email,
        required: true,
        initial: true
    },
    password: {
        type: Types.Password,
        required: true,
        initial: true
    },
    canAccessKeystone: {
        type: Boolean
    }
});

User.defaultColumns = 'name, email, canAccessKeystone';
User.register();
