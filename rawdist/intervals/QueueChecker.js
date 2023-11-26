"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_video_stream_1 = require("@dank074/discord-video-stream");
const Global_1 = __importDefault(require("../registries/Global"));
const ytdl_core_1 = __importDefault(require("ytdl-core"));
exports.default = {
    execute: async (streamer) => {
        if (Global_1.default.isPlaying)
            return;
        if (!Global_1.default.botConnected)
            return;
        if (!Global_1.default.isStreaming) {
            Global_1.default.isStreaming = true;
            Global_1.default.isPlaying = false;
            Global_1.default.stream = await streamer.createStream();
            let stream = Global_1.default.stream;
            stream.mediaConnection.setSpeaking(true);
            stream.mediaConnection.setVideoStatus(true);
        }
        if (Global_1.default.queue.isEmpty())
            return;
        discord_video_stream_1.command?.kill("SIGCONT");
        const link = Global_1.default.queue.dequeue();
        let stream = Global_1.default.stream;
        Global_1.default.isPlaying = true;
        Global_1.default.ytdl_stream = (0, ytdl_core_1.default)(link, {
            highWaterMark: 50 * 1024 * 1024,
            filter: "videoandaudio",
        });
        await (0, discord_video_stream_1.streamLivestreamVideo)(Global_1.default.ytdl_stream, stream, true);
        Global_1.default.isPlaying = false;
        Global_1.default.isStreaming = true;
        discord_video_stream_1.command?.kill("SIGSTOP");
    },
    time: 3 * 1000,
};
