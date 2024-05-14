import Link from "next/link";
import Image from "next/image";
import TokopedihWithLogo from "../../../public/TokopedihWithLogo.png";
import { redirect } from "next/navigation";
import NotificationError from "@/components/NotificationError";
import { createUser } from "@/actions/Register";
import { Suspense } from "react";
import Loader from "@/components/Loader";

export default function Page() {
  return (
    <Suspense fallback={<Loader />}>
      <div className='relative flex flex-col justify-center overflow-hidden mt-6'>
        <div className='w-full p-6 m-auto rounded-lg shadow-md lg:max-w-lg bg-base-200'>
          <div className='flex justify-center mb-2 mr-5 text-center'>
            <a href='/'>
              <Image
                src={TokopedihWithLogo}
                alt='logo'
                priority
                width={300}
                height={300}
              />
            </a>
          </div>
          <h1 className='text-3xl font-semibold text-center'>Register</h1>
          <NotificationError />
          <form className='space-y-2' action={createUser}>
            <div>
              <label className='label'>
                <span className='text-base label-text'>Name</span>
              </label>
              <input
                type='text'
                placeholder='Enter Name'
                className='w-full input input-bordered input-primary'
                name='name'
              />
            </div>
            <div>
              <label className='label'>
                <span className='text-base label-text'>Username</span>
              </label>
              <input
                type='text'
                placeholder='Enter Username'
                className='w-full input input-bordered input-primary'
                name='username'
              />
            </div>
            <div>
              <label className='label'>
                <span className='text-base label-text'>Email</span>
              </label>
              <input
                type='text'
                placeholder='Enter Email'
                className='w-full input input-bordered input-primary'
                name='email'
              />
            </div>
            <div>
              <label className='label'>
                <span className='text-base label-text'>Password</span>
              </label>
              <input
                type='password'
                placeholder='Enter Password'
                className='w-full input input-bordered input-primary'
                name='password'
              />
            </div>
            <div>
              <button className='btn btn-primary w-full mt-5'>Register</button>
            </div>
          </form>
          <div className='divider divider-primary mt-7'>OR</div>
          <p className='text-center'>
            Already have an account ? Click{" "}
            <Link href='/login' className='underline'>
              here
            </Link>{" "}
            to login
          </p>
        </div>
      </div>
    </Suspense>
  );
}
