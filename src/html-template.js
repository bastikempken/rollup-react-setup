const makeHtmlAttributes = (attributes) => {
  if (!attributes) {
    return "";
  }
  const keys = Object.keys(attributes);
  return keys.reduce(
    (result, key) => (result += ` ${key}="${attributes[key]}"`),
    ""
  );
};

export const template = ({ attributes, bundle, files, publicPath, title }) => {
  const scripts = (files.js || [])
    .map(({ fileName }) => {
      const attrs = makeHtmlAttributes(attributes.script);
      return `<script src="${publicPath}${fileName}"></script>`;
    })
    .join("\n");

  return `
  <!doctype html>
  <html>
  <head>
    <meta charset="utf-8">
    <title>Rollup Bundle</title>
  </head>
  <body>
    <div id="root"></div>
    ${scripts}
  </body>
  </html>`;
};
