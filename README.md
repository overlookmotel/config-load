# config-load.js

[![Greenkeeper badge](https://badges.greenkeeper.io/overlookmotel/config-load.svg)](https://greenkeeper.io/)

# Load config from a tree of JS/JSON files

## Current status

[![NPM version](https://img.shields.io/npm/v/config-load.svg)](https://www.npmjs.com/package/config-load)
[![Build Status](https://img.shields.io/travis/overlookmotel/config-load/master.svg)](http://travis-ci.org/overlookmotel/config-load)
[![Dependency Status](https://img.shields.io/david/overlookmotel/config-load.svg)](https://david-dm.org/overlookmotel/config-load)
[![Dev dependency Status](https://img.shields.io/david/dev/overlookmotel/config-load.svg)](https://david-dm.org/overlookmotel/config-load)
[![Coverage Status](https://img.shields.io/coveralls/overlookmotel/config-load/master.svg)](https://coveralls.io/r/overlookmotel/config-load)

## Usage

### Installation

    npm install config-load

### Loading

```js
var configLoad = require('config-load');
```

### configLoad([path] [, options])

Loads all JS/JSON config files under path, recursively gathering them from the tree structure.

Uses [require-folder-tree](https://www.npmjs.com/package/require-folder-tree) - see docs for that for explanation of how files are loaded.

If path is not provided, defaults to `process.cwd() + '/config'`.

### Options

#### env

Environment type - creates a selector (see below).

Defaults to `process.env.NODE_ENV || 'development'`

#### selectors

Object determining what parts of the config object to switch dependent on selectors provided.

Defaults to `{ env: options.env }`

##### Example

If config file parsing produces:

```js
{
    db: {
        server: 'localhost',
        database: 'myDB'
    },
    env: {
        development: {
            db: {
                password: 'dev db password'
            }
        },
        production: {
            db: {
                password: 'production db password'
            }
        }
    },
    otherSetting: 'foo'
}
```

Then calling:

```js
configLoad(path, { selectors: { env: 'development' } } )
```

returns:

```js
{
    db: {
        server: 'localhost',
        database: 'myDB',
        password: 'dev db password'
    },
    otherSetting: 'foo'
}
```

##### `null` value

If a `selector`'s value is `null`, it takes the `name` key only.

If config file parsing produces:

```js
{
    url: 'http://example.com/',
    local: {
        url: 'http://mysite.com/'
    }
}
```

```js
configLoad(path, { selectors: { local: null } } )
```

returns:

```js
{
    url: 'http://mysite.com/'
}
```

## Tests

Use `npm test` to run the tests. Use `npm run cover` to check coverage.

## Changelog

See [changelog.md](https://github.com/overlookmotel/config-load/blob/master/changelog.md)

## Issues

If you discover a bug, please raise an issue on Github. https://github.com/overlookmotel/config-load/issues

## Contribution

Pull requests are very welcome. Please:

* ensure all tests pass before submitting PR
* add an entry to changelog
* add tests for new features
* document new functionality/API additions in README
