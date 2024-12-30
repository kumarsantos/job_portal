
import { createClient } from '@supabase/supabase-js';

export const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
export const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

//without clerk
// const supabase = createClient(supabaseUrl, supabaseKey);

//only with clerk
const supabaseClient=async(supabaseAccessToken)=>{
    const supabase = createClient(supabaseUrl, supabaseKey,{
        global: {
            headers: {
                Authorization: `Bearer ${supabaseAccessToken}`,
            },
        },
    });
    return supabase;
}

export default supabaseClient
        