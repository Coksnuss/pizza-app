module.exports = function(value, options) {
  // options.fn(this) gibt den durch den Helper eingeschlossenen HTML Code als Zeichenkette zurÃ¼ck
  return options.fn(this).replace(new RegExp(`value="${value}"`), '$& selected');
};
