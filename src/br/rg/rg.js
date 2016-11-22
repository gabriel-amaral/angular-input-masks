'use strict';

var StringMask = require('string-mask');
var BrV = require('br-validations');
var maskFactory = require('mask-factory');

var rgPatterns = [new StringMask('#.##0-0',{reverse: true}), new StringMask('#.##0-A', {reverse: true})];

module.exports = maskFactory({
	clearValue: function(rawValue) {
		if(/X$/i.test(rawValue))
			return rawValue.replace(/[^\dXx]/g, ''); 
		return rawValue.replace(/[^\d]/g, '');
	},
	format: function(cleanValue) {
		if(/X$/i.test(cleanValue)) {
			return (rgPatterns[1].apply(cleanValue) || '').trim().toUpperCase();
		}
		return (rgPatterns[0].apply(cleanValue) || '').trim().replace(/[^0-9]$/, '');
	},
	validations: {
		rg: function(value) {
			return value.length >= 1;
		}
	}
});