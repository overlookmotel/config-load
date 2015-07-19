// --------------------
// config-load module
// --------------------

// modules
var pathModule = require('path'),
    requireFolderTree = require('require-folder-tree'),
    _ = require('lodash');

// exports
module.exports = function(path, options) {
    // conform arguments
    if (typeof path != 'string') {
        options = path;
        path = pathModule.join(process.cwd(), 'config');
    }

    // conform options
    options = _.extend({
        env: process.env.NODE_ENV || 'development',
        selectors: {}
    }, options || {});

    var selectors = options.selectors;
    if (selectors && selectors.env === undefined && options.env) selectors.env = options.env;

    // load config
    var config = requireFolderTree(path, {indexFile: 'index.js'});

    // merge in selectors
    if (selectors) {
        _.forIn(selectors, function(value, name) {
            var selector = config[name];
            if (value !== null) selector = (selector || {})[value];

            if (selector !== undefined) _.merge(config, selector);

            delete config[name];
        });
    }

    // return config obj
    return config;
};
