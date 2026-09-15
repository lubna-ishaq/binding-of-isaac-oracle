const WIKI_BASE_URL = "https://bindingofisaacrebirth.wiki.gg";

// imageSource from the scraper looks like "/images/...", so the wiki domain
// has to go in front. If there is no imageSource, use the local image path.
export function getItemImageUrl(item) {
  if (!item) {
    return "";
  }

  if (!item.imageSource) {
    return item.image ?? "";
  }

  if (item.imageSource.startsWith("//")) {
    return `https:${item.imageSource}`;
  }

  return item.imageSource.startsWith("/")
    ? `${WIKI_BASE_URL}${item.imageSource}`
    : item.imageSource;
}
