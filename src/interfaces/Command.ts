// Library imports
import { Message } from 'discord.js';
// Projects imports
import { Bot } from '../classes/bot';

// Execute functions interface
export interface Execute {
    (bot: Bot, message: Message, args: string[]): Promise<void>
}

// Command interface
export interface Command {
    name: string,
    description: string,
    execute: Execute
}