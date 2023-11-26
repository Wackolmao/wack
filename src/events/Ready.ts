import { BEvent } from "../objects/Event";
import { Streamer } from "@dank074/discord-video-stream";
import * as console from "console";

export default class ReadyEvent extends BEvent<"ready"> {
  execute(streamer: Streamer): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      console.log(`Ready! Logged in as ${streamer.client.user?.tag}`);
      resolve();
    });
  }

  getEventName(): "ready" {
    return "ready";
  }
}
