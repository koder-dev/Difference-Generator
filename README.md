### Hexlet tests:
[![Actions Status](https://github.com/koder-dev/frontend-project-lvl2/workflows/hexlet-check/badge.svg)](https://github.com/koder-dev/frontend-project-lvl2/actions)
![Eslint and Tests Status](https://github.com/koder-dev/frontend-project-lvl2/actions/workflows/lint.yml/badge.svg)
[![Maintainability](https://api.codeclimate.com/v1/badges/95c326a97011e91ec0f2/maintainability)](https://codeclimate.com/github/unInsomnia/frontend-project-lvl2/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/95c326a97011e91ec0f2/test_coverage)](https://codeclimate.com/github/unInsomnia/frontend-project-lvl2/test_coverage)

## Quick Start:
```
git clone git@github.com:koder-dev/frontend-project-2
make install
npm link
```

## Help
```js
$ gendiff -h
Usage: gendiff [options] <filepath1> <filepath2>

Compares two configuration files and shows a difference.

Options:
  -V, --version        output the version number
  -f, --format <type>  output format
  -h, --help           display help for command
```
### Examples
```Yaml
$ gendiff -f stylish filepath1 filepath2
{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}
```

```js
$ gendiff -f plain filepath1 filepath2
Property 'follow' was removed
Property 'proxy' was removed
Property 'timeout' was updated. From 50 to 20
Property 'verbose' was added with value: true
```

```js
$ gendiff -f json filepath1 filepath2
[{"key":"follow","status":"deleted","value":false},{"key":"host","status":"notChanged","value":"hexlet.io"},{"key":"proxy","status":"deleted","value":"123.234.53.22"},{"key":"timeout","status":"updated","value1":50,"value2":20},{"key":"verbose","status":"added","value":true}]
```