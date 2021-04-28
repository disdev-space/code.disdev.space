const express = require("express");
const formidable = require("express-formidable");
const app = express();

const config = require("./services/config");

const python = require("./services/python");
const java = require("./services/java");
const javascript = require("./services/javascript");

app.use(formidable());

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
    case "java":
      java.run(text, function (data) {
        res.status(200).json(data);
      });
      break;
    default:
      res.status(422).send("Invalid programming language!");
  }
});

app.get("/languages", (req, res) => {
  res.send({ success: true, data: ["javascript", "java", "python"] });
});

app.listen(config.port, () =>
  console.log(`Backend listening at http://localhost:${config.port}`)
);