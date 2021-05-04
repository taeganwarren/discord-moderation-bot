// Library imports
import { Client, Collection } from 'discord.js';
import { readdirSync } from 'fs';
// Project imports
import { Command } from './interfaces/Command';
import { Event } from './interfaces/Event';
import { redis_client } from './lib/redis';

// Bot class
class Bot extends Client {

    // Properties
    public commands: Collection<string, Command> = new Collection();
    public prefixes = redis_client;

    // Bot constructor
    public constructor() {
        super({
            disableMentions: 'everyone'
        });
        // Get all commands and load them into the commands collection
        const command_files = readdirSync('./src/commands').filter(file => file.endsWith('.ts'));
        for (const file of command_files) {
            const command: Command = require(`./commands/${file}`);
            this.commands.set(command.name, command);
        }
        // Registers event handlers
        const event_files = readdirSync('./src/events').filter(file => file.endsWith('.ts'));
        for (const file of event_files) {
            const event: Event = require(`./events/${file}`);
            if (event.once) {
                this.once(event.name, (...args) => event.execute(this, ...args));
            } else {
                this.on(event.name, (...args) => event.execute(this, ...args));
            }
        }

        // Starts the bot
        this.login(process.env.TOKEN);
    }

}

export { Bot }