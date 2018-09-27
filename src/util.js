// Trim the buffer so that: buffer.length <= maxBufferSize.
let trimBuffer = function(buffer, maxBufferSize) {
  return buffer.length > maxBufferSize
    ? buffer.substr(buffer.length - maxBufferSize)
    : buffer;
};

module.exports = {
  trimBuffer: trimBuffer
};
