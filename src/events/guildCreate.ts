// Library imports
import { Guild } from 'discord.js';
// Project imports
import { Event } from '../types/interfaces/event';

// Event definition
export default {

    // Properties
    name: 'guildCreate',
    once: false,

    // Execute function
    execute: async (bot, guild: Guild) => {
        bot.logger.info({message: `Joined a new server: ${guild.name}`});

        // Update bots activity
        const num_servers = bot.guilds.cache.size;
        bot.user?.setActivity(`${num_servers} servers | @me!`, { type: 'WATCHING' })
            .then(presence => bot.logger.info({message: `Activity updated to "${presence.activities[0].name}"`}));
    }

} as Event;