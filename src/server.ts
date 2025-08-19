/**
 * @copyright seifafya
 * @license Apache-2.0
 */

// Imports
import config from '@/config';
import limiter from '@/lib/express_rate_limit';
import v1Routes from '@/routes/v1';
import { connectToDatabase, disconnectFromDatabase } from '@/lib/mongodb';

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
      console.error(`CORS error: ${origin} is not allowed by CORS`);
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
      console.log(`server running at http://localhost:${config.PORT}`);
    });
  } catch (error) {
    console.error('Error during server initialization during dev:', error);
    if (config.NODE_ENV === 'production') {
      console.error(
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
    console.log('Server is shutting down gracefully...');
    process.exit(0);
  } catch (error) {
    console.log('Error during server shutdown:', error);
  }
};

process.on('SIGINT', handleServerShutdown);
process.on('SIGTERM', handleServerShutdown);
