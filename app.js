const express = require("express");
const logger = require("morgan");
const cors = require("cors");
// доступ к переменному окружению
require("dotenv").config();

const authRouter = require("./routes/api/auth");
const contactsRouter = require("./routes/api/contacts");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

// логирует запросы на сервер в консоли
app.use(logger(formatsLogger));
// позволяет выполнять запросы
app.use(cors());
// проверяет body запроса на наличие json => парсит json
app.use(express.json());

// список маршрутов и роутов, которые за них отвечают
app.use("/api/users", authRouter);
app.use("/api/contacts", contactsRouter);

// после маршрутов ставится.
// выдает ошибку 404, если машрут не найден
app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

// универсальная мидлвара выдачи ошибки
app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

module.exports = app;
