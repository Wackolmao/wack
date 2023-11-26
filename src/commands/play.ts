import { Command } from "../objects/Command";
import { Message } from "discord.js-selfbot-v13";
import { Streamer } from "@dank074/discord-video-stream";
import Global from "../registries/Global";
import ytdl from "ytdl-core";

export default class PlayCommand implements Command {
  name = "play";
  usage = "play <link>";
  description = "Play a youtube link.";

  async execute(
    msg: Message,
    args: string[],
    streamer: Streamer,
  ): Promise<any> {
    if (!msg.guild) return;
    if (!msg.member?.voice.channel) return;
    if (!args[0]) return await msg.reply("No link provided.");
    if (!streamer) return await msg.reply("Streamer not initialized.");
    if (!Global.botConnected) return await msg.reply("Bot not connected.");
    let link = args[0];
    if (!ytdl.validateURL(link)) return await msg.reply("Invalid link.");
    let queuePos = Global.queue.enqueue(link);
    await msg.reply(
      `**Your request has been added to the #\`${queuePos}\` in queue.**`,
    );
  }
}
