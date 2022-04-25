import { useEffect } from "react";
import type { FC } from "react";
import { Helmet } from "react-helmet-async";
import { HomePage } from "../components/home";
import gtm from "../lib/gtm";

const Home: FC = () => {
  useEffect(() => {
    gtm.push({ event: "page_view" });
  }, []);

  return (
    <>
      <Helmet>
        <title>Go Wild</title>
      </Helmet>
      <div>
        <HomePage />
      </div>
    </>
  );
};

export default Home;
