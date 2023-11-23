const { ApolloServer } = require("apollo-server");  // import Apollo_server
const { importSchema } = require("graphql-import"); // import graphql-import to load_Schema
const EtherDataSource = require("./datasource/ethDatasource"); // Import custom data_source
const typeDefs = importSchema("./schema.graphql");  // Load Schema


require("dotenv").config(); // load environment_variable

// Configures resolvers to match schema
const resolvers = {
  Query: {
    etherBalanceByAddress: (root, _args, { dataSources }) =>
      dataSources.ethDataSource.etherBalanceByAddress(), // value for etherBalanceByAddress

    totalSupplyOfEther: (root, _args, { dataSources }) =>
      dataSources.ethDataSource.totalSupplyOfEther(), // value for totalSupplyOfEther

    latestEthereumPrice: (root, _args, { dataSources }) =>
      dataSources.ethDataSource.getLatestEthereumPrice(), //value for latestEthereumPrice

    blockConfirmationTime: (root, _args, { dataSources }) =>
      dataSources.ethDataSource.getBlockConfirmationTime(), //value for blockConfirmationTime
  },
};

// Configures Apollo Server with schema, resolvers and data sources
const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    ethDataSource: new EtherDataSource(), // create new ethData Source here
  }),
});

server.timeout = 0;
server.listen("9000").then(({ url }) => { // start server on port 9000
    console.log(`🚀 Server ready at ${url}`); // check if server is ready
});
