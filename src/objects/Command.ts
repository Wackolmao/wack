import { Message } from "discord.js-selfbot-v13";
import { Streamer } from "@dank074/discord-video-stream";

export interface Command {
  // cmd name
  name: string;
  // cmd description
  description: string;
  // cmd usage
  usage: string;
  execute: (msg: Message, args: string[], streamer: Streamer) => Promise<any>;
}
