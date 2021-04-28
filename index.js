const express = require("express");
const formidable = require("express-formidable");
const cors = require("cors");
const app = express();

const config = require("./services/config");

const python = require("./services/python");
const java = require("./services/java");
const javascript = require("./services/javascript");
const cSharp = require("./services/cSharp");
const golang = require("./services/golang");
const rust = require("./services/rust");


app.use(formidable());

const corsOptions = () => {
  if (process.env.NODE_ENV === "production") {
    return {
      origin: frontend,
      optionsSuccessStatus: 200,
      methods: "GET,POST",
    };
  } else {
    return {
      optionsSuccessStatus: 200,
    };
  }
};

app.use(cors(corsOptions()));

// ROUTES
app.get("/", (req, res) => {
  res.send({ success: true, message: "Hi there!" });
});

app.post("/code", (req, res) => {
  var text = req.fields.text;
  var language = req.fields.language;

  if (!text || !(text.length > 1)) {
    res.status(422).send("Write some code!");
  }
  console.log(language, text)

  switch (language) {
    case "python":
      python.run(text, function (data) {
        res.status(200).json(data);
      });
      break;
    case "javascript":
      javascript.run(text, function (data) {
        res.status(200).json(data);
      });
      break;
    case "csharp":
      cSharp.run(text, function (data) {
        res.status(200).json(data);
      });
      break;
    case "java":
      java.run(text, function (data) {
        res.status(200).json(data);
      });
      break;
    case "golang":
      golang.run(text, function (data) {
        res.status(200).json(data);
      });
      break;
    case "rust":
      rust.run(text, function (data) {
        res.status(200).json(data);
      });
      break;
    default:
      res.status(422).send("Invalid programming language!");
  }
});

app.listen(config.port, () =>
  console.log(`Backend listening at http://localhost:${config.port}`)
);