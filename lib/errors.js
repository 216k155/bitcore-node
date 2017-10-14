'use strict';

var createError = require('errno').create;

var luxNodeError = createError('luxNodeError');

var RPCError = createError('RPCError', luxNodeError);

module.exports = {
  Error: luxNodeError,
  RPCError: RPCError
};
