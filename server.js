const express = require("express");
const app = express();
const mongoose = require("mongoose");
const model = require("./model");
let uri = process.env.TOKEN;

const bodyParser = require("body-parser");
const cors = require("cors");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then((res) => {
    console.log("DB Connected!");
  })
  .catch((err) => {
    console.log(Error, err.message);
  });

app.use(express.static("public"));
app.get("/", (req, res) => {
  res.redirect("/charge");
});
app.get("/charge", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});
app.get("/accueil", (req, res) => {
  res.sendFile(__dirname + "/homepage.html");
});
app.get("/writingpage", (req, res) => {
  res.sendFile(__dirname + "/writingpage.html");
});
app.get("/test", (req, res) => {
  res.sendFile(__dirname + "/test.html")
})

app.get("/verif/:texte", (req, res) => {
  var gramma = require("gramma")
gramma.check(req.params.texte, {language: "fr"}).then(r => {
return res.json({message: r.matches})
})
})

app.get("/getword", (req, res) => {
  model.findOne({ foreign: "mcd" }, (err, doc) => {

    if (!doc) {
      return;
    } else {
      return res.json({
        message: [doc.liste_non_inclusif, doc.liste_inclusif],
      });
    }
  });
});

app.get("/postword/:word_a/:word_b", (req, res) => {
  model.findOne({ foreign: "mcd" }, (err, doc) => {
    let q = req.params.word_a.toLowerCase().split(",");
    let p = req.params.word_b.toLowerCase();
    if (doc.liste_non_inclusif.includes(q) || doc.liste_inclusif.includes(p)) {
      return res.json({ message: "found" });
    } else {
      let copy = [...doc.liste_non_inclusif];
      copy.push(q);
      doc.liste_non_inclusif = copy;
      let copy2 = [...doc.liste_inclusif];
      copy2.push(p);
      doc.liste_inclusif = copy2;

      doc.save();
      return res.json({ message: "not found" });
    }
  });
});

app.get("/download/:ctt", (req, res) => {

  const fs = require("fs");
  fs.writeFileSync("file.txt", req.params.ctt)
  return res.download('file.txt')
  
})


app.listen(process.env.PORT, () => {
  console.log("L'application est sur le port suivant :", process.env.PORT);
});
