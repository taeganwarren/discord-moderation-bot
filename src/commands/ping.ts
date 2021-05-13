// Project imports
import { Command } from '../types/interfaces/command';

// Command definition
export default {

    // Properties
    name: 'ping',
    description: 'Pong!',
    usage: '',
    permissions: [],
    dm: true,
    aliases: [],
    cooldown: 0,

    // Execute function
    execute: async (bot, prefix, message, args) => {
        message.channel.send(":ping_pong: Pinging...").then(res => {
            res.edit(`:ping_pong: Pong!\nMessage latency: ${res.createdTimestamp - message.createdTimestamp}ms\nAPI latency is ${Math.round(bot.ws.ping)}ms`);
            if (message.channel.type !== 'dm') {
                message.delete({ timeout: 5000 });
                res.delete({ timeout: 5000 });
            }
        });
    }

} as Command;