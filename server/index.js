const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const cors = require("cors");

const authRoute = require("./routes/auth.route.js");
const listingRoute = require("./routes/listing.route.js");
const bookingRoute = require("./routes/booking.route.js");
const userRoute = require("./routes/user.route.js");

app.use(cors());
app.use(express.json());
app.use(express.static("public"));
app.use("/auth", authRoute);
app.use("/properties", listingRoute);
app.use("/bookings", bookingRoute);
app.use("/users", userRoute);

const PORT = 3001;
//console.log(process.env.MONGO_URL);
mongoose
  .connect(process.env.MONGO_URL, {
    dbName: "WanderStay",
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server port: ${PORT}`);
    });
  })
  .catch((err) => console.log(`${err} occured here`));
