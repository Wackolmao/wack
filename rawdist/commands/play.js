"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Global_1 = __importDefault(require("../registries/Global"));
const ytdl_core_1 = __importDefault(require("ytdl-core"));
class PlayCommand {
    name = "play";
    usage = "play <link>";
    description = "Play a youtube link.";
    async execute(msg, args, streamer) {
        if (!msg.guild)
            return;
        if (!msg.member?.voice.channel)
            return;
        if (!args[0])
            return await msg.reply("No link provided.");
        if (!streamer)
            return await msg.reply("Streamer not initialized.");
        if (!Global_1.default.botConnected)
            return await msg.reply("Bot not connected.");
        let link = args[0];
        if (!ytdl_core_1.default.validateURL(link))
            return await msg.reply("Invalid link.");
        let queuePos = Global_1.default.queue.enqueue(link);
        await msg.reply(`**Your request has been added to the #\`${queuePos}\` in queue.**`);
    }
}
exports.default = PlayCommand;
