// Library imports
import { Client, Collection } from 'discord.js';
import { readdirSync } from 'fs';
// Project imports
import { Command } from '../types/interfaces/command';
import { Event } from '../types/interfaces/event';
import { redis_client } from '../utils/redis';
import { logger } from '../utils/logger';

// Bot class
// TODO: Add package to dynamically get color and add color to embeds
export class Bot extends Client {

    // Properties
    public commands: Collection<string, Command> = new Collection();
    public prefixes = redis_client;
    public logger = logger;
    // TODO: Add database

    // Constructor
    public constructor() {
        super({
            disableMentions: 'everyone'
        });
        this.load_commands();
        this.register_events();
        // TODO: Load and cache all prefixes from database

        // Starts the bot
        this.login(process.env.TOKEN);
    }

    // Load commands
    private load_commands() {

        // Get all commands
        const command_files = readdirSync('./src/commands')
            .filter(file => process.env.NODE_ENV === 'production' ? file.endsWith('.js') : file.endsWith('.ts'));

        // Load each command
        for (const file of command_files) {
            logger.info({message: `Loading command: ${file}`});
            try {
                const command: Command = require(`../commands/${file}`).default;
                this.commands.set(command.name, command);
            } catch (e) {
                this.logger.error({message: e});
                this.logger.error({message: `Error loading command: ${file}`});
            }
        }
    }

    // Register events
    private register_events() {

        // Get all events
        const event_files = readdirSync('./src/events')
            .filter(file => process.env.NODE_ENV === 'production' ? file.endsWith('.js') : file.endsWith('.ts'));

        // Register each event
        for (const file of event_files) {
            logger.info({message: `Registering event: ${file}`});
            try {
                const event: Event = require(`../events/${file}`).default;
                event.once ?
                    this.once(event.name, (...args) => event.execute(this, ...args)) :
                    this.on(event.name, (...args) => event.execute(this, ...args));
            } catch (e) {
                this.logger.error({message: e});
                this.logger.error({message: `Error registering event: ${file}`});
            }
        }
    }
}