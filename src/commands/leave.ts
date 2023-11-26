import { Command } from "../objects/Command";
import { Message } from "discord.js-selfbot-v13";
import { MediaUdp, Streamer, command } from "@dank074/discord-video-stream";
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
    Global.botConnected = false;
    Global.isStreaming = false;
    Global.isPlaying = false;
    
    let stream = Global.stream as MediaUdp;
    stream.mediaConnection.setSpeaking(false);
    stream.mediaConnection.setVideoStatus(false);
    stream.stop();
    Global.stream = null;
    Global.ytdl_stream = null;
    command.kill("SIGINT");
    streamer.stopStream();
    Global.ytdl_stream.destroy();
    streamer.leaveVoice();
    await msg.reply("Joined your VC.");
  }
}
