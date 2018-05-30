const keystone = require('keystone');
const Types = keystone.Field.Types;

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
  image: {
    type: Types.Url,
    default: ''
  },
  note: { type: Number },
  rank: { type: Number }
});

Alternative.defaultColumns = 'name';
Alternative.register();
