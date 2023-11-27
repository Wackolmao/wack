import { Command } from "../objects/Command";
import { Message } from "discord.js-selfbot-v13";
import { Streamer } from "@dank074/discord-video-stream";
import Global from "../registries/Global";
// Import MediaUdp if it's a part of an external library or your project
// import { MediaUdp } from 'path-to-the-mediaudp-definition';

export default class LeaveCommand implements Command {
  name = "leave";
  usage = "leave";
  description = "Leaves your VC.";

  async execute(
    msg: Message,
    args: string[],
    streamer: Streamer,
  ): Promise<any> {
    // Check if the bot is connected to a voice channel
    if (!Global.botConnected) {
      await msg.reply("I'm not connected to any voice channel.");
      return;
    }

    // Reset global states
    Global.botConnected = false;
    Global.isStreaming = false;
    Global.isPlaying = false;

    // Stop any ongoing streaming or media playback
    if (Global.stream) {
      // Assuming MediaUdp is correctly imported and used
      let stream = Global.stream as any; // Use 'any' if the exact type is unknown
      if(stream.mediaConnection) {
        stream.mediaConnection.setSpeaking(false);
        stream.mediaConnection.setVideoStatus(false);
      }
      stream.stop();
      Global.stream = null;
    }

    if (Global.ytdl_stream) {
      Global.ytdl_stream.destroy();
      Global.ytdl_stream = null;
    }

    // Stop the streamer and leave the voice channel
    streamer.stopStream();
    streamer.leaveVoice();

    // Send a confirmation message
    await msg.reply("Left the voice channel.");
  }
}
