import axios from "axios";
import { load } from "cheerio";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export const key = new TextEncoder().encode(process?.env.JWT_SECRET);

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function getArticleDataByURL(url: string) {
  const resp = await axios.get(url);

  const $ = load(resp?.data);
  $("script").remove();
  $("style").remove();
  $("svg").remove();
  $("footer").remove();
  $("header").remove();
  $("aside").remove();
  $("img").remove();
  $("picture").remove();
  $("video").remove();
  $("media").remove();
  $("*").removeAttr("class");
  $("*").removeAttr("style");

  const bodyHtml = $.root().find("body");
  bodyHtml.find("img").each((_, elem) => {
    $(elem).addClass("editor-image");
  });
  return bodyHtml.html();
}

export function getSlug(str: string) {
  str = str.replace(/^\s+|\s+$/g, ""); // trim
  str = str.toLowerCase();

  // remove accents, swap ñ for n, etc
  var from = "àáäâèéëêìíïîòóöôùúüûñç·/_,:;";
  var to = "aaaaeeeeiiiioooouuuunc------";
  for (var i = 0, l = from.length; i < l; i++) {
    str = str.replace(new RegExp(from.charAt(i), "g"), to.charAt(i));
  }

  str = str
    .replace(/[^a-z0-9 -]/g, "") // remove invalid chars
    .replace(/\s+/g, "-") // collapse whitespace and replace by -
    .replace(/-+/g, "-"); // collapse dashes

  return str;
}
export async function generateFlashCards(ctx: string) {
  // const res = await fetch("http://localhost:3000/api/flashcards", {
  //   method: "POST",
  //   body: JSON.stringify({ ctx }),
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  // });
  // const resp = await res.json();
  // return resp;
  return [];
}

export const capitalizeFirstLetter = (word: string): string => {
  return `${word?.at(0)!.toUpperCase()}${word!?.slice(1).toLowerCase()}`;
};

export const getAvatarByUserInitials = (name: string) => {
  if (name.length === 0) {
    throw new Error("Name is required to create an avatar");
  }
  return `https://api.dicebear.com/9.x/initials/svg?seed=${name}&scale=100`;
};
