"use client";

import Loader from "@/components/Loader";
import ProductCard from "@/components/ProductCard";
import SearchBar from "@/components/SearchBar";
import { Product } from "@/db/models/products";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

export default function Page() {
  const [items, setItems] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [currentPage, setCurrentPage] = useState(2);
  const [search, setSearch] = useState("");

  async function getData() {
    // console.log(currentPage);
    // console.log(hasMore);
    const res = await fetch(
      process.env.NEXT_PUBLIC_BASE_URL +
        `/api/pagination?searchQuery=${search}&pageNumber=1`,
      {
        cache: "no-store",
      }
    );
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
    const { page, totalData, totalPage, dataPerPage, data } = await res.json();
    setItems(data);
  }

  useEffect(() => {
    getData();
  }, []);

  // console.log(search, "<<<<<");

  async function fetchProduct() {
    // console.log(hasMore);
    // console.log(currentPage);
    const res = await fetch(
      process.env.NEXT_PUBLIC_BASE_URL +
        `/api/pagination?searchQuery=${search}&pageNumber=${currentPage}`,
      {
        cache: "no-store",
      }
    );
    const { data } = await res.json();
    return data;
  }

  const fetchData = async () => {
    const moreProduct: never[] = await fetchProduct();

    setItems([...items, ...moreProduct]);

    if (moreProduct.length === 0 || moreProduct.length < 8) {
      setHasMore(false);
    }

    setCurrentPage(currentPage + 1);
  };

  return (
    <>
      {/* Search component */}
      <SearchBar
        search={search}
        setSearch={setSearch}
        getData={getData}
        setHasMore={setHasMore}
        setCurrentPage={setCurrentPage}
      />

      <h1 className='mb-5 mt-2 ms-5 text-2xl font-bold'>New Arrival</h1>

      {/* INFINITE SCROLL */}
      <InfiniteScroll
        dataLength={items.length} //This is important field to render the next data
        next={fetchData}
        hasMore={hasMore}
        loader={<Loader />}
        endMessage={
          <p className='text-center'>
            <b>That is all we got for now!</b>
          </p>
        }
      >
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mx-3'>
          {items.map((product: Product, i: number) => (
            <ProductCard product={product} key={product.slug} />
          ))}
        </div>
      </InfiniteScroll>
    </>
  );
}
