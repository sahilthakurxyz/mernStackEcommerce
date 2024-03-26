const express = require("express");
const cookieParser = require("cookie-parser");
const errorMiddleware = require("./middleware/error");
const productRouter = require("./routes/productRoute");
const userRouter = require("./routes/userRoute");
const payment = require("./routes/paymentRoute");
const orderRouter = require("./routes/orderRoute");
const bodyParser = require("body-parser");

const cors = require("cors");
const fileUpload = require("express-fileupload");
// Config
if (process.env.NODE_ENV !== "PRODUCTION") {
  const path = require("path");
  require("dotenv").config({ path: "backend/config/.env" });
}
// Allow requests from specific origin(s)
const allowedOrigins = [
  "https://6602f9518617a754426d01d3--zippy-bunny-9be2ad.netlify.app",
  // Add more origins if needed
];
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  optionsSuccessStatus: 204,
};
app.use(cors(corsOptions));
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "temp/directory",
  })
);
// routers api's
app.use("/api/ecommerce/v1", productRouter);
app.use("/api/ecommerce/v1", userRouter);
app.use("/api/ecommerce/v1", orderRouter);
app.use("/api/ecommerce/v1", payment);

// app.use(express.static(path.join(__dirname, "../frontend/build")));
// app.get("*", (req, res) => {
//   res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"));
// });
// Middleware for error handling
app.use(errorMiddleware);
module.exports = app;
