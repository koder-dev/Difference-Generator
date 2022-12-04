import stylish from './stylish.js';
import plain from './plain.js';

export default (data, format = 'stylish') => {
  switch (format) {
    case 'stylish':
      return stylish(data);
    case 'plain':
      return plain(data);
    case 'json':
      return JSON.stringify(data);
    default:
      throw new Error('Format error');
  }
};
