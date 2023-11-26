import { Client, ClientEvents, Message } from "discord.js-selfbot-v13";
import { setStreamOpts, Streamer } from "@dank074/discord-video-stream";
import { config as dotenv } from "dotenv";
import { Queue } from "./objects/adt/Queue";
import { BEvent } from "./objects/Event";
import Registry from "./registries/Registry";

dotenv();
let queue = new Queue<{ link: string; msg: Message<boolean> }>();
let botConnected = false;
let isStreaming = false;
let isPlaying = false;

const streamer = new Streamer(
  new Client({
    autoRedeemNitro: true,
    patchVoice: true,
    checkUpdate: false,
    intents: ["GUILDS", "GUILD_MESSAGES", "MESSAGE_CONTENT"],
  }),
);
setStreamOpts({
  video_codec: "H264",
  bitrateKbps: 2000,
  fps: 30,
});

["join", "play", "queue", "skip"].forEach(async (file) => {
  const command = require(`./commands/${file}`);
  // create new instance of command and register it
  Registry.registerCommand(new command.default());
});

["MessageCreate", "Ready", "VoiceStateUpdateListener"].forEach(async (file) => {
  const event = require(`./events/${file}`);
  const listener: BEvent<keyof ClientEvents> = new event.default();
  listener.once
    ? streamer.client.once(listener.getEventName(), (...args) =>
        listener.execute(streamer, ...args),
      )
    : streamer.client.on(listener.getEventName(), (...args) =>
        listener.execute(streamer, ...args),
      );
});

["QueueChecker"].forEach(async (file) => {
  const interval = await require(`./intervals/${file}`);
  setInterval(() => interval.default.execute(streamer), interval.default.time);
});

process.on("uncaughtException", (err) => {
  console.error(err);
  // process.exit(1);
});

process.on("unhandledRejection", (err) => {
  console.error(err);
  // process.exit(1);
});

streamer.client.login(process.env.TOKEN);
