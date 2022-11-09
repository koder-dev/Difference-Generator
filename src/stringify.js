export default (data1Changes, notChanged, data2Changes) => {
    const file1Formated = [...Object.keys(data1Changes), ...Object.keys(notChanged)].sort().map((key) => {
        if (Object.keys(notChanged).includes(key)) return `  ${key}: ${notChanged[key]}`;
        return `- ${key}: ${data1Changes[key]}`;
    });
    const file2Formated = Object.keys(data2Changes).sort().map((key) => `+ ${key}: ${data2Changes[key]}`);
    const result = [...file1Formated, ...file2Formated];
    const resultStr = `{\n  ${result.join('\n  ')}\n}`;
    console.log(resultStr)
    return resultStr;
}