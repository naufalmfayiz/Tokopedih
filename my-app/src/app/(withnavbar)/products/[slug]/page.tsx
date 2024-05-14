import React, { useState } from "react";
import type { Metadata, ResolvingMetadata } from "next";
import { Product } from "@/db/models/products";
import WishlistButton from "@/components/WishlistButton";

type Props = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const slug = params.slug;

  // fetch data
  const product = (await fetch(
    process.env.NEXT_PUBLIC_BASE_URL + `/api/products/${slug}`
  ).then((res) => res.json())) as Product;

  return {
    title: product.name,
    description: product.description,
  };
}

async function getData(slug: string): Promise<Product> {
  const res = await fetch(
    process.env.NEXT_PUBLIC_BASE_URL + `/api/products/${slug}`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default async function Page({ params }: Props) {
  const slug = params.slug;
  const data = await getData(slug);
  // console.log(data);
  return (
    <div className='md:flex items-start justify-center py-12 2xl:px-20 md:px-6 px-4'>
      <div className='xl:w-2/6 lg:w-2/5 w-80 md:block hidden'>
        <img className='w-full' alt='product pic' src={data.images?.[0]} />
        <img className='mt-6 w-full' alt='product pic' src={data.images?.[1]} />
      </div>
      <div className='md:hidden'>
        <img
          className='w-full'
          alt='img of a girl posing'
          src={data.images?.[0]}
        />
        <div className='flex items-center justify-between mt-3 space-x-4 md:space-x-0'>
          <img
            alt='img-tag-one'
            className='md:w-48 md:h-48 w-full'
            src={data.images?.[1]}
          />
        </div>
      </div>
      <div className='xl:w-2/5 md:w-1/2 lg:ml-8 md:ml-6 md:mt-0 mt-6'>
        <div className='border-b border-gray-200 pb-6'>
          <h1
            className='
							lg:text-2xl
							text-xl
							font-semibold
							lg:leading-6
							leading-7
							text-gray-800
							mt-2
						'
          >
            {data.name}
          </h1>
        </div>
        <div className='py-4 border-b border-gray-200 flex items-center justify-between'>
          <p className='text-base leading-4 text-gray-800'>Price</p>
          <div className='flex items-center justify-center'>
            <p className='text-sm leading-none text-gray-600'>$ {data.price}</p>
          </div>
        </div>
        <div className='py-4 border-b border-gray-200 flex items-center justify-between'>
          <p className='text-base leading-4 text-gray-800'>Tags</p>
          <div className='flex items-center justify-center'>
            <p className='text-sm leading-none text-gray-600 mr-3'>
              {data.tags?.join(", ")}
            </p>
          </div>
        </div>
        <WishlistButton productId={data._id} />
        <div>
          <p className='text-base leading-4 mt-7 text-gray-600'>
            {data.excerpt}
          </p>
          <p className='xl:pr-48 text-base lg:leading-tight leading-normal text-gray-600 mt-7'>
            {data.description}
          </p>
        </div>
        <div>
          <div className='border-t border-b py-4 mt-7 border-gray-200'>
            <div className='flex justify-between items-center cursor-pointer'>
              <p className='text-base leading-4 text-gray-800'>
                Shipping and returns
              </p>
              <button
                className='
									cursor-pointer
									focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400
									rounded
								'
                aria-label='show or hide'
              >
                <svg
                  className=''
                  width='10'
                  height='6'
                  viewBox='0 0 10 6'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M9 1L5 5L1 1'
                    stroke='#4B5563'
                    strokeWidth='1.25'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                </svg>
              </button>
            </div>
            <div
              className='pt-4 text-base leading-normal pr-12 mt-4 text-gray-600 '
              id='sect'
            >
              You will be responsible for paying for your own shipping costs for
              returning your item. Shipping costs are nonrefundable
            </div>
          </div>
        </div>
        <div>
          <div className='border-b py-4 border-gray-200'>
            <div className='flex justify-between items-center cursor-pointer'>
              <p className='text-base leading-4 text-gray-800'>Contact us</p>
              <button
                className='
									cursor-pointer
									focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400
									rounded
								'
                aria-label='show or hide'
              >
                <svg
                  className=''
                  width='10'
                  height='6'
                  viewBox='0 0 10 6'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M9 1L5 5L1 1'
                    stroke='#4B5563'
                    strokeWidth='1.25'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                </svg>
              </button>
            </div>
            <div
              className='pt-4 text-base leading-normal pr-12 mt-4 text-gray-600 '
              id='sect'
            >
              If you have any questions on how to return your item to us,
              contact us.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
