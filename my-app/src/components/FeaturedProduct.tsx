import { Product } from "@/db/models/products";

async function getData(): Promise<Product[]> {
  const res = await fetch(process.env.NEXT_PUBLIC_BASE_URL + "/api/products", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default async function FeaturedProduct() {
  const data = (await getData()).slice(0, 5);
  // console.log(data.length);
  return (
    <div>
      <div className='flex flex-row justify-between items-center mt-10'>
        <h1 className='text-2xl font-bold ms-6'>Featured Products</h1>
        <a
          href='/products'
          className='mr-6 text-xl text-blue-800 hover:text-green-500'
        >
          See all...
        </a>
      </div>
      <div className='flex overflow-x-auto p-1 mx-1'>
        {data.map((product) => (
          <div
            key={product.slug}
            className='w-full md:w-1/2 lg:w-1/3 xl:w-1/6 p-4 mr-5'
          >
            <a href={`/products/${product.slug}`}>
              <div className='bg-gray-200 rounded-lg overflow-hidden shadow-md'>
                <img
                  src={product.thumbnail}
                  alt='Product'
                  height={200}
                  width={200}
                />
                <div className='p-6'>
                  <h3 className='text-xl font-bold mb-2'>{product.name}</h3>
                  <p className='text-base text-gray-600 mb-4'>
                    {product.excerpt}
                  </p>
                  <p className='text-xl font-bold text-green-500'>
                    ${product.price}
                  </p>
                </div>
              </div>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
