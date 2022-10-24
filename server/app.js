require("dotenv").config();
require("express-async-errors");

const express = require("express");
const app = express();

const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");
const morgan = require("morgan");

app.use(express.json());
app.use(morgan("dev"));

const registrationRouter = require("./routes/RegistrationRoutes");
const profileRouter = require("./routes/ProfileRoutes");
const loginRouter = require("./routes/LoginRoutes");
const reviewsRouter = require("./routes/ReviewRoutes");
const bookingsRouter = require("./routes/BookingRoutes");

//all routes will go before the notfound middleware

app.use("/lba/api/v1/register", registrationRouter);
app.use("/lba/api/v1/profiles", profileRouter);
app.use("/lba/api/v1/login", loginRouter);
app.use("/lba/api/v1/review", reviewsRouter);
app.use("/lba/api/v1/bookings", bookingsRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
