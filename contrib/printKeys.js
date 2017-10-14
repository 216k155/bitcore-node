'use strict';

var levelup = require('levelup');
var leveldown = require('leveldown');
var Encoding = require('../lib/services/address/encoding');
var dbPath = '/Users/chrisk/.bwdb/lux-node.db';
var lux = require('lux-lib');
var db = levelup(dbPath, {keyEncoding: 'binary', valueEncoding: 'binary'});

var prefix = new Buffer('0002', 'hex');
var encoding = new Encoding(prefix);
var address = 'LQXz7JETLKRkm9REqugaNAAaZBhhWBXt5r';
var addressLength = new Buffer(1);
addressLength.writeUInt8(address.length);

//var startBuffer = prefix;
//var endBuffer = Buffer.concat([prefix, new Buffer('ff', 'hex')]);

//var startBuffer = Buffer.concat([prefix, addressLength, new Buffer(address, 'utf8'), new Buffer('00', 'hex')]);
//var endBuffer = Buffer.concat([prefix, addressLength, new Buffer(address, 'utf8'), new Buffer('01', 'hex')]);
var start = Buffer.concat([prefix, new Buffer('03c81572b72bf949007f4aa174ca961bc238d36f6d3ff5028e083eedcf090c409b', 'hex')]);
var end = Buffer.concat([prefix, new Buffer('03c81572b72bf949007f4aa174ca961bc238d36f6d3ff5028e083eedcf090c409b', 'hex'), new Buffer('01', 'hex')]);
var stream = db.createReadStream({
  gte: start,
  lt: end
});
stream.on('data', function(data) {
  var txkey = data.key.slice(2).toString('hex');
  var height = data.value.readUInt32BE();
  var timestamp = data.value.readDoubleBE(4);
  var inputValues = [];
  var inputValuesLength = data.value.readUInt16BE(12);
  for(var i = 0; i < inputValuesLength / 8; i++) {
    inputValues.push(buffer.readDoubleBE(i * 8 + 14));
  }
  var transaction = new lux.Transaction(data.value.slice(inputValues.length * 8 + 14));
  transaction.__height = height;
  transaction.__inputValues = inputValues;
  transaction.__timestamp = timestamp;
  //console.log(txkey, transaction.toObject());
 console.log(data.value);
  console.log(transaction.__height, transaction.__inputValues, transaction.__timestamp);
  //console.log(data.key.toString('hex'), data.value.toString('hex'));
});

stream.on('end', function() {
  console.log('end');
});
