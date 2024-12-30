/** @format */

import supabaseClient from "../utils/supabase";

export async function getJobs(token, { location, company_id, searchQuery }) {
  const supabase = await supabaseClient(token);
  let query = supabase
    .from("jobs")
    .select("*, company:companies(name,logo_url),saved:saved_jobs(id)");
  if (location) {
    query.eq("location", location);
  }
  if (company_id) {
    query.eq("company_id", company_id);
  }
  if (searchQuery) {
    query.ilike("title", `%${searchQuery}%`);
  }

  const { data, error } = await query;
  if (error) {
    console.log(error);
    return null;
  }
  return data;
}

export async function saveJob(token, { already_saved }, saveData) {
  const supabase = await supabaseClient(token);

  if (already_saved) {
    let { data, error: deleteError } = await supabase
      .from("saved_jobs")
      .delete()
      .eq("job_id", saveData?.job_id);

    if (deleteError) {
      console.log("Error Deleting saved job", deleteError);
      return null;
    }
    return data;
  } else {
    let { data, error: insertError } = await supabase
      .from("saved_jobs")
      .insert([saveData])
      .select();
    if (insertError) {
      console.log("Error Inserting saved job", insertError);

      return null;
    }
    return data;
  }
}