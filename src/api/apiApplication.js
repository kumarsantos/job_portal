/** @format */

import supabaseClient, { supabaseUrl } from "../utils/supabase";

export async function applyToJob(token, _, jobData) {
  const supabase = await supabaseClient(token);

  const random = Math.floor(Math.random() * 900000);
  const fileName = `resume-${random}-${jobData.candidate_id}`;

  const { error: storageError } = await supabase.storage
    .from("resumes")
    .upload(fileName, jobData?.resume);

  if (storageError) {
    console.log("Error During Upload Resume", storageError);
    return null;
  }

  const resumeUrl = `${supabaseUrl}/storage/v1/object/public/resumes/${fileName}`;

  let query = supabase
    .from("applications")
    .insert([
      {
        ...jobData,
        resume: resumeUrl,
      },
    ])
    .select();

  const { data, error } = await query;
  if (error) {
    console.log("Error Inserting Application", error);
    return null;
  }
  return data;
}
