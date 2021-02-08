// Projects imports
import bot from '../main';

// Ready event handler
export default async () => {
    console.log(`${bot.user?.username} has logged in`);
}