export function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export const sentenceCase = (word) => {
  return word
    .split('. ')
    .map((e) => e.charAt(0).toUpperCase() + e.substring(1).toLowerCase())
    .join('. ');
};
