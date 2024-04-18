const express = require("express");
const handlebars = require("express-handlebars");

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));

const mongodbConnection = require("./configs/mongodb-connection");
const postService = require("./services/post-service");


app.engine(
    "handlebars",
    handlebars.create({
        helpers: require("./configs/handlebars-helpers"),
    }).engine,
);
app.set("view engine", "handlebars");
app.set("views", __dirname + "/views");

app.get("/", async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const serach = req.query.search || "";
    try {
        const [posts, paginator] = await postService.list(collection, page, serach);
        res.render("home", {title: "테스트 게시판", search, paginator, posts});
    } catch (error) {
        console.log(error);
        res.render("home", {title: "테스트 게시판"});
    }

});

app.get("/write", (req, res) => {
    res.render("write", {title: "테스트 게시판"});
});

app.get("/detail/:id", async (req, res) => {
    res.render("detail", {title: "테스트 게시판"});
});

let collection;
//글쓰기
app.post("/write", async (req, res) => {
    const post = req.body;
    const result = await postService.writePost(collection, post);
    res.redirect(`/detail/${result.insertedId}`);
});

app.listen(3002, async () => {
    console.log("Server started");
    const mongoClient = await mongodbConnection();
    collection = mongoClient.db().collection("post");
    console.log("MongoDB connected");
});

