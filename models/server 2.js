const express = require("express");
const cors = require("cors");
const userRouter = require("./../routes/user");
const conection = require("./../db/config");
const catalogRouter = require("./../routes/catalog");
const categoryRoute = require("./../routes/categories");
const productRoute = require("./../routes/products");
const uploadImage = require("./../routes/uploads");
const fileUpload = require("express-fileupload");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    this.paths = {
      users: "/users",
      catalogs: "/catalogs",
      categories: "/categories",
      products: "/products",
      uploads: "/uploads",
    };

    //midlewares
    this.middlewares();

    this.routes();
  }

  middlewares() {
    // directorio publico
    this.app.use(express.static("public"));

    //cors
    this.app.use(cors());

    //lectura y parseo de los datos
    this.app.use(express.json());

    //load files
    this.app.use(
      fileUpload({
        useTempFiles: true,
        tempFileDir: "/tmp/",
        createParentPath: true,
      })
    );
  }

  routes() {
    this.app.use(this.paths.users, userRouter);
    this.app.use(this.paths.catalogs, catalogRouter);
    this.app.use(this.paths.categories, categoryRoute);
    this.app.use(this.paths.products, productRoute);
    this.app.use(this.paths.uploads, uploadImage);
  }

  start() {
    this.app.listen(this.port, () => {
      console.log(`Running in port ${this.port}`);
    });
    conection();
  }
}

module.exports = Server;
