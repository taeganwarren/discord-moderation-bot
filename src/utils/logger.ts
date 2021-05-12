// Library imports
import winston from 'winston';

// Define logger
export const logger = winston.createLogger({
	levels: winston.config.syslog.levels,
	// Log everything to combined.log and only errors to error.log
	transports: [
		new winston.transports.File({
			filename: 'logs/combined.log',
			level: 'debug'
		}),
		new winston.transports.File({
			filename: 'logs/errors.log',
			level: 'error'
		})
	],
	format: winston.format.simple()
});

// If running in development, add a console logger
if (process.env.NODE_ENV === 'development') {
	logger.add(new winston.transports.Console({
		format: winston.format.combine(winston.format.colorize(),winston.format.simple())
	}));
}