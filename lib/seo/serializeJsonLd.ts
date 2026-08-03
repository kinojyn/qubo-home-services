export function serializeJsonLd(data: unknown) {
  return JSON.stringify(data).replace(/[<>&\u2028\u2029]/g, (character) => {
    const replacements: Record<string, string> = {
      "&": "\\u0026",
      "<": "\\u003c",
      ">": "\\u003e",
      "\u2028": "\\u2028",
      "\u2029": "\\u2029",
    };
    return replacements[character];
  });
}
