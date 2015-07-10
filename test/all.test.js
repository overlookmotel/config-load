// --------------------
// config-load module
// Tests
// --------------------

// modules
var chai = require('chai'),
	expect = chai.expect,
	configLoad = require('../lib/');

// init
chai.config.includeStack = true;

// tests

/* jshint expr: true */
/* global describe, it */

describe('Tests', function() {
	it('Test', function() {
		expect(configLoad).to.be.ok;
	});
});
