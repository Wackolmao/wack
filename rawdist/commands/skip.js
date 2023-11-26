"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_video_stream_1 = require("@dank074/discord-video-stream");
const Global_1 = __importDefault(require("../registries/Global"));
class SkipCommand {
    description = "Skip the current queue item.";
    name = "skip";
    usage = "skip";
    async execute(msg, args, streamer) {
        discord_video_stream_1.command?.kill("SIGINT");
        streamer.stopStream();
        Global_1.default.stream?.mediaConnection.setSpeaking(false);
        Global_1.default.stream?.mediaConnection.setVideoStatus(false);
        Global_1.default.ytdl_stream.destroy();
        setTimeout(() => {
            Global_1.default.isPlaying = false;
            Global_1.default.isStreaming = false;
        }, 1000);
        await msg.reply("Skipped.");
    }
}
exports.default = SkipCommand;
