import localFont from "next/font/local";
import { Inter } from "next/font/google";

export const spaceArmor = localFont({
  src: "./space_armor_regular.otf",
  display: "swap",
});

export const moonhouse = localFont({
  src: "./moonhouse_regular.ttf",
  display: "swap",
});

export const mandalore = localFont({
  src: "./mandalore_regular.otf",
  display: "swap",
});

export const soloist = localFont({
    src: "./soloist_regular.otf",
    display: "swap",
  });

  export const soloistOutline = localFont({
    src: "./soloist_outline.otf",
    display: "swap",
  });

export const inter = Inter({ subsets: ["latin"] });
