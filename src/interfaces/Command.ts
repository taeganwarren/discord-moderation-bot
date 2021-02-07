import { Bot } from '../bot';
import { Message } from 'discord.js';

export interface Execute {
    (bot: Bot, message: Message, args: string[]): Promise<void>
}

export interface Command {
    name: string,
    description: string,
    execute: Execute
}