"use client";

import TableRow from "@/components/TableRow";
import { Wishlist } from "@/db/models/wishlist";
import { useEffect, useState } from "react";
import Loading from "../loading";

export default function Page() {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);

  async function getWishlist() {
    try {
      const res = await fetch(
        process.env.NEXT_PUBLIC_BASE_URL + "/api/wishlist",
        {
          cache: "no-store",
        }
      );

      if (!res.ok) {
        throw new Error("Failed to fetch data");
      }

      setWishlist(await res.json());
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getWishlist();
  }, []);

  return loading ? (
    <Loading />
  ) : (
    <div className='overflow-x-auto mt-5 mx-5'>
      <h1 className='text-2xl font-bold text-center'>My Wishlist</h1>
      <table className='table'>
        {/* head */}
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Price($)</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {/* row  */}
          {wishlist.map((row: Wishlist, i) => (
            <TableRow row={row} key={i} getWishlist={getWishlist} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
