const mongoose = require("mongoose")

const schema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 3
  },
  passwordHash: {
    type: String,
    required: true,
    minlength: 8
  },
  favoriteGenre: String
})

module.exports = mongoose.model("User", schema)