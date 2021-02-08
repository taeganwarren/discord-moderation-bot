// Load env variables
require('dotenv').config();
// Projects imports
import { Bot } from './bot';

// Create and start the bot
const bot = new Bot();

export default bot;