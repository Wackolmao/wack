import { BEvent } from "../objects/Event";
import { Message } from "discord.js-selfbot-v13";
import { Streamer } from "@dank074/discord-video-stream";
import Registry from "../registries/Registry";

export default class MessageCreateListener extends BEvent<"messageCreate"> {
  async execute(streamer: Streamer, msg: Message): Promise<void> {
    if (!msg.guild) return;
    if (!msg.content.startsWith("!")) return;
    const args = msg.content.slice(1).trim().split(/ +/g);
    const command = args.shift()?.toLowerCase();
    if (!command) return;
    const cmd = Registry.getCommand(command);
    if (!cmd) return;
    await cmd.execute(msg, args, streamer);
  }

  getEventName(): "messageCreate" {
    return "messageCreate";
  }
}
