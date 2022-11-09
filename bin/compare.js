export default (data1, data2) => {
        const data1Changes = {};
        const data2Changes = {};
        const notChanged = {};
        Object.keys(data1).forEach((property) => (data1[property] === data2[property])
        ? notChanged[property] = data1[property] : data1Changes[property] = data1[property]);
        Object.keys(data2).forEach((property) => (data1[property] !== data2[property])
        ? data2Changes[property] = data2[property] : null);
        return [data1Changes, notChanged, data2Changes];
};
