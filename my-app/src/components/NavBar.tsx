"use client";

import Image from "next/image";
import TokopedihLogo from "../../public/TokopedihWithLogo.png";
import Link from "next/link";
import { logoutAction } from "@/actions/logout";

export default function NavBar({
  authValue,
}: {
  authValue: string | undefined;
}) {
  return (
    <div className='navbar bg-base-100 sticky top-0 z-50'>
      <div className='navbar-start'>
        <div className='dropdown'>
          <div tabIndex={0} role='button' className='btn btn-ghost lg:hidden'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-5 w-5'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M4 6h16M4 12h8m-8 6h16'
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className='menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52'
          >
            <li>
              <Link href='/'>Home</Link>
            </li>
            <li>
              <Link href='/products'>Product</Link>
            </li>
            {authValue ? (
              <li>
                <Link href='/wishlist'>Wishlist</Link>
              </li>
            ) : (
              <></>
            )}
          </ul>
        </div>
        <a href='/'>
          <Image
            src={TokopedihLogo}
            alt='logo'
            priority
            width={200}
            height={200}
          />
        </a>
      </div>
      <div className='navbar-center hidden lg:flex'>
        <ul className='menu menu-horizontal px-1'>
          <li>
            <Link href='/'>Home</Link>
          </li>
          <li>
            <Link href='/products'>Product</Link>
          </li>
          {authValue ? (
            <li>
              <Link href='/wishlist'>Wishlist</Link>
            </li>
          ) : (
            <></>
          )}
        </ul>
      </div>
      <div className='navbar-end'>
        {authValue ? (
          <button
            className='btn btn-primary btn-sm'
            onClick={() => {
              logoutAction();
            }}
          >
            Logout
          </button>
        ) : (
          <>
            <a href='/login' className='btn btn-primary btn-sm mr-2'>
              Login
            </a>
            <a href='/register' className='btn btn-outline btn-primary btn-sm'>
              Register
            </a>
          </>
        )}
      </div>
    </div>
  );
}
