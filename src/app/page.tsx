"use client";
import Image from "next/image";
import Link from "next/link";
// import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  // const logout = async () => {
  //   try {
  //     let { error } = await supabase.auth.signOut();
  //     console.log("Logged out");
  //     router.push("/login");
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  return (
    <>
      <div className="flex justify-center">Welcome to the Wild Web</div>

      <div className="flex gap-8 justify-center">
        <Link href={"/dashboard"}>
          <div className="p-2 px-5 rounded-full border border-blue-600">
            Dashboard
          </div>
        </Link>
        <Link href={"/profile"}>
          <div className="p-2 px-5 rounded-full border border-blue-600">
            Profile
          </div>
        </Link>
      </div>
    </>
  );
}
