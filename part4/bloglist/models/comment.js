const moongose = require("mongoose");

const commentSchema = new moongose.Schema({
  content: {
    type: String,
    minlength: 5,
    required: true
  },
  user: {
    type: moongose.Schema.Types.ObjectId,
    ref: "User"
  }
});

commentSchema.set("toJSON", {
  transform:(document,  returnedObject ) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});

const Comment = moongose.model("Comment", commentSchema);

module.exports = Comment;