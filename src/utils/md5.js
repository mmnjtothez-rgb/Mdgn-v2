// Lightweight MD5 implementation compatible with Vite builds
export function md5(str) {
  return crypto.subtle.digest("MD5", new TextEncoder().encode(str))
    .then(buf => {
      return Array.from(new Uint8Array(buf))
        .map(x => x.toString(16).padStart(2, "0"))
        .join("");
    });
}
