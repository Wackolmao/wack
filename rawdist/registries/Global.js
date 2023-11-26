"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Queue_1 = require("../objects/adt/Queue");
exports.default = {
    isStreaming: false,
    isPlaying: false,
    botConnected: false,
    queue: new Queue_1.Queue(),
    stream: null,
    ytdl_stream: null,
};
