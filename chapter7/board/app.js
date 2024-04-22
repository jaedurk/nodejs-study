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
    const search = req.query.search || "";
    try {
        const [posts, paginator] = await postService.list(collection, page, search);
        res.render("home", {title: "테스트 게시판", search, paginator, posts});
    } catch (error) {
        console.log(error);
        res.render("home", {title: "테스트 게시판"});
    }

});

app.get("/write", (req, res) => {
    res.render("write", {title: "테스트 게시판", mode: "create"});
});

app.get("modify/:id", async (req, res) => {
    const post = await postService.getPostById(collection, req.params.id);
    console.log(post);
    res.render("write", {title: "테스트 게시판 ", mode: "modify", post});
});

app.post("/modify/", async (req, res) => {
    const {id, title, writer, password, content} = req.body;

    const post = {
        title,
        writer,
        password,
        content,
        createdDt: new Date().toISOString(),
    }

    const result = postService.updatePost(collection, id, post);
    res.redirect(`/detail/${id}`);
});

app.get("/detail/:id", async (req, res) => {
    const result = await postService.getDetailPost(collection, req.params.id);
    res.render("detail", {
        title: "테스트 게시판",
        post: result.value,
    });
});

app.post("/check-password", async (req, res) => {

    // console.log('res : ', res.body);
    const {id, password} = req.body;

    const post = await postService.getPostByIdAndPassword(collection, {id, password});

    if (!post) {
        return res.status(404).json({isExist: false});
    } else {
        return res.json({isExist: true})
    }
})

let collection;
//글쓰기
app.post("/write", async (req, res) => {
    const post = req.body;
    const result = await postService.writePost(collection, post);
    res.redirect(`/detail/${result.insertedId}`);
});

app.listen(3000, async () => {
    console.log("Server started");
    const mongoClient = await mongodbConnection();
    collection = mongoClient.db().collection("post");
    console.log("MongoDB connected");
});

