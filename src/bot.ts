require('dotenv').config();

import { Client, Collection } from 'discord.js';
import { readdirSync } from 'fs';
import { Command } from './interfaces/Command';
import message_handler from './handlers/message';

const dev = process.env.NODE_ENV === 'development';

class Bot extends Client {
    public commands: Collection<string, Command> = new Collection();
    public constructor() {
        super({
            disableMentions: 'everyone'
        });
    }
    public async start() {
        const command_files = readdirSync('./src/commands').filter(file => file.endsWith(dev ? '.ts' : '.js'));
        for (const file of command_files) {
            const command: Command = require(`./commands/${file}`);
            this.commands.set(command.name, command);
        }
        this.on('ready', () => { console.log(`${this.user?.username} has logged in`); });
        this.on('message', message_handler);
        this.login(process.env.TOKEN);
    }
}

export { Bot }