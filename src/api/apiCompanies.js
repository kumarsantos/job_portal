import supabaseClient from "../utils/supabase";

export async function getCompanies(token) {
  const supabase = await supabaseClient(token);

  let query = supabase.from("companies").select("*");

  const { data, error } = await query;
  if (error) {
    console.log("Error Fetching Companies", error);
    return null;
  }
  return data;
}
export async function getSingleJob(token, { job_id }) {
  const supabase = await supabaseClient(token);

  let query = supabase
    .from("jobs")
    .select("*,company:companies(name,logo_url),applications:applications(*)")
    .eq("id", job_id)
    .single();

  const { data, error } = await query;
  if (error) {
    console.log("Error Fetching Job", error);
    return null;
  }
  return data;
}
export async function updateHiringStatus(token, { job_id }, isOpen) {
  const supabase = await supabaseClient(token);

  let query = supabase.from("jobs").update(isOpen).eq("id", job_id).select();

  const { data, error } = await query;
  if (error) {
    console.log("Error updating Job status", error);
    return null;
  }
  return data;
}
