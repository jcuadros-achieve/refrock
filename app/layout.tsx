import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ReferralRock POC - Query Parameters Viewer",
  description: "POC to integrate ReferralRock - View all received query parameters",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Script
          id="referralrock-script"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.referralJS = ((window.referralJS !== null && window.referralJS !== undefined) ? window.referralJS : {});
              window.referralJS.scriptConfig = {
                parameters: {
                  src: "//achieveb02d1.referralrock.com/ReferralSdk/referral.js",
                  transactionKey: "6f91099b-a686-4321-9caa-058b76c0b5ad"
                }
              };
              (function(f,r,n,d,b,y){
                b=f.createElement(r),y=f.getElementsByTagName(r)[0];
                b.async=1;
                b.src=n+"?referrer="+encodeURIComponent(window.location.origin+window.location.pathname).replace(/[!'()*]/g,escape);
                b.id="RR_DIVID_V5";
                b.setAttribute("transactionKey",window.referralJS.scriptConfig.parameters.transactionKey);
                y.parentNode.insertBefore(b,y)
              })(document,"script",window.referralJS.scriptConfig.parameters.src);
            `,
          }}
        />
        {children}
      </body>
    </html>
  );
}
