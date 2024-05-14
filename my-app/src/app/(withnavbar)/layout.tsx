import NavBar from "../../components/NavBar";
import { cookies } from "next/headers";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const authorization = cookies().get("Authorization");
  const authValue = authorization?.value;
  return (
    <>
      <NavBar authValue={authValue} />
      <div>{children}</div>
    </>
  );
}
