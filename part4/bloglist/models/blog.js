const moongose = require("mongoose");

const blogSchema = new moongose.Schema({
  title: {
    type: String,
    minlength: 5,
    required: true
  },
  author :{
    type: String,
    minlength: 3,
  },
  url : {
    type: String,
    minlength: 3,
    required: true
  },
  likes : {
    type: Number
  },
  user: {
    type: moongose.Schema.Types.ObjectId,
    ref: "User"
  },
  comments: [
    {
      type: moongose.Schema.Types.ObjectId,
      ref: "Comment"
    }
  ]
});

blogSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});

module.exports = moongose.model("Blog", blogSchema);