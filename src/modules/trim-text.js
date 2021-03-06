const trimText = (text, maxLen) => {
  const separator = ' ';
  if (text.length <= maxLen) return text;
  return `${text.substr(0, text.lastIndexOf(separator, maxLen))}..`;
};

export default trimText;
