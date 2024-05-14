"use client";

import { useSearchParams } from "next/navigation";

export default function NotificationError() {
  const params = useSearchParams();
  const error = params.get("error");

  return (
    error && (
      <p className='text-center text-red-500 italic font-semibold'>{error}</p>
    )
  );
}
