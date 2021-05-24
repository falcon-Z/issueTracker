const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const fs = require('fs');

const app = express();

let aboutMessage = "Issue Tracker API v1.0";

const resolvers = {
    Query: {
        about: () => aboutMessage,
    },
    Mutation: {
        setAboutMessage,
    },
};

function setAboutMessage(_, { message }) {
    return aboutMessage = message;
}
const server = new ApolloServer({
    typeDefs: fs.readFileSync('./server/schema.graphql', 'utf-8'),
    resolvers,
});

app.use(express.static('public'));

server.applyMiddleware({ app, path: '/graphql' });

app.listen(
    3000, () => {
        console.log('Listening on http://localhost:3000');
    }
);