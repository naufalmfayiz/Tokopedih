export default function Banner() {
  return (
    <section className='relative bg-[url(https://www.volusion.com/blog/content/images/2021/09/Product-Photography.jpeg)] bg-cover bg-center bg-no-repeat'>
      <div className='absolute inset-0 bg-white/75 sm:bg-transparent sm:from-white/95 sm:to-white/25 ltr:sm:bg-gradient-to-r rtl:sm:bg-gradient-to-l'></div>

      <div className='relative mx-auto max-w-screen-xl px-4 py-32 sm:px-6 lg:flex lg:h-screen lg:items-center lg:px-8'>
        <div className='max-w-xl text-left ltr:sm:text-left rtl:sm:text-right py-5'>
          <h1 className='text-3xl font-extrabold sm:text-5xl'>
            Get the latest item
            <strong className='block font-extrabold text-primary'>
              {" "}
              With Style.{" "}
            </strong>
          </h1>

          <p className='mt-4 max-w-lg sm:text-xl/relaxed text-black'>
            New arrivals item here, check it out while they are still in stock
          </p>

          <div className='mt-8 flex flex-wrap gap-4 text-center'>
            <a
              href='/products'
              className='block w-full rounded bg-primary px-12 py-3 text-sm font-medium text-white shadow hover:bg-green-700 focus:outline-none focus:ring active:bg-green-500 sm:w-auto'
            >
              Shop New Arrivals
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
