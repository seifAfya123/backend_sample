/**
 * @copyright seifafya
 * @license Apache-2.0
 */

// Imports
import config from '@/config';
import limiter from '@/lib/express_rate_limit';
import v1Routes from '@/routes/v1';
import { connectToDatabase, disconnectFromDatabase } from '@/lib/mongodb';
import {logger} from '@/lib/winston';
//Node Modules
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import helmet from 'helmet';

// types
import type { CorsOptions } from 'cors';

const app = express();
const corsOptions: CorsOptions = {
  origin(origin, callback) {
    if (
      config.NODE_ENV === 'development' ||
      !origin ||
      config.WHITE_LISTED_DOMAINS.includes(origin)
    ) {
      callback(null, true);
    } else {
      callback(new Error(`${origin} Not allowed by CORS`), false);
      logger.warn(`CORS error: ${origin} is not allowed by CORS`);
    }
  },
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  compression({
    threshold: 1024,
  }),
);
app.use(helmet());
app.use(limiter);


(async () => {
  try {
    await connectToDatabase();
    app.use('/api/v1', v1Routes);

    app.listen(config.PORT, () => {
      logger.info(`server running at http://localhost:${config.PORT}`);
    });
  } catch (error) {
    logger.error('Error during server initialization during dev:', error);
    if (config.NODE_ENV === 'production') {
      logger.error(
        'Error during server initialization during production:',
        error,
      );

      process.exit(1);
    }
  }
})();

const handleServerShutdown = async () => {
  try {
    await disconnectFromDatabase();
    logger.warn('Server is shutting down gracefully...');
    process.exit(0);
  } catch (error) {
    logger.error('Error during server shutdown:', error);
  }
};

process.on('SIGINT', handleServerShutdown);
process.on('SIGTERM', handleServerShutdown);
