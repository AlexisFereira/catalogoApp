require("dotenv").config();
const { response } = require("express");
const express = require("express");
const productsRoute = require("./routes/products");
const cartRoute = require("./routes/cart");
const adminRoute = require("./routes/admin");
const path = require("path");
const port = 3000;
const bodyparser = require("body-parser");
const db = require("./db/database");
const User = require("./models/user");
const Product = require("./models/products");
const Cart = require("./models/cart");
const CartItem = require("./models/cart-item");

//const expressHbs = require("express-handlebars");

const app = express();
/*
app.engine(
  "hbs",
  expressHbs({
    layoutsDir: "views/layouts",
    defaultLayout: "main-layout",
    extname: "hbs",
  })
);
*/

const sqlQuery =
  "CREATE TABLE IF NOT EXISTS users(id int AUTO_INCREMENT, firstname VARCHAR(50), lastname VARCHAR(50), email VARCHAR(50), password VARCHAR(20), PRIMARY KEY(id))";

//db.execute(sqlQuery);

app.set("view engine", "ejs");
//app.set("view engine", "hbs");
//app.set("view engine", "pug");
app.set("views", "views");
app.use(express.json());
app.use((req, res, next) => {
  User.findByPk(1)
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((e) => console.log(e));
});
app.use(bodyparser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/", productsRoute);
app.use("/cart", cartRoute);
app.use("/admin", adminRoute);T††††‡†
app.use("/", (req, res = response) => {
  res
    .status(400)
    .render("404", { pagetitle: "Page not found.", cart: 0, active: "error" });
  //res.status(400).sendFile(path.join(__dirname, "views", "404.html"));
});

Product.belongsTo(User, { constraints: true, onDelete: "cascade" });
User.hasMany(Product);
User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product, { through: CartItem });
Product.belongsToMany(Cart, { through: CartItem });

db.sync()
  .then(() => {
    const users = User.findAll();
    if (!users.length) {
      User.create({
        firstname: "Alexis",
        lastname: "Fereira",
        email: "alexis.fereira@gmail.com",
        password: "123",
      }).then((result) => result);
    }
  })
  .then(() =>
    app.listen(port, () => {
      console.log(`listen port ::: ${port} :::`);
    })
  )
  .catch((e) => console.log(e));
