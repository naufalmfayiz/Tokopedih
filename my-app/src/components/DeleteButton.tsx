"use client";

import { ObjectId } from "mongodb";
import { useEffect } from "react";

import Swal from "sweetalert2";

export default function DeleteButton({
  id,
  getWishlist,
}: {
  id: string | ObjectId | undefined;
  getWishlist: () => Promise<void>;
}) {
  // const router = useRouter();

  const deleteWishlist = async () => {
    const response = await fetch(
      process.env.NEXT_PUBLIC_BASE_URL + "/api/wishlist",
      {
        method: "DELETE",
        cache: "no-store",
        headers: {
          "Content-Type": "application/JSON",
        },
        body: JSON.stringify({ id }),
      }
    );

    if (!response.ok) {
      const { message } = await response.json();
      // console.log(message);
      Swal.fire({
        title: "Error!",
        text: message,
        icon: "error",
        confirmButtonText: "Cool",
      });
    }

    const { message } = await response.json();
    // console.log(message);
    Swal.fire({
      title: "Success!",
      text: message,
      icon: "success",
      confirmButtonText: "Cool",
    });
    getWishlist();
  };

  // useEffect(() => {
  //   getWishlist();
  // }, []);

  return (
    <button
      onClick={() => {
        deleteWishlist();
      }}
      className='btn bg-red-600 btn-xs text-white hover:bg-red-800'
    >
      remove
    </button>
  );
}
