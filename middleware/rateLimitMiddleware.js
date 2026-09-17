const{ rateLimit } =require('express-rate-limit')

exports.loginLimiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	limit: 5, 
    message: 'Too many requests from this IP, please try again after 15 minutes',
})