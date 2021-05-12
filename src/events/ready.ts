// Project imports
import { Event } from '../types/interfaces/event';

// Event definition
export default {

    // Properties
    name: 'ready',
    once: true,

    // Execute function
    execute: async (bot) => {
        bot.logger.info({message: `${bot.user?.username} has logged in`});

        // Set bot activity
        const num_servers = bot.guilds.cache.size;
        bot.user?.setActivity(`${num_servers} servers | @me!`, { type: 'WATCHING' })
            .then(presence => bot.logger.info({message: `Activity set to "${presence.activities[0].name}"`}));

        bot.logger.info({message: `${bot.user?.username} has finished setup`});
    }

} as Event;