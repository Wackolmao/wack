import { BEvent } from "../objects/Event";
import { VoiceState } from "discord.js-selfbot-v13";
import Global from "../registries/Global";
import { Streamer } from "@dank074/discord-video-stream";

export default class VoiceStateUpdateListener extends BEvent<"voiceStateUpdate"> {
  async execute(
    streamer: Streamer,
    oldState: VoiceState,
    newState: VoiceState,
  ): Promise<void> {
    if (oldState.member?.id !== streamer.client?.user?.id) return;
    if (oldState.channelId !== null && newState.channelId === null) {
      Global.botConnected = false;
      Global.isStreaming = false;
    }
  }

  getEventName(): "voiceStateUpdate" {
    return "voiceStateUpdate";
  }
}
