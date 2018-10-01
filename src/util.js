"use strict";

// Trim the buffer so that: buffer.length <= maxBufferSize.
function trimBuffer(buffer, maxBufferSize) {
  return buffer.length > maxBufferSize
    ? buffer.substr(buffer.length - maxBufferSize)
    : buffer;
}

// Handle errors.
function error(at, info) {
  throw "[Error][" + at + "][" + info + "]\n";
}

// Export.
module.exports = {
  trimBuffer: trimBuffer,
  error: error
};
