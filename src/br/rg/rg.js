'use strict';

var StringMask = require('string-mask');
var BrV = require('br-validations');
var maskFactory = require('mask-factory');

var rgPatterns = [new StringMask('999.999.990-90'), new StringMask('999.999.990-X')];

module.exports = maskFactory({
	clearValue: function(rawValue) {
		if(/X$/g.test(rawValue))
			return rawValue.substring(0, rawValue.length-2).replace(/[ˆ\d]/g, '') + "X"; 
		return rawValue.replace(/[^\d]/g, '');
	},
	format: function(cleanValue) {
		if(/X$/g.test(cleanValue)) {
			return (rgPatterns[1].apply(cleanValue) || '').substring(0, cleanValue.length-2).trim().replace(/[^0-9]$/, '') + "X";
		}
		return (rgPattern[0].apply(cleanValue) || '').trim().replace(/[^0-9]$/, '');
	},
	validations: {
		rg: function(value) {
			return value.length >= 1;
		}
	}
});