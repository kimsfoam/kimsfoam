import localFont from "next/font/local";

const pretendard = localFont({
    src: [
      {
        path: "../font/PretendardVariable.woff2",
        weight: "100 900",
        style: "normal",
      },
    ],
    variable: "--font-pretendard",
    display: "swap",
  }
);

const binggrae = localFont({
  src: [
    {
      path: "../font/BinggraeII.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../font/BinggraeII-Bold.ttf",
      weight: "700",
      style: "normal",
    }
  ],
  variable: "--font-binggrae",
  display: "swap",
})

export const fontClass = `${pretendard.variable} ${binggrae.variable}`;