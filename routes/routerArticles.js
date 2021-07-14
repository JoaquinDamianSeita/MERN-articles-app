const express = require("express");
const routerArticles = express.Router();
const Article = require("../models/article");
const User = require("../models/user");
const userExtactor = require("../middleware/userExtractor");

routerArticles.get("/", function (req, res) {
  Article.find(function (err, articles) {
    res.json(articles);
  });
});

routerArticles.get("/:id", async (req, res) => {
  Article.findById(req.params.id, function (err, article) {
    if (!article) {
      res.status(404).send("No result found");
    } else {
      res.json(article);
    }
  });
});

routerArticles.post("/", userExtactor, async (req, res, next) => {
  const { title, content } = req.body;

  const { userId } = req;

  const user = await User.findById(userId);

  if (!content) {
    return res.status(400).json({ error: "required content field is missing" });
  }

  const newArticle = new Article({
    title,
    content,
    date: new Date(),
    userId: user._id,
  });

  try {
    const savedArticle = await newArticle.save();

    user.notes = user.notes.concat(savedArticle._id);
    await user.save();

    res.json(savedArticle);
  } catch (error) {
    next(error);
  }
});

routerArticles.patch("/:id", userExtactor, function (req, res) {
  Article.findByIdAndUpdate(req.params.id, req.body)
    .then(function () {
      res.json("Article updated");
    })
    .catch(function (err) {
      res.status(422).send("Article update failed.");
    });
});

routerArticles.delete("/:id", userExtactor, function (req, res) {
  Article.findById(req.params.id, function (err, article) {
    if (!article) {
      res.status(404).send("Article not found");
    } else {
      Article.findByIdAndRemove(req.params.id)
        .then(function () {
          res.status(200).json("Article deleted");
        })
        .catch(function (err) {
          res.status(400).send("Article delete failed.");
        });
    }
  });
});

module.exports = routerArticles;
