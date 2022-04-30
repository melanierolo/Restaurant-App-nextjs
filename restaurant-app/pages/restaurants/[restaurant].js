import { useRouter } from "next/router";
import Head from "next/head";
import styles from "../../styles/Home.module.css";

export default function Restaurant() {
  const router = useRouter();
  return (
    <>
      <h1>Dynamic Restaurant Top Page 🙂 {router.query.restaurant}!!</h1>
    </>
  );
}

/*A-1 Dynamic Restaurant
  {router.query."it's going be the name of that file in square brackets"}
*/
