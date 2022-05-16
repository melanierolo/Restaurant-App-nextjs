import "../styles/globals.css";
import React, { useContext, useState } from "react";
import AppContext from "../components/context";
import Head from "next/head";
import Layout from "../components/Layout";

function MyApp(props) {
  const [user, setUser] = useState(null);
  const { Component, pageProps } = props;

  return (
    <AppContext.Provider
      value={{
        cart: false,
        addItem: false,
        removeItem: false,
        isAuthenticated: false,
        user: user,
        setUser: setUser,
      }}
    >
      <Head>
        <link
          rel="stylesheet"
          href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css"
          integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm"
          crossOrigin="anonymous"
        />
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AppContext.Provider>
  );
}

export default MyApp;
