// Project imports
import { Execute } from '../interfaces/Command';

// Properties
const name: string = 'ping';
const description: string = 'Pong!';
const usage: string = '';

// Execute function
const execute: Execute = async (prefix, bot, message, args) => {
    message.channel.send(":ping_pong: Pinging...").then(res => {
        res.edit(`:ping_pong: Pong!\nLatency: ${res.createdTimestamp - message.createdTimestamp}ms`);
        message.delete({ timeout: 5000 });
        res.delete({ timeout: 5000 });
    });
    return;
}

export { name, description, usage, execute }
