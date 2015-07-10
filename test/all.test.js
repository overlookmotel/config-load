// --------------------
// config-load module
// Tests
// --------------------

// modules
var pathModule = require('path'),
	chai = require('chai'),
	expect = chai.expect,
	configLoad = require('../lib/');

// init
chai.config.includeStack = true;

// tests

/* jshint expr: true */
/* global describe, it */

var path = pathModule.join(__dirname, 'example');

describe('configLoad', function() {
	it('loads folder of config files', function() {
		var config = configLoad(path, { env: false });
		expect(config).to.deep.equal({
			a: 1,
			b: 2,
			c: {d: 4, e: 5},
			env: {
				development: {b: 22, c: {d: 44}},
				production: {b: 222, c: {d: 444}}
			},
			switch: {
				one: {b: 2222},
				two: {b: 22222}
			}
		});
	});

	it('switches based on env', function() {
		var config = configLoad(path, { env: 'development' });
		expect(config).to.deep.equal({
			a: 1,
			b: 22,
			c: {d: 44, e: 5},
			switch: {
				one: {b: 2222},
				two: {b: 22222}
			}
		});
	});

	it('switches based on selectors', function() {
		var config = configLoad(path, { env: false, selectors: { switch: 'one' } });
		expect(config).to.deep.equal({
			a: 1,
			b: 2222,
			c: {d: 4, e: 5},
			env: {
				development: {b: 22, c: {d: 44}},
				production: {b: 222, c: {d: 444}}
			}
		});
	});
});
