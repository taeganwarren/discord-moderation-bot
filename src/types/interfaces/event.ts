// Project imports
import { Bot } from '../../classes/bot';

// Event interface
export interface Event {
    name: string,
    once: boolean,
    execute(bot: Bot, ...args: any): Promise<void>
}