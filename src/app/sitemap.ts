import type { MetadataRoute } from "next";
import { getProductionSiteUrl } from "@/lib/site";

/**
 * Dynamic XML Sitemap Generator (App Router).
 * Emits canonical URLs using the environment-aware production site URL.
 * Only indexes real, canonical pages (omitting API endpoints or internal assets).
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = getProductionSiteUrl();
  const currentDate = new Date();

  return [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 1.0,
    },
  ];
}

