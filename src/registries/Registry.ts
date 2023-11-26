import { Command } from "../objects/Command";

export default class Registry {
  private static _command: Map<string, Command> = new Map();

  public static getCommand(a: string): Command | undefined {
    return this._command.get(a);
  }

  static registerCommand(cmd: Command): void {
    this._command.set(cmd.name, cmd);
    console.log(`Registered command ${cmd.name}`);
  }

  static unregisterCommand(cmd: Command): void {
    this._command.delete(cmd.name);
  }

  static unregisterCommandByName(name: string): void {
    this._command.delete(name);
  }
}
