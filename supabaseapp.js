import supabase from "./supabaseClient.js";

const subscribeToArticles = () => {
  const subscription = supabase
    .from("articles")
    .on("*", (payload) => {})
    .subscribe();
};

subscribeToArticles();
