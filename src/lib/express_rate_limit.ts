import rateLimit from 'express-rate-limit';
const limiter = rateLimit({
  windowMs: 60 * 1000, // 15 minutes
  limit: 60, // Limit each IP to 100 requests per windowMs
  max: 100, // Limit each IP to 100 requests per windowMs
  standardHeaders: 'draft-8', // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  message: {
    error: 'Too many requests, please try again later.',
  },
});
export default limiter;
