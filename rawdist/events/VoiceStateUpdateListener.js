"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Event_1 = require("../objects/Event");
const Global_1 = __importDefault(require("../registries/Global"));
class VoiceStateUpdateListener extends Event_1.BEvent {
    async execute(streamer, oldState, newState) {
        if (oldState.member?.id !== streamer.client?.user?.id)
            return;
        if (oldState.channelId !== null && newState.channelId === null) {
            Global_1.default.botConnected = false;
            Global_1.default.isStreaming = false;
        }
    }
    getEventName() {
        return "voiceStateUpdate";
    }
}
exports.default = VoiceStateUpdateListener;
