export const options = {
  swaggerDefinition: {
    info: {
      description: "This is a sample server",
      title: "Swagger",
      version: "1.0.0",
    },
    host: "localhost:3000",
    basePath: "/api/v1/",
    produces: ["application/json", "application/xml"],
    schemes: ["http", "https"],
  },
  basedir: __dirname, //app absolute path
  files: ["./routes/**/*.js"], //Path to the API handle folder
};
