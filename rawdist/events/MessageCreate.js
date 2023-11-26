"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Event_1 = require("../objects/Event");
const Registry_1 = __importDefault(require("../registries/Registry"));
class MessageCreateListener extends Event_1.BEvent {
    async execute(streamer, msg) {
        if (!msg.guild)
            return;
        if (!msg.content.startsWith("!"))
            return;
        const args = msg.content.slice(1).trim().split(/ +/g);
        const command = args.shift()?.toLowerCase();
        if (!command)
            return;
        const cmd = Registry_1.default.getCommand(command);
        if (!cmd)
            return;
        await cmd.execute(msg, args, streamer);
    }
    getEventName() {
        return "messageCreate";
    }
}
exports.default = MessageCreateListener;
