import { DefaultSeoProps } from "next-seo";

const defaultSEO: DefaultSeoProps = {
  title: "Next.js Template",
  description: "A production-ready Next.js template with best practices.",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://yourdomain.com/",
    site_name: "Next.js Template",
  },
  twitter: {
    handle: "@yourhandle",
    site: "@yourhandle",
    cardType: "summary_large_image",
  },
};

export default defaultSEO;

// Usages Default One
// import { DefaultSeo } from "next-seo";
// import SEO from "@/lib/seo/next-seo.config";

// export default function RootLayout({ children }: { children: React.ReactNode }) {
//   return (
//     <html lang="en">
//       <body>
//         <DefaultSeo {...SEO} />
//         {children}
//       </body>
//     </html>
//   );
// }

// Usage Override
// import { NextSeo } from "next-seo";

// export default function AboutPage() {
//   return (
//     <>
//       <NextSeo title="About Us" description="Learn more about our company" />
//       <h1>About Page</h1>
//     </>
//   );
// }
