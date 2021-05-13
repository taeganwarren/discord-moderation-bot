// Library imports
import { Message, PermissionResolvable } from 'discord.js';
// Project imports
import { Bot } from '../../classes/bot';

// Command interface
export interface Command {
    name: string,
    description: string,
    usage: string,
    permissions: PermissionResolvable[],
    dm: boolean,
    aliases: string[],
    cooldown: number,
    execute(bot: Bot, prefix: string, message: Message, args: string[]): Promise<void>
}