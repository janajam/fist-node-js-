const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const router = require("./routes/userRoutes");
const authRouter = require("./routes/authRoute");
const meRouter=require('./routes/meRoute')
const { loginLimiter } = require("./middleware/rateLimitMiddleware");
const helmet = require("helmet");
// const morgan = require('morgan');
// const cookieParser = require("cookie-parser");
// const path = require('path');
// const globalError = require('./middlewares/errorMiddleware');
// const cors = require('cors');
// const mountRoutes = require('./routes');


// Winston Logging Middlewares
// const correlationId = require("./middlewares/correlationId");
// const requestLogger = require("./middlewares/requestLogger");
// const errorLogger = require("./middlewares/errorLogger");


const app = express();


// ------------------------------------------------------
// CORS
// -----------------------------------------------------
// app.use(
//   cors({

//     origin: "http://localhost:5173",
//     credentials: true
//     methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
//     allowedHeaders: ["Content-Type", "Authorization"],
//   })
// ); 


// app.options("*", cors());



dotenv.config();
const PORT = process.env.PORT || 8000;
const MONGOURI = process.env.MONGO_URI;



// Body parser
app.use(express.json({ limit: '20kb' }));
// app.use(express.static(path.join(__dirname, 'uploads')));
app.use(loginLimiter)
// Compress responses
// app.use(compression());
// app.use(helmet());
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        scriptSrc: ["'self'"],
      },
    },
  })
);

// Cookie parser
// app.use(cookieParser());


// ------------------------------------------------------
// Mount routes AFTER injecting req.io
// ------------------------------------------------------
// mountRoutes(app);n

// Handle unknown routes
// app.all('*', (req, res, next) => {
//   next(new ApiError(`Can't find this route: ${req.originalUrl}`, 404));
// });

// Morgan (development only)
// if (process.env.NODE_ENV === 'development') {
//   app.use(morgan('dev'));
// }


// Log every request (Winston)
// app.use(requestLogger);


// Add Correlation ID FIRST
// app.use(correlationId);

// Winston Error Logger
// app.use(errorLogger);


// Global error handler
// app.use(globalError);

mongoose
  .connect(MONGOURI)
  .then(() => {
    console.log("DB connected successfully");
    app.listen(PORT, () => {
      console.log(`server is running on port :${PORT}`);
    });
  })
  .catch((error) => {
    (console.log(error), process.exit(1));
  });

app.use("/api", router);
app.use("/api",meRouter)
app.use("/api/auth", authRouter);
