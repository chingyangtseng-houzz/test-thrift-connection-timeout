//
// Autogenerated by Thrift Compiler (0.10.0)
//
// DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
//
"use strict";

var thrift = require('thrift');
var Thrift = thrift.Thrift;
var Q = thrift.Q;


var ttypes = require('./service_types');
//HELPER FUNCTIONS AND STRUCTURES

var SimpleService_delayedResponse_args = function(args) {
};
SimpleService_delayedResponse_args.prototype = {};
SimpleService_delayedResponse_args.prototype.read = function(input) {
  input.readStructBegin();
  while (true)
  {
    var ret = input.readFieldBegin();
    var fname = ret.fname;
    var ftype = ret.ftype;
    var fid = ret.fid;
    if (ftype == Thrift.Type.STOP) {
      break;
    }
    input.skip(ftype);
    input.readFieldEnd();
  }
  input.readStructEnd();
  return;
};

SimpleService_delayedResponse_args.prototype.write = function(output) {
  output.writeStructBegin('SimpleService_delayedResponse_args');
  output.writeFieldStop();
  output.writeStructEnd();
  return;
};

var SimpleService_delayedResponse_result = function(args) {
  this.success = null;
  if (args) {
    if (args.success !== undefined && args.success !== null) {
      this.success = args.success;
    }
  }
};
SimpleService_delayedResponse_result.prototype = {};
SimpleService_delayedResponse_result.prototype.read = function(input) {
  input.readStructBegin();
  while (true)
  {
    var ret = input.readFieldBegin();
    var fname = ret.fname;
    var ftype = ret.ftype;
    var fid = ret.fid;
    if (ftype == Thrift.Type.STOP) {
      break;
    }
    switch (fid)
    {
      case 0:
      if (ftype == Thrift.Type.STRING) {
        this.success = input.readString();
      } else {
        input.skip(ftype);
      }
      break;
      case 0:
        input.skip(ftype);
        break;
      default:
        input.skip(ftype);
    }
    input.readFieldEnd();
  }
  input.readStructEnd();
  return;
};

SimpleService_delayedResponse_result.prototype.write = function(output) {
  output.writeStructBegin('SimpleService_delayedResponse_result');
  if (this.success !== null && this.success !== undefined) {
    output.writeFieldBegin('success', Thrift.Type.STRING, 0);
    output.writeString(this.success);
    output.writeFieldEnd();
  }
  output.writeFieldStop();
  output.writeStructEnd();
  return;
};

var SimpleServiceClient = exports.Client = function(output, pClass) {
    this.output = output;
    this.pClass = pClass;
    this._seqid = 0;
    this._reqs = {};
};
SimpleServiceClient.prototype = {};
SimpleServiceClient.prototype.seqid = function() { return this._seqid; };
SimpleServiceClient.prototype.new_seqid = function() { return this._seqid += 1; };
SimpleServiceClient.prototype.delayedResponse = function(callback) {
  this._seqid = this.new_seqid();
  if (callback === undefined) {
    var _defer = Q.defer();
    this._reqs[this.seqid()] = function(error, result) {
      if (error) {
        _defer.reject(error);
      } else {
        _defer.resolve(result);
      }
    };
    this.send_delayedResponse();
    return _defer.promise;
  } else {
    this._reqs[this.seqid()] = callback;
    this.send_delayedResponse();
  }
};

SimpleServiceClient.prototype.send_delayedResponse = function() {
  var output = new this.pClass(this.output);
  output.writeMessageBegin('delayedResponse', Thrift.MessageType.CALL, this.seqid());
  var args = new SimpleService_delayedResponse_args();
  args.write(output);
  output.writeMessageEnd();
  return this.output.flush();
};

SimpleServiceClient.prototype.recv_delayedResponse = function(input,mtype,rseqid) {
  var callback = this._reqs[rseqid] || function() {};
  delete this._reqs[rseqid];
  if (mtype == Thrift.MessageType.EXCEPTION) {
    var x = new Thrift.TApplicationException();
    x.read(input);
    input.readMessageEnd();
    return callback(x);
  }
  var result = new SimpleService_delayedResponse_result();
  result.read(input);
  input.readMessageEnd();

  if (null !== result.success) {
    return callback(null, result.success);
  }
  return callback('delayedResponse failed: unknown result');
};
var SimpleServiceProcessor = exports.Processor = function(handler) {
  this._handler = handler;
}
;
SimpleServiceProcessor.prototype.process = function(input, output) {
  var r = input.readMessageBegin();
  if (this['process_' + r.fname]) {
    return this['process_' + r.fname].call(this, r.rseqid, input, output);
  } else {
    input.skip(Thrift.Type.STRUCT);
    input.readMessageEnd();
    var x = new Thrift.TApplicationException(Thrift.TApplicationExceptionType.UNKNOWN_METHOD, 'Unknown function ' + r.fname);
    output.writeMessageBegin(r.fname, Thrift.MessageType.EXCEPTION, r.rseqid);
    x.write(output);
    output.writeMessageEnd();
    output.flush();
  }
}
;
SimpleServiceProcessor.prototype.process_delayedResponse = function(seqid, input, output) {
  var args = new SimpleService_delayedResponse_args();
  args.read(input);
  input.readMessageEnd();
  if (this._handler.delayedResponse.length === 0) {
    Q.fcall(this._handler.delayedResponse)
      .then(function(result) {
        var result_obj = new SimpleService_delayedResponse_result({success: result});
        output.writeMessageBegin("delayedResponse", Thrift.MessageType.REPLY, seqid);
        result_obj.write(output);
        output.writeMessageEnd();
        output.flush();
      }, function (err) {
        var result;
        result = new Thrift.TApplicationException(Thrift.TApplicationExceptionType.UNKNOWN, err.message);
        output.writeMessageBegin("delayedResponse", Thrift.MessageType.EXCEPTION, seqid);
        result.write(output);
        output.writeMessageEnd();
        output.flush();
      });
  } else {
    this._handler.delayedResponse(function (err, result) {
      var result_obj;
      if ((err === null || typeof err === 'undefined')) {
        result_obj = new SimpleService_delayedResponse_result((err !== null || typeof err === 'undefined') ? err : {success: result});
        output.writeMessageBegin("delayedResponse", Thrift.MessageType.REPLY, seqid);
      } else {
        result_obj = new Thrift.TApplicationException(Thrift.TApplicationExceptionType.UNKNOWN, err.message);
        output.writeMessageBegin("delayedResponse", Thrift.MessageType.EXCEPTION, seqid);
      }
      result_obj.write(output);
      output.writeMessageEnd();
      output.flush();
    });
  }
};
