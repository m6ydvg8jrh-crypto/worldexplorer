
import { supabase } from "./supabaseClient";

export async function testDatabase() {
  const { data, error } = await supabase
    .from("saved_countries")
    .select("*");

  if (error) {
    console.error("Supabase klaida:", error.message);
    return;
  }

  console.log("Supabase duomenys:", data);
}
