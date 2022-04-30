import Head from "next/head";
import styles from "../../styles/Home.module.css";
import Link from "next/Link";

export default function Home() {
  const restaurants = [
    { name: "WoodsHill" },
    { name: "Fiorellas" },
    { name: "Karma" },
  ];
  return (
    <>
      <h1>Restaurant List😎 </h1>
      {restaurants.map((item, index) => {
        return (
          <div key={index}>
            <Link
              as={"/restaurants/" + item.name}
              href="restaurants/[restaurant]"
            >
              <a>{item.name}</a>
            </Link>
          </div>
        );
      })}
    </>
  );
}
