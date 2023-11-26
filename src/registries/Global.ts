import { Queue } from "../objects/adt/Queue";

export default {
  isStreaming: false,
  isPlaying: false,
  botConnected: false,
  queue: new Queue<string>(),
  stream: null as any,
  ytdl_stream: null as any,
};
