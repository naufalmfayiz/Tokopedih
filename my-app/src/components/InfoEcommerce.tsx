import Image from "next/image";
import Logo from "../../public/A-5-7-2024.png";

export default function InfoEcommerce() {
  return (
    <section className='bg-gray-900 text-white mt-10'>
      <div className='mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-screen lg:items-center'>
        <div className='mx-auto max-w-3xl text-center'>
          <Image
            src={Logo}
            alt='logo'
            priority
            width={130}
            height={130}
            className='mx-auto'
          />
          <h1 className='bg-gradient-to-r from-green-500 via-blue-500 to-purple-600 bg-clip-text text-3xl font-extrabold text-transparent sm:text-5xl'>
            Tokopedih.
            <span className='sm:block'> Shop like there is no tomorrow. </span>
          </h1>

          <p className='mx-auto mt-4 max-w-xl sm:text-xl/relaxed'>
            You have made the right choice because Tokopedih provides everything
            you need and want, just one click and you can get everything. What
            are you waiting for? lets shop like there is no tomorrow!
          </p>

          <div className='mt-8 flex flex-wrap justify-center gap-4'>
            <a
              className='block w-full rounded border border-primary bg-primary px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-white focus:outline-none focus:ring active:text-opacity-75 sm:w-auto'
              href='/'
            >
              Back to Homepage
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
