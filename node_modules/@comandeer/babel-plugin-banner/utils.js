'use strict';

const oneLineRegex = /^\/\/(.*?)\n?$/;
const multiLineRegex = /^\/\*([\s\S]*?)\*\/$/;

exports.isComment = function( input ) {
	if ( oneLineRegex.test( input ) || multiLineRegex.test( input ) ) {
		return true;
	}

	return false;
};

exports.getCommentContent = function( input ) {
	if ( oneLineRegex.test( input ) ) {
		return input.replace( /^\/\//, '' );
	}

	return input.replace( /^\/\*/, '' ).replace( /\*\/$/, '' );
}
