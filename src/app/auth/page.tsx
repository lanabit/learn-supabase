"use client";
// import { supabase } from "@/lib/supabase";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { supabaseBrowser } from "@/utils/supabase/browser";
export default function Login() {
  const router = useRouter();
  const params = useSearchParams();
  const next = params.get("next");
  const [userData, setUserData] = useState<{
    email: string;
    password: string;
  }>({
    email: "",
    password: "",
  });

  // const signup = async () => {
  //   try {
  //     let { data, error } = await supabase.auth.signInWithPassword({
  //       email: userData.email,
  //       password: userData.password,
  //     });

  //     console.log(data);

  //     if (data) {
  //       router.push("/");
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setUserData((prev: any) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLoginWithOAuth = async (provider: "github" | "google") => {
    const supabase = supabaseBrowser();
    supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: location.origin + "/auth/callback?next=" + next,
      },
    });
  };
  return (
    <div className="grid gap-8 mx-auto justify-center">
      <div className="grid">
        <label>Email</label>
        <input
          className="border rounded p-3"
          type="text"
          name="email"
          value={userData?.email}
          onChange={handleChange}
        />
      </div>
      <div className="grid">
        <label>Password</label>
        <input
          className="border rounded p-3"
          type="password"
          name="password"
          value={userData?.password}
          onChange={handleChange}
        />
      </div>
      <button className="p-2 rounded bg-blue-600 text-white">Signup</button>
      <button
        onClick={() => handleLoginWithOAuth("github")}
        className="p-2 rounded bg-black text-white"
      >
        Login with Github
      </button>
      <button
        onClick={() => handleLoginWithOAuth("google")}
        className="p-2 rounded bg-white border border-black"
      >
        Login with Google
      </button>
    </div>
  );
}
