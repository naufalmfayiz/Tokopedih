"use client";

import { Dispatch, FormEvent, SetStateAction } from "react";

export default function SearchBar({
  search,
  setSearch,
  getData,
  setHasMore,
  setCurrentPage,
}: {
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
  getData: () => Promise<void>;
  setHasMore: Dispatch<SetStateAction<boolean>>;
  setCurrentPage: Dispatch<SetStateAction<number>>;
}) {
  const handleSearch = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setHasMore(true);
    setCurrentPage(2);
    getData();
  };

  return (
    <form className='max-w-md mx-auto mt-5' onSubmit={handleSearch}>
      <label
        htmlFor='default-search'
        className='mb-2 text-sm font-medium text-gray-500 sr-only'
      >
        Search
      </label>
      <div className='relative'>
        <div className='absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none'>
          <svg
            className='w-4 h-4 text-gray-500 '
            aria-hidden='true'
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 20 20'
          >
            <path
              stroke='currentColor'
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z'
            />
          </svg>
        </div>
        <input
          type='search'
          id='default-search'
          className='block w-full p-4 ps-10 text-sm text-gray-600 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500'
          placeholder='Search product...'
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />
        <button
          type='submit'
          className='text-white absolute end-2.5 bottom-2.5 bg-primary hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2'
        >
          Search
        </button>
      </div>
    </form>
  );
}
