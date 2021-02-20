// Projects imports
import { Execute } from '../interfaces/Command';

// Command properties
const name: string = 'ping';
const description: string = 'Pong!';

// Command execute function
const execute: Execute = async (bot, message, args) => {
    const msg = await message.channel.send("🏓 Pinging...");
    msg.edit(`🏓 Pong!\nLatency: ${Math.floor(msg.createdAt.getTime() - message.createdAt.getTime())}ms`);
}

export { name, description, execute }