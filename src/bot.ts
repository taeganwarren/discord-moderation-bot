// Load .env file
import { config } from 'dotenv';
config();

// Imports
import { Client } from 'discord.js';
import message_handler from './handlers/message';

// Create bot object
const bot = new Client({
    disableMentions: 'everyone'
});
bot.login(process.env.TOKEN);

// Register handlers
bot.on('ready', () => { console.log(`${bot.user?.username} has logged in`); });
bot.on('message', message_handler);