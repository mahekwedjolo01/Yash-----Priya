export function blankLocation() {
  return {
    enabled: false,
    mode: "button",
    linkUrl: "",
    buttonLabel: "View Location",
    embedUrl: "",
  };
}

function httpsUrl(value) {
  try {
    const url = new URL(value);
    return url.protocol === "https:" ? url : null;
  } catch {
    return null;
  }
}

export function embedUrlFromInput(value) {
  const input = String(value ?? "").trim();
  if (!input.startsWith("<")) return input;

  const match = input.match(/<iframe\b[^>]*\bsrc\s*=\s*(["'])(.*?)\1/i);
  return match ? match[2].replaceAll("&amp;", "&") : input;
}

function isGeneralSearch(url) {
  const googleHost = url.hostname === "google.com" || url.hostname.endsWith(".google.com");
  if (!googleHost || !url.pathname.startsWith("/maps/search")) {
    return false;
  }

  const query = url.searchParams.get("query") ?? "";
  const coordinates = /^-?\d+(?:\.\d+)?,\s*-?\d+(?:\.\d+)?$/.test(query);
  return !url.searchParams.has("query_place_id") && !coordinates;
}

export function locationErrors(location) {
  if (!location?.enabled) return {};

  if (location.mode === "button") {
    const errors = {};
    const url = httpsUrl(location.linkUrl);
    if (!url) {
      errors.linkUrl = "Enter a complete HTTPS map or directions link.";
    } else if (isGeneralSearch(url)) {
      errors.linkUrl = "This opens search results. Open the exact place or drop a pin, then copy its Share link.";
    }
    if (!String(location.buttonLabel ?? "").trim()) {
      errors.buttonLabel = "Enter text for the location button.";
    }
    return errors;
  }

  if (location.mode === "map") {
    const url = httpsUrl(embedUrlFromInput(location.embedUrl));
    const googleHost = url && (url.hostname === "google.com" || url.hostname.endsWith(".google.com"));
    return googleHost && url.pathname.startsWith("/maps/embed")
      ? {}
      : { embedUrl: "Paste the HTTPS src URL from Google Maps > Share > Embed a map." };
  }

  return { mode: "Choose a location display option." };
}

export function locationPresentation(location) {
  if (!location?.enabled || Object.keys(locationErrors(location)).length) return null;

  return location.mode === "button"
    ? { mode: "button", url: location.linkUrl.trim(), label: String(location.buttonLabel).trim() }
    : { mode: "map", url: embedUrlFromInput(location.embedUrl) };
}

export function firstInvalidEventLocation(events) {
  return events.find((event) => event.enabled && Object.keys(locationErrors(event.location)).length);
}
