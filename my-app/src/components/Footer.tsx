import Image from "next/image";
import Tokopedih from "../../public/Tokopedih-5-7-2024.png";

export default function Footer() {
  return (
    <footer className='bg-gray-50'>
      <div className='mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-2'>
        <div className='sm:flex sm:items-center sm:justify-between'>
          <div className='flex justify-center text-teal-600 sm:justify-start'>
            <Image
              src={Tokopedih}
              alt='logo'
              priority
              width={100}
              height={100}
            />
          </div>

          <p className='mt-4 text-center text-sm text-gray-500 lg:mt-0 lg:text-right'>
            Copyright &copy; {new Date().getFullYear()}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
