import { Awaitable, ClientEvents } from "discord.js-selfbot-v13";
import { Streamer } from "@dank074/discord-video-stream";

export abstract class BEvent<K extends keyof ClientEvents> {
  once: boolean = false;

  abstract getEventName(): K;

  abstract execute(
    streamer: Streamer,
    ...args: ClientEvents[K]
  ): void | Awaitable<void> | Promise<void>;
}
