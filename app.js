const express = require("express");
const path = require("path");
const hbs = require("hbs");
const session = require("express-session");
const PORT = 3000;
//importamos dotenv para usar vars de entorno y no exponer datos sensibles
require("dotenv").config();
const routeIndex = require("./routes/index");
const routeLogin = require("./routes/login");
const routeOrder = require("./routes/order");
const routeSecret = require("./routes/secret");

const app = express();
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: false }));

app.set("view engine", "hbs");
hbs.registerPartials(path.join(__dirname, "./views/partials"));

//configuramos express-session copiando la sintaxis de la docu
//https://www.npmjs.com/package/express-session
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
  })
);
//creamos el middleware para verificar los intentos de igreso a la ruta "secret",
//Aunque tratemos de entrar directamente, siempre se correrá antes el middleware
//y solo podremos acceder si req.session.user (que se setea con un valor en caso de login positivo)
//luego, si salimos de "secret", podremos volver si escribimos la ruta, siempre que la sesión
//continúe activa
const secured = async (req, res, next) => {
  if (req.session.user) {
    app.locals.user = req.session.user;
    next();
  } else {
    res.render("noAuth");
  }
};

const isAuth = (req, res, next) => {
  app.locals.user = req.session.user;
  next();
};

app.use("/", isAuth, routeIndex);
app.use("/login", routeLogin);
app.use("/order", routeOrder)
app.use("/secret", secured, routeSecret);
app.get("*", (req, res) => {
  res.send("No ta... ");
});

app.listen(PORT, (err) => {
  err
    ? console.log("explotó todo 😫")
    : console.log(`Servidor corre en http://localhost:${PORT}/`);
});
