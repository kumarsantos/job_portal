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

export async function updateApplications(token, { job_id }, status) {
  const supabase = await supabaseClient(token);
  const { data, error } = await supabase
    .from("applications")
    .update({ status })
    .eq("job_id", job_id)
    .select();
  if (error || data?.length === 0) {
    console.log("Error updating application status", error);
    return null;
  }
  return data;
}

export async function addNewJob(token, _, jobData) {
  const supabase = await supabaseClient(token);

  const { data, error } = await supabase.from("jobs").insert(jobData).select();
  if (error) {
    console.log("Error creating new job", error);
    return null;
  }
  return data;
}
