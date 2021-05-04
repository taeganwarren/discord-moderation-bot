// Projects imports
import { Bot } from '../bot';

// Execute functions interface
export interface Execute {
    (bot: Bot, ...args: any): Promise<void>
}

// Event interface
export interface Event {
    name: string,
    once: boolean,
    execute: Execute
}