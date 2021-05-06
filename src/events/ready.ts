// Project imports
import { Execute } from '../interfaces/Event';

// Properties
const name: string = 'ready';
const once: boolean = true;

// Execute function
const execute: Execute = async (bot) => {
    console.log(`${bot.user?.username} has logged in`);

    // Set bot activity
    const num_servers = bot.guilds.cache.size;
    bot.user?.setActivity(`${num_servers} servers | @me!`, { type: 'WATCHING' })
        .then(presence => console.log(`Activity set to "${presence.activities[0].name}"`))
        .catch(console.error);

    console.log(`${bot.user?.username} has finished setup`);
}

export { name, once, execute }