"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Registry {
    static _command = new Map();
    static getCommand(a) {
        return this._command.get(a);
    }
    static registerCommand(cmd) {
        this._command.set(cmd.name, cmd);
        console.log(`Registered command ${cmd.name}`);
    }
    static unregisterCommand(cmd) {
        this._command.delete(cmd.name);
    }
    static unregisterCommandByName(name) {
        this._command.delete(name);
    }
}
exports.default = Registry;
