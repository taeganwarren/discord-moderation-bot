// Project imports
import { Command } from '../types/interfaces/command';

// Command definition
export default {

    // Properties
    name: 'ping',
    description: 'Pong!',
    usage: '',
    aliases: [],
    cooldown: 0,

    // Execute function
    execute: async (prefix, bot, message, args) => {
        message.channel.send(":ping_pong: Pinging...").then(res => {
            res.edit(`:ping_pong: Pong!\nLatency: ${res.createdTimestamp - message.createdTimestamp}ms`);
            message.delete({ timeout: 5000 });
            res.delete({ timeout: 5000 });
        });
    }

} as Command;