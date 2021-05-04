// Projects imports
import { Execute } from '../interfaces/Command';

// Command properties
const name: string = 'ready';
const once: boolean = true;

// Command execute function
const execute: Execute = async (bot) => {
    console.log(`${bot.user?.username} has logged in`);
    const num_servers = bot.guilds.cache.size;
    bot.user?.setActivity(`${num_servers} servers | @me!`, { type: 'WATCHING' })
        .then(presence => console.log(`Activity set to "${presence.activities[0].name}"`))
        .catch(console.error);
}

export { name, once, execute }