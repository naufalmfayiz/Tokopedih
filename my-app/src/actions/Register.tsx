"use server";

import { redirect } from "next/navigation";

export async function createUser(formData: FormData) {
  const url = process.env.NEXT_PUBLIC_BASE_URL + "/api/users/register";

  const rawFormData = {
    name: formData.get("name"),
    username: formData.get("username"),
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
    redirect(`/register?error=${data.message}`);
    // throw new Error("Failed to add user");
  }

  const data = await response.json();
  console.log(data);

  redirect("/login");
}
