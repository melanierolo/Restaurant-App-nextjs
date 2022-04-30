import { Button, Alert } from "reactstrap";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <>
      <div>
        <div>
          <Alert color="primary">
            Hello Project is strapi-next with Bootstrap
          </Alert>
          &nbsp; <Button color="primary">Hello from nextjs</Button>
        </div>
      </div>
      <h1>Hello world 🙂!! </h1>
    </>
  );
}
