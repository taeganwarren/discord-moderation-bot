import winston from 'winston';

export const logger = winston.createLogger({
	levels: winston.config.syslog.levels,
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
	format: winston.format.printf(log => `[${log.level.toUpperCase()}] ${log.message}`)
});

if (process.env.NODE_ENV === 'development') {
	logger.add(new winston.transports.Console({
		format: winston.format.combine(winston.format.colorize(),winston.format.simple())
	}));
}