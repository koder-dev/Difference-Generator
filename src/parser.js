import yaml from 'js-yaml';

const pars = (file, ext) => {
    switch (ext) {
    case '.json':
        return JSON.parse(file);
    case '.yml':
        return yaml.load(file);
    case '.yaml':
        return yaml.load(file);
    default: 
        throw new Error('extension error');
    }
}

export default (file1, file2, ext1, ext2) => {
    const data1 = pars(file1, ext1);
    const data2 = pars(file2, ext2);
    return [data1, data2];
};