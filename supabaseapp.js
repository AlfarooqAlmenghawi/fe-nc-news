import supabase from "./supabaseClient.js";

const subscribeToArticles = () => {
  const subscription = supabase
    .from("articles")
    .on("*", (payload) => {
      console.log("Real-time article update:", payload);
    })
    .subscribe();
};

subscribeToArticles();
