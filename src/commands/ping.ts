import { Execute } from '../interfaces/Command';

const name: string = 'ping';
const description: string = 'Pong!';

const execute: Execute = async (bot, message, args) => {
    message.channel.send('Pong!');
}

export { name, description, execute }