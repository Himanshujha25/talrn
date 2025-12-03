const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");


dotenv.config();
connectDB();

const app = express();

app.use(express.json());
app.use("/uploads", express.static("uploads"));

// FIX: Allow frontend (local & vercel)
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://talrn-nine.vercel.app",   // your frontend URL
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.send("Backend Running");
});

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/developers", require("./routes/developerRoutes"));

app.listen(process.env.PORT || 4000, () =>
  console.log("Server Running...")
);
