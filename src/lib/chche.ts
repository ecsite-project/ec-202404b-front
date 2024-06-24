const chache = new Map<string, string>();

export const fetchWithCache = async (
  url: string,
  init?: RequestInit
): Promise<Response> => {
  if (chache.has(url)) {
    return new Response(chache.get(url));
  }
  const response = await fetch(url, init);
  const text = await response.text();
  chache.set(url, text);
  return new Response(text);
};
