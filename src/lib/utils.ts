import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateRandomId(length: number): string {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let randomId = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomId += characters.charAt(randomIndex);
  }
  return randomId;
}

export function cleanImageUrls(images: string[]): string[] {
  let combinedString = images.join("");

  combinedString = combinedString.replace(/^\[|\]$/g, "");
  let cleanedUrls = combinedString.split('"');

  cleanedUrls = cleanedUrls.map((url) => url.replace(/\"/g, "").trim()).filter((val) => val);

  return cleanedUrls;
}
