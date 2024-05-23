"use client";
import { supabaseBrowser } from "@/utils/supabase/browser";
import { useQuery } from "@tanstack/react-query";

const userInit = {
  created_at: "",
  display_name: "",
  email: "",
  id: "",
  image_url: "",
};

export default function useUser() {
  return useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const supabase = supabaseBrowser();
      const { data } = await supabase.auth.getSession();
      if (data.session?.user) {
        //fetch user info if user is available
        const { data: user } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", data.session.user.id)
          .single();
        return user;
      }

      return userInit;
    },
  });
}
