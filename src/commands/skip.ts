import { Command } from "../objects/Command";
import { Message } from "discord.js-selfbot-v13";
import { Streamer } from "@dank074/discord-video-stream";
import Global from "../registries/Global";

export default class SkipCommand implements Command {
  description: string = "Skip the current queue item.";
  name: string = "skip";
  usage: string = "skip";

  async execute(msg: Message, args: string[], streamer: Streamer) {
    streamer.stopStream();
    Global.ytdl_stream.destroy();
    setTimeout(() => {
      Global.isPlaying = false;
      Global.isStreaming = false;
    }, 1000);
    await msg.reply("Skipped.");
  }
}
