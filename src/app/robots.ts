import type { MetadataRoute } from "next";
import { getProductionSiteUrl } from "@/lib/site";

/**
 * Dynamic Robots.txt Generator (App Router).
 * - Permits search engine bots to crawl public pages and required assets.
 * - Disallows internal API endpoints (/api/).
 * - Points directly to the dynamic canonical sitemap.xml.
 */
export default function robots(): MetadataRoute.Robots {
  const baseUrl = getProductionSiteUrl();

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}

