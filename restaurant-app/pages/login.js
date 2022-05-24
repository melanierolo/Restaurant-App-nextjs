/* /pages/login.js */

import React, { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import {
  Container,
  Row,
  Col,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Card,
} from "reactstrap";
import { login, registerUser } from "../components/auth";
import AppContext from "../components/context";
import { useSession, getProviders, signIn } from "next-auth/react";

function Login(props) {
  const [data, updatedata] = useState({
    identifier: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const router = useRouter();
  const { data: session, status } = useSession();
  const { user, setUser, isAuthenticated } = useContext(AppContext);

  //-----------Provider-google----------
  const [providers, setProviders] = useState({});
  useEffect(() => {
    getProviders().then((prov) => {
      console.log({ prov });
      setProviders(prov);
    });
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/"); // redirect if you're already logged
    }
  }, []);

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/"); // redirect if you're already logged in
      console.log("next-auth_session", session);
      console.log("next-auth_status", status);
      registerUser(
        session.user.name,
        session.user.email,
        Math.random().toString(36).slice(2)
      );
      setUser(session.user.name);
    }
  }, [status, session]);

  function onChange(event) {
    updatedata({ ...data, [event.target.name]: event.target.value });
  }

  return (
    <Container>
      <Row>
        <Col sm="12" md={{ size: 5, offset: 3 }}>
          <div className="paper">
            <div className="header">
              <img src="" />
              <h1>Login</h1>
            </div>
            <section className="wrapper">
              {Object.entries(error).length !== 0 &&
                error.constructor === Object &&
                error.message.map((error) => {
                  return (
                    <div
                      key={error.messages[0].id}
                      style={{ marginBottom: 10 }}
                    >
                      <small style={{ color: "red" }}>
                        {error.messages[0].message}
                      </small>
                    </div>
                  );
                })}
              <Form>
                <fieldset disabled={loading}>
                  <FormGroup>
                    <Label>Email:</Label>
                    <Input
                      onChange={(event) => onChange(event)}
                      name="identifier"
                      style={{ height: 50, fontSize: "1.2em" }}
                    />
                  </FormGroup>
                  <FormGroup style={{ marginBottom: 30 }}>
                    <Label>Password:</Label>
                    <Input
                      onChange={(event) => onChange(event)}
                      type="password"
                      name="password"
                      style={{ height: 50, fontSize: "1.2em" }}
                    />
                  </FormGroup>

                  <FormGroup>
                    <span>
                      <a href="">
                        <small>Forgot Password?</small>
                      </a>
                    </span>
                    <Button
                      style={{ float: "right", width: 120 }}
                      color="primary"
                      onClick={() => {
                        setLoading(true);
                        console.log("data", data);
                        login(data.identifier, data.password)
                          .then((res) => {
                            setLoading(false);
                            // set authed User in global context to update header/app state
                            setUser(res.data.user);
                            console.log("setUser-data", res.data.user);
                            console.log("appContext", AppContext);
                          })
                          .catch((error) => {
                            //setError(error.response.data);
                            setLoading(false);
                          });
                      }}
                    >
                      {loading ? "Loading... " : "Submit"}
                    </Button>
                  </FormGroup>
                </fieldset>
                <section>
                  <FormGroup>
                    <Card className="my-1">
                      {Object.values(providers).map((provider) => {
                        return (
                          <Button
                            className="text-center"
                            key={provider.id}
                            outline
                            onClick={() => {
                              signIn(provider.id);
                              console.log("provider-google:", provider);
                            }}
                          >
                            Sign in with {provider.name}
                          </Button>
                        );
                      })}
                    </Card>
                  </FormGroup>
                </section>
              </Form>
            </section>
          </div>
        </Col>
      </Row>
      <style jsx>
        {`
          .paper {
            border: 1px solid lightgray;
            box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.2),
              0px 1px 1px 0px rgba(0, 0, 0, 0.14),
              0px 2px 1px -1px rgba(0, 0, 0, 0.12);
            border-radius: 6px;
            margin-top: 90px;
          }
          .notification {
            color: #ab003c;
          }
          .header {
            width: 100%;
            height: 120px;
            background-color: #2196f3;
            margin-bottom: 30px;
            border-radius-top: 6px;
          }
          .wrapper {
            padding: 10px 30px 20px 30px !important;
          }
          a {
            color: blue !important;
          }
          img {
            margin: 15px 30px 10px 50px;
          }
        `}
      </style>
    </Container>
  );
}

export default Login;
