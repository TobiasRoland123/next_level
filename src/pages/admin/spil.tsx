import { createClient } from "@supabase/supabase-js";
import { useRouter } from "next/router";

export default function Spil() {
    // COMMENT OUT FROM HERE TO DISABLE LOGIN GUARD 
  const router = useRouter();
  const supabase = createClient("https://zwcshwxjwoffkdrdvbtp.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp3Y3Nod3hqd29mZmtkcmR2YnRwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDEwNzg5NzgsImV4cCI6MjAxNjY1NDk3OH0.yq0erC0CIBZmUG9uMC8u1YVyG4g2dsf3PrpekxJDq34");
  getSession();
  async function getSession() {
    const { data, error } = await supabase.auth.getSession();
    if (data.session === null) {
      router.push("/login");
    }
  }
  // COMMENT OUT TO HERE TO DISABLE LOGIN GUARD
  return (
    <>
      <h2>Admin Spil</h2>
    </>
  );
}
