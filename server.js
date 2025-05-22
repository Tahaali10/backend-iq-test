const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const passport = require("passport");
const cookieSession = require("cookie-session");
const blogRoutes = require("./routes/blogRoutes");
const userRoutes = require('./routes/userRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const subscriptionRoutes = require('./routes/subscriptionRoutes');
const resultRoutes = require('./routes/resultRoutes');
const questionRoutes = require('./routes/questionRoutes');
const termsConditionsRoutes = require('./routes/termsConditionsRoutes');
const privacyPolicyRoutes = require('./routes/privacyPolicyRoutes');
const faqRoutes = require('./routes/faqRoutes');

const path = require("path");
require("./server");

dotenv.config();
connectDB();

const app = express();

app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());

app.use(
  cookieSession({
    name: "session",
    keys: ["key1"],
    maxAge: 24 * 60 * 60 * 1000,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api/blogs", blogRoutes);
app.use("/api/auth", authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/subscriptions', subscriptionRoutes);
app.use('/api/results', resultRoutes);
app.use('/api/questions', questionRoutes);
app.use('/api/terms-conditions', termsConditionsRoutes);
app.use('/api/privacy-policy', privacyPolicyRoutes);
app.use('/api/faq', faqRoutes);

app.get("/", (req, res) => {
  res.send("hello");
});
app.listen(process.env.PORT, () =>
  console.log(`Server running on port ${process.env.PORT}`)
);
