"use client";

import { ObjectId } from "mongodb";
import Swal from "sweetalert2";

export default function WishlistButton({ productId }: { productId: ObjectId }) {
  const sendWishlist = async () => {
    try {
      const response = await fetch(
        process.env.NEXT_PUBLIC_BASE_URL + "/api/wishlist",
        {
          method: "POST",
          body: JSON.stringify({
            productId,
          }),
          cache: "no-store",
          headers: {
            "Content-Type": "application/json",
          },
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
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <button
      onClick={() => {
        // console.log(productId);
        sendWishlist();
      }}
      className='
						focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800
						text-base
						flex
						items-center
						justify-center
						leading-none
						text-white
						bg-primary
						w-full
						py-4
						hover:bg-green-700
					'
    >
      Add to Wishlist
    </button>
  );
}
