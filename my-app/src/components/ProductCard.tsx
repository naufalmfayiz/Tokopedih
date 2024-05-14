import { Product } from "@/db/models/products";
import WishlistIcon from "./WishlistIcon";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div>
      <div className='group relative block overflow-hidden'>
        {/* Wishlist button */}
        <WishlistIcon productId={product._id} />

        {/* Product image */}
        <a href={`/products/${product.slug}`}>
          <img
            src={product.images?.[0]}
            alt='product pic'
            className='h-64 w-full object-cover transition duration-500 group-hover:scale-105 sm:h-72'
          />

          {/* Product details */}
          <div className='relative border border-gray-100 bg-white p-6'>
            <span className='whitespace-nowrap bg-primary px-3 py-1.5 text-xs font-medium'>
              {" "}
              New{" "}
            </span>
            <h3 className='mt-4 text-lg font-medium text-gray-900'>
              {product.name}
            </h3>
            <p className='mt-3 text-sm text-gray-700'>{product.excerpt}</p>
            <p className='mt-5 text-sm text-gray-700'>${product.price}</p>

            {/* Add to cart button */}
            <form className='mt-4'>
              <button className='block w-full rounded bg-primary p-4 text-sm font-medium transition hover:scale-105'>
                Add to Cart
              </button>
            </form>
          </div>
        </a>
      </div>
    </div>
  );
}
