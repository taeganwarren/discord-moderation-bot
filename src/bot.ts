// Library imports
import { Client, Collection } from 'discord.js';
import { readdirSync } from 'fs';
import redis, { RedisClient } from 'redis';
// Project imports
import { Command } from './interfaces/Command';
import message_handler from './handlers/message';
import ready_handler from './handlers/ready';

const dev = process.env.NODE_ENV === 'development';

// Bot class
class Bot extends Client {

    // Properties
    public commands: Collection<string, Command> = new Collection();
    public prefixes: RedisClient = redis.createClient({
        host: 'localhost',
        port: 5000
    });

    // Bot constructor
    public constructor() {
        super({
            disableMentions: 'everyone'
        });
        this.load_commands();
        this.register_handler();
        this.start();
    }

    // Dynamically get all commands and load them into the commands collection
    private load_commands() {
        const command_files = readdirSync('./src/commands').filter(file => file.endsWith(dev ? '.ts' : '.js'));
        for (const file of command_files) {
            const command: Command = require(`./commands/${file}`);
            this.commands.set(command.name, command);
        }
    }

    // Registers event handlers
    private register_handler() {
        this.on('message', message_handler);
        this.on('ready', ready_handler);
    }

    // Starts the bot
    private start() {
        this.login(process.env.TOKEN);
    }

}

export { Bot }