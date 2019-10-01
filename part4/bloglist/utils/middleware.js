const requestLogger = (request, response, next) => {
  console.log("Method: ", request.method);
  console.log("Path: ", request.path);
  console.log("Body: ", request.body);
  console.log("---");
  next();
};

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if( error.name === "CastError" && error.kind === "ObjectId" ) {
    return response.status(400).send({ error: "malformated id" });
  } else if( error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
  } else if( error.name === "JsonWebTokenError") {
    return response.status(400).send({error: "token is not valid"});
  }

  next(error);
};

const getTokenFrom = request => {
  const authorization = request.get("authorization");
  if(authorization && authorization.toLowerCase().startsWith("bearer ")) {
    return authorization.substring(7);
  }
};

const tokenExtractor =  (request, response, next) => {
  const token = getTokenFrom(request);
  request.token = token;
  next();
};
module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  tokenExtractor
};