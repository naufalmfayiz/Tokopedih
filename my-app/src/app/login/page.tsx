import Link from "next/link";
import Image from "next/image";
import TokopedihWithLogo from "../../../public/TokopedihWithLogo.png";
import { redirect } from "next/navigation";
import NotificationError from "@/components/NotificationError";
import { cookies } from "next/headers";
import { Suspense } from "react";
import Loader from "@/components/Loader";

async function login(formData: FormData) {
  "use server";
  const url = process.env.NEXT_PUBLIC_BASE_URL + `/api/users/login`;

  const rawFormData = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  const response = await fetch(url, {
    method: "POST",
    cache: "no-store",
    headers: {
      "Content-Type": "application/JSON",
    },
    body: JSON.stringify(rawFormData),
  });

  if (!response.ok) {
    const data = await response.json();
    redirect(`/login?error=${data.message}`);
    // throw new Error("Failed to add user");
  }

  const data = (await response.json()) as {
    access_token: string;
    email: string;
  };
  // console.log(data);
  cookies().set("Authorization", `Bearer ${data.access_token}`);
  redirect("/");
}

export default function Page() {
  return (
    <Suspense fallback={<Loader />}>
      <div className='relative flex flex-col justify-center h-[85dvh] overflow-hidden mt-10'>
        <div className='w-full p-6 m-auto rounded-lg shadow-md lg:max-w-lg bg-base-200'>
          <div className='flex justify-center mb-5 mr-5 text-center'>
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
          <h1 className='text-3xl font-semibold text-center'>Log In</h1>
          <NotificationError />
          <form className='space-y-4' action={login}>
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
              <button className='btn btn-primary w-full mt-5'>Log In</button>
            </div>
          </form>
          <div className='divider divider-primary mt-7'>OR</div>
          <p className='text-center'>
            Dont have any account ? Click{" "}
            <Link href='/register' className='underline'>
              here
            </Link>{" "}
            to register
          </p>
        </div>
      </div>
    </Suspense>
  );
}
