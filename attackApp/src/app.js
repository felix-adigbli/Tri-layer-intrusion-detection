import express from "express";
import cors from "cors";
import session from "express-session";
import bodyParser from "body-parser";
import mustacheExpress from "mustache-express";
import registerRoutes from "./routes/index.js";


const app = express();

app.use(cors({
    origin: "*"
}));

//configure session middleware
const idleTimeout = 30*60*1000
app.use(
    session({
        secret: "Lo0kingForwardto@Vacat10n",
        resave: false,
        saveUninitialized: true,
        cookie: { maxAge: idleTimeout}
    })
);

//middleware for parssing form data
//app.use(bodyParser.json());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
//app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());

//Service Static files (CSS, images etc)
app.use(express.static("public"));


//set view engine to Mustache
app.engine("mustache", mustacheExpress());
app.set("view engine", "mustache");
app.set("views", "views");

//define routes
registerRoutes(app);

export default app;
