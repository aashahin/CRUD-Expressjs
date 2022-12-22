const express = require("express"),
  app = express(),
  dotenv = require("dotenv"),
  morgan = require("morgan"),
  categoryRoute = require("./routes/categoryRoute"),
  { dbConnection } = require("./config/database"),
  ApiErrors = require("./utils/apiErrors");
const { globalErrors } = require("./middlewares/globalErrors");

// Import ENV
dotenv.config({ path: "config.env" });

// MiddleWares
app.use(express.json());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
  console.log(`Mode: ${process.env.NODE_ENV}`);
}

// DB Connection
dbConnection();

// Routes
app.use("/api/v1/categories", categoryRoute);

// Run Server
const port = process.env.PORT;
const server = app.listen(port, () => {
  console.log(`Run Server With ${port}`);
});

// Handling Errors MiddleWares
app.all("*", (req, res, next) => {
  next(new ApiErrors(`Can't Find This Route: ${req.originalUrl}`, 400));
});

app.use(globalErrors);

// UnhandledRejection Outside Express
process.on("unhandledRejection", (err) => {
  console.error(`Unhandled Rejection Errors ${err}`);
  server.close(() => {
    console.log(`ShutDown The Server.`);
    process.exit(1);
  });
});
