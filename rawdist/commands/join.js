"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Global_1 = __importDefault(require("../registries/Global"));
class JoinCommand {
    name = "join";
    usage = "join";
    description = "Joins your VC.";
    async execute(msg, args, streamer) {
        if (!msg.guild)
            return;
        if (!msg.member?.voice.channel)
            return await msg.reply("You're not in a VC.");
        await streamer.joinVoice(msg.guildId, msg.member.voice.channel.id);
        Global_1.default.botConnected = true;
        Global_1.default.isStreaming = true;
        Global_1.default.isPlaying = false;
        Global_1.default.stream = await streamer.createStream();
        let stream = Global_1.default.stream;
        stream.mediaConnection.setSpeaking(true);
        stream.mediaConnection.setVideoStatus(true);
        await msg.reply("Joined your VC.");
    }
}
exports.default = JoinCommand;
