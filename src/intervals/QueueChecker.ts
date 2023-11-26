import {
  command,
  MediaUdp,
  Streamer,
  streamLivestreamVideo,
} from "@dank074/discord-video-stream";
import Global from "../registries/Global";
import ytdl from "ytdl-core";

export default {
  execute: async (streamer: Streamer) => {
    if (Global.isPlaying) return;
    if (!Global.botConnected) return;
    if (!Global.isStreaming) {
      Global.isStreaming = true;
      Global.isPlaying = false;
      Global.stream = await streamer.createStream();
      let stream = Global.stream as MediaUdp;
      stream.mediaConnection.setSpeaking(true);
      stream.mediaConnection.setVideoStatus(true);
    }
    if (Global.queue.isEmpty()) return;
    command?.kill("SIGCONT");
    const link = Global.queue.dequeue()!;
    let stream = Global.stream as MediaUdp;
    Global.isPlaying = true;
    Global.ytdl_stream = ytdl(link, {
      // set highest watermark of 100mb
      highWaterMark: 50 * 1024 * 1024,
      filter: "videoandaudio",
    });
    await streamLivestreamVideo(Global.ytdl_stream, stream, true);
    Global.isPlaying = false;
    Global.isStreaming = true;
    command?.kill("SIGSTOP");
  },
  time: 3 * 1000,
};
