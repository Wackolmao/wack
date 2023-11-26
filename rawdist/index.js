"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_selfbot_v13_1 = require("discord.js-selfbot-v13");
const discord_video_stream_1 = require("@dank074/discord-video-stream");
const dotenv_1 = require("dotenv");
const Queue_1 = require("./objects/adt/Queue");
const Registry_1 = __importDefault(require("./registries/Registry"));
(0, dotenv_1.config)();
let queue = new Queue_1.Queue();
let botConnected = false;
let isStreaming = false;
let isPlaying = false;
const streamer = new discord_video_stream_1.Streamer(new discord_js_selfbot_v13_1.Client({
    autoRedeemNitro: true,
    patchVoice: true,
    checkUpdate: false,
    intents: ["GUILDS", "GUILD_MESSAGES", "MESSAGE_CONTENT"],
}));
(0, discord_video_stream_1.setStreamOpts)({
    video_codec: "H264",
    bitrateKbps: 2000,
    fps: 30,
});
["join", "play", "queue", "skip"].forEach(async (file) => {
    const command = require(`./commands/${file}`);
    Registry_1.default.registerCommand(new command.default());
});
["MessageCreate", "Ready", "VoiceStateUpdateListener"].forEach(async (file) => {
    const event = require(`./events/${file}`);
    const listener = new event.default();
    listener.once
        ? streamer.client.once(listener.getEventName(), (...args) => listener.execute(streamer, ...args))
        : streamer.client.on(listener.getEventName(), (...args) => listener.execute(streamer, ...args));
});
["QueueChecker"].forEach(async (file) => {
    const interval = await require(`./intervals/${file}`);
    setInterval(() => interval.default.execute(streamer), interval.default.time);
});
streamer.client.login(process.env.TOKEN);
