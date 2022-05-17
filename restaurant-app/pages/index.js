import React, { useState } from "react";
import Cart from "../components/cart";
import {
  HttpLink,
  InMemoryCache,
  ApolloProvider,
  ApolloClient,
} from "@apollo/client";
import RestaurantList from "../components/restaurantList";
import { InputGroup, InputGroupText, Input } from "reactstrap";

function Home() {
  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:1337";
  console.log(`URL: ${API_URL}`);
  const [query, setQuery] = useState("");
  const link = new HttpLink({ uri: `${API_URL}/graphql` });
  const cache = new InMemoryCache();
  const client = new ApolloClient({ link, cache });

  return (
    <>
      <ApolloProvider client={client}>
        <div className="search">
          <h1> Local Restaurants</h1>
          <InputGroup>
            <Input
              placeholder="restaurant.."
              onChange={(e) => setQuery(e.target.value.toLocaleLowerCase())}
              value={query}
            />
          </InputGroup>
        </div>
        <RestaurantList search={query} />
        <Cart> </Cart>
      </ApolloProvider>
    </>
  );
}
export default Home;
