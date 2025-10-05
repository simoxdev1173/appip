import { El_Messiri } from "next/font/google";

 const elMessiri = El_Messiri({
  subsets: ["arabic", "latin"],            // include Arabic
  weight: ["400", "500", "600", "700"],    // or ["400"] etc.
  display: "swap",
  variable: "--font-el-messiri",           // exposes a CSS variable
});

export default elMessiri;