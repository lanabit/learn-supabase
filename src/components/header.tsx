"use client";
import useUser from "@/hooks/useUser";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { supabaseBrowser } from "@/utils/supabase/browser";
import { useQueryClient } from "@tanstack/react-query";
import { protectedPaths } from "@/utils/constants/pathname";
export default function Navbar() {
  const { isFetching, data } = useUser();
  const router = useRouter();
  const queryClient = useQueryClient();
  const pathname = usePathname();

  const handleLogout = async () => {
    const supabase = supabaseBrowser();
    queryClient.clear(); //clear cache
    await supabase.auth.signOut();

    if (protectedPaths.includes(pathname)) {
      router.replace("/auth?next=" + pathname);
    } else {
      router.refresh();
    }
  };

  const LogOutComponent = () => {
    return (
      <button
        onClick={handleLogout}
        className="bg-black text-white py-2 px-4 rounded-full"
      >
        Logout
      </button>
    );
  };

  if (isFetching) return <div>Loading...</div>;
  return (
    <div className="bg-blue-100 py-2 items-center px-32 w-full flex justify-between">
      <Link href={"/"}>
        <div className="text-2xl font-bold">Logo</div>
      </Link>
      {!data?.id ? (
        <Link href={"/auth"}>
          <button className="bg-blue-600 text-white py-2 px-4 rounded-full">
            Login
          </button>
        </Link>
      ) : data?.image_url ? (
        <div className="flex gap-3">
          <Image
            src={data.image_url}
            alt="image"
            width={50}
            height={50}
            className="rounded-full"
          ></Image>
          <LogOutComponent />
        </div>
      ) : (
        <div className="flex gap-3">
          <div className="w-16 h-16 bg-black text-white rounded-full uppercase">
            {data.email[0]}
          </div>
          <LogOutComponent />
        </div>
      )}
    </div>
  );
}
