const { ApolloServer,UserInputError,AuthenticationError, gql } = require('apollo-server')
const Book = require("./models/book")
const Author = require("./models/author")
const mongoose = require("mongoose")
const User = require("./models/user")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const {PubSub} = require("apollo-server")


const pubsub = new PubSub()

const JWT_SECRET = "MATkhau!@#"
const MONGODB_URI = "mongodb+srv://congdv:Matkhau123@cluster0-izjdz.mongodb.net/library-graphql?retryWrites=true&w=majority"
console.log("connecting to", MONGODB_URI)


mongoose.connect(MONGODB_URI, {useNewUrlParser: true}).then(() => {
  console.log("connected to MongoDB")
})
.catch((error) => {
  console.log("error connection to MongoDB: ", error.message)
})

let authors = [
  {
    name: 'Robert Martin',
    id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
    born: 1952,
  },
  {
    name: 'Martin Fowler',
    id: "afa5b6f0-344d-11e9-a414-719c6709cf3e",
    born: 1963
  },
  {
    name: 'Fyodor Dostoevsky',
    id: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
    born: 1821
  },
  { 
    name: 'Joshua Kerievsky', // birthyear not known
    id: "afa5b6f2-344d-11e9-a414-719c6709cf3e",
  },
  { 
    name: 'Sandi Metz', // birthyear not known
    id: "afa5b6f3-344d-11e9-a414-719c6709cf3e",
  },
]

/*
 * It would be more sensible to assosiate book and the author by saving 
 * the author id instead of the name to the book.
 * For simplicity we however save the author name.
*/

let books = [
  {
    title: 'Clean Code',
    published: 2008,
    author: 'Robert Martin',
    id: "afa5b6f4-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring']
  },
  {
    title: 'Agile software development',
    published: 2002,
    author: 'Robert Martin',
    id: "afa5b6f5-344d-11e9-a414-719c6709cf3e",
    genres: ['agile', 'patterns', 'design']
  },
  {
    title: 'Refactoring, edition 2',
    published: 2018,
    author: 'Martin Fowler',
    id: "afa5de00-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring']
  },
  {
    title: 'Refactoring to patterns',
    published: 2008,
    author: 'Joshua Kerievsky',
    id: "afa5de01-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring', 'patterns']
  },  
  {
    title: 'Practical Object-Oriented Design, An Agile Primer Using Ruby',
    published: 2012,
    author: 'Sandi Metz',
    id: "afa5de02-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring', 'design']
  },
  {
    title: 'Crime and punishment',
    published: 1866,
    author: 'Fyodor Dostoevsky',
    id: "afa5de03-344d-11e9-a414-719c6709cf3e",
    genres: ['classic', 'crime']
  },
  {
    title: 'The Demon',
    published: 1872,
    author: 'Fyodor Dostoevsky',
    id: "afa5de04-344d-11e9-a414-719c6709cf3e",
    genres: ['classic', 'revolution']
  },
]

const typeDefs = gql`
  type Author {
    name: String!
    id:ID!
    born: Int
    bookCount: Int
  }
  type Book {
    title: String!
    published: Int!
    author: Author!
    id:ID!
    genres:[String!]!
  }
  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }
  type Subscription {
    bookAdded: Book!
  }
  type Token {
    value: String!
  }
  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(
      author: String
      genre: String): [Book!]!
    allAuthors: [Author!]!
    me: User
    allGenres: [String!]!
  }
  type Mutation {
    addBook (
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book!
    editAuthor(
      name: String!
      setBornTo: Int!
    ):Author
    createUser(
      username: String!
      password: String!
      favoriteGenre: String!
    ): User
    login(
      username: String!
      password: String!
    ): Token
  }
`

const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: async(root, args) => {
      if(Object.keys(args).length === 0 && args.constructor === Object){
        const books = await(Book.find({})).populate("author")
        return books
      }
      if(args.author && args.genre) {
        return Book.find({"author.name":args.author, genres: {$in: [args.genre]}})
      }
      if(args.author){
        return Book.find({"author.name":args.author})
      }
      if(args.genre){
        return Book.find({genres: {$in: [args.genre]}})
      }
    },
    allAuthors: () => Author.find({}),
    me: (root, args, context) => {
      return context.currentUser
    }, 
    allGenres: async () => {
      const books = await Book.find({})
      console.log(books)
      let genres = []
      books.forEach(book => {
        book.genres.forEach(
          genre => {
            if(!genres.includes(genre)) {
              genres.push(genre)
            }
          }
        )
      })
      return genres
    }
  },
  Author: {
    name: (root) => root.name,
    born: (root) => root.born,
    id: (root) => root.id,
    bookCount:async(root) => {
      console.log(root.name)
      const books = await Book.find({}).populate("author")
      return (books.filter(b => b.author.name === root.name)).length

    }
  },
  Book: {
    title: (root) => root.title,
    published: (root) => root.published,
    genres: (root) => root.genres,
    author: (root) => root.author
  },
  Mutation : {
    addBook: async (root, args, context) => {
      const currentUser = context.currentUser
      console.log(args, "Add Book")

      if(!currentUser) {
        throw new AuthenticationError("Not Authentication")
      }

      let author = await Author.findOne({name: args.author})
      if(!author) {
        author = new Author({name: args.author})
      }
      
      const book = new Book({
        title: args.title,
        published: Number(args.published),
        genres: args.genres,
        author: author
      })
      console.log(book.title)
      try {
        await author.save()
        await book.save()
      } catch(error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
      console.log(`${book.title} is added`)
      pubsub.publish("BOOK_ADDED", {bookAdded: book})
      return book
    },
    editAuthor: async(root, args, context) => {
      const currentUser = context.currentUser
      if(!currentUser) {
        throw new AuthenticationError("Not Authentication")
      }
      const author = await Author.findOne({name: args.name})
      if(!author) {
        throw new UserInputError(`Author ${args.name} is not found`, {
          invalidArgs: args,
        })
      }
      console.log(args)
      author.born = Number(args.setBornTo)
      try {
        author.save()
      }catch(error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
      return author
    },
    createUser: async (root, args) => {
      const saltRounds = 10
      const passwordHash = await bcrypt.hash(args.password, saltRounds)

      const user = new User({
        username: args.username,
        favoriteGenre: args.favoriteGenre,
        passwordHash
      })

      return user.save().catch(error => {
        throw new UserInputError(error.message, {
          invalidArgs: args
        })
      })
    },
    login: async(root, args) => {
      const user = await User.findOne({username: args.username})
      
      const passwordCorrect = user === null ? false 
      : await bcrypt.compare(args.password, user.passwordHash)

      if(!(user&& passwordCorrect)) {
        throw new UserInputError("Invalid username or password", {
          invalidArgs: args
        })
      }

      const userForToken = {
        username: user.username,
        id: user._id
      }
      return {value: jwt.sign(userForToken, JWT_SECRET)}

    }
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(["BOOK_ADDED"])
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async({req}) => {
    const auth = req ? req.headers.authorization : null
    if(auth && auth.toLowerCase().startsWith("bearer ")) {
      const decodedToken = jwt.verify(
        auth.substring(7), JWT_SECRET
      )

      const currentUser = await User.findById(decodedToken.id)
      return {currentUser}
    }
  }
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
