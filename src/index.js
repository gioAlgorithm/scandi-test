import React from 'react';
import ReactDOM from 'react-dom';
import App from "./App"
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { BrowserRouter } from 'react-router-dom';

const client = new ApolloClient({
    uri: "http://localhost:4000/graphql",
    cache: new InMemoryCache()
})

ReactDOM.render(
    <BrowserRouter>
        <ApolloProvider client={client}>
                <App />
        </ApolloProvider>
    </BrowserRouter>
, document.getElementById("root"))
