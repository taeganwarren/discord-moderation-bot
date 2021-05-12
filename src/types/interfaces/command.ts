// Library imports
import { Message } from 'discord.js';
// Project imports
import { Bot } from '../../classes/bot';

// Execute function interface
export interface Execute {
    (bot: Bot, prefix: string, message: Message, args: string[]): Promise<void>
}

// Command interface
export interface Command {
    name: string,
    description: string,
    usage: string,
    aliases: string[],
    cooldown: number,
    execute: Execute
}