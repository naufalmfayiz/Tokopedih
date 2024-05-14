import NavBar from "@/components/NavBar";
import Banner from "@/components/Banner";
import FeaturedProduct from "@/components/FeaturedProduct";
import InfoEcommerce from "@/components/InfoEcommerce";
import { cookies } from "next/headers";

export default function Home() {
  const authorization = cookies().get("Authorization");
  const authValue = authorization?.value;
  // console.log(authValue);

  return (
    <>
      <NavBar authValue={authValue} />
      <Banner />
      {/* Featured Prodcut */}
      <FeaturedProduct />
      {/* Detail Info Ecommerce */}
      <InfoEcommerce />
    </>
  );
}
