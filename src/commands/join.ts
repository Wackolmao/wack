import { Command } from "../objects/Command";
import { Message } from "discord.js-selfbot-v13";
import { MediaUdp, Streamer } from "@dank074/discord-video-stream";
import Global from "../registries/Global";

export default class JoinCommand implements Command {
  name = "join";
  usage = "join";
  description = "Joins your VC.";

  async execute(
    msg: Message,
    args: string[],
    streamer: Streamer,
  ): Promise<any> {
    if (!msg.guild) return;
    if (!msg.member?.voice.channel)
      return await msg.reply("You're not in a VC.");
    await streamer.joinVoice(msg.guildId!, msg.member.voice.channel.id);
    Global.botConnected = true;
    Global.isStreaming = true;
    Global.isPlaying = false;
    Global.stream = await streamer.createStream();
    let stream = Global.stream as MediaUdp;
    stream.mediaConnection.setSpeaking(true);
    stream.mediaConnection.setVideoStatus(true);
    await msg.reply("Joined your VC.");
  }
}
