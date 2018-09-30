"use strict";

// Trim the buffer so that: buffer.length <= maxBufferSize.
function trimBuffer(buffer, maxBufferSize) {
  return buffer.length > maxBufferSize
    ? buffer.substr(buffer.length - maxBufferSize)
    : buffer;
};

// Handle errors.
function error(msg){
  throw "[Error][" + msg + "]\n";
};

// Export.
module.exports = {
  trimBuffer: trimBuffer,
  error: error
};
