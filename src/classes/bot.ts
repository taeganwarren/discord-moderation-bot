// Library imports
import { Client, Collection } from 'discord.js';
import { readdirSync } from 'fs';
// Project imports
import { Command } from '../interfaces/Command';
import { Event } from '../interfaces/Event';
import { redis_client } from '../lib/redis';

// Bot class
class Bot extends Client {

    // Properties
    public commands: Collection<string, Command> = new Collection();
    public prefixes = redis_client;

    // Constructor
    public constructor() {
        super({
            disableMentions: 'everyone'
        });
        this.load_commands();
        this.load_events();

        // Starts the bot
        this.login(process.env.TOKEN);
    }

    // Load commands from commands directory
    private load_commands() {
        const command_files = readdirSync('./src/commands').filter(file => process.env.APP_ENV === 'dev' ? file.endsWith('.ts') : file.endsWith('.js'));
        for (const file of command_files) {
            const command: Command = require(`../commands/${file}`);
            this.commands.set(command.name, command);
        }
    }

    // Load events from events directory
    private load_events() {
        const event_files = readdirSync('./src/events').filter(file => process.env.APP_ENV === 'dev' ? file.endsWith('.ts') : file.endsWith('.js'));
        for (const file of event_files) {
            const event: Event = require(`../events/${file}`);
            event.once ?
                this.once(event.name, (...args) => event.execute(this, ...args)) :
                this.on(event.name, (...args) => event.execute(this, ...args));
        }
    }
}

export { Bot }