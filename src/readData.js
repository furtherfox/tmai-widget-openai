const readData = (sourceBuffer, mediaSource, reader, onEndOfStream, onPlay, onError) => {
  const processChunk = ({ done, value }) => {
      if (done) {
          if (!sourceBuffer.updating && mediaSource.readyState === 'open') {
              mediaSource.endOfStream();
          }
          onEndOfStream();
          return;
      }

      if (!sourceBuffer.updating) {
          sourceBuffer.appendBuffer(value);
          if (onPlay) { // Check if onPlay is a function before calling it
              onPlay();
          }
      }
  };

  // Add the listener outside of processChunk to avoid multiple instances
  sourceBuffer.addEventListener('updateend', () => {
      reader.read().then(processChunk).catch(onError);
  });

  // Start the reading process
  reader.read().then(processChunk).catch(onError);
};

export default readData;
