const express = require("express");
const dotenv = require("dotenv");
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;
app.use(express.json());

const userRouter = require("./routes/userRouter");
const groupRouter = require("./routes/groupRouter");
const expensesRouter = require("./routes/expensesRouter");
const settlementRouter = require("./routes/settlementRouter");

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

 app.use("/users", userRouter);
 app.use("/groups", groupRouter);
 app.use("/expenses", expensesRouter);
 app.use("/settlement", settlementRouter);



app.listen(PORT, () => {
  console.log("server is running at port no 8080");
});
