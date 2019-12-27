const bcrypt = require("bcrypt");
const userRouter = require("express").Router();
const User = require("../models/user");

userRouter.post("/", async (request, response, next) => {
  try {
    const body = request.body;

    const username = body.username;
    const password = body.password;

    if(password.length < 3) {
      response.status(401).json({ error: "The password must be at least 3 characters long" });
    }
    if(username.length < 3) {
      response.status(401).json({ error: "The user name must be at least 3 characters long" });
    }

    const users = await User.find({});
    const validUser = users.find( user => user.username === body.username);
    if(validUser) {
      response.status(401).json({ error: "The user name is taken" });
    }

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(body.password, saltRounds);

    const user = new User({
      username: body.username,
      name: body.name,
      passwordHash
    });

    const savedUser = await user.save();

    response.json(savedUser.toJSON());
  } catch(error) {
    next(error);
  }
});

userRouter.get("/", async ( request, response ) => {
  const users = await User.find({}).populate("blogs", { title: 1, url: 1, author: 1 } );
  response.json(users.map(user => user.toJSON()));
});

userRouter.get("/:id", async ( request, response) => {
  const foundUser = await User.findById(request.params.id).populate("blogs", { title: 1, url: 1, author: 1 } );
  response.json(foundUser.toJSON());
});

module.exports = userRouter;