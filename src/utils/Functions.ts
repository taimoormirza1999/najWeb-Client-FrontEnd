export function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export const sentenceCase = (word) => {
  return word
    .split('. ')
    .map((e) => e.charAt(0).toUpperCase() + e.substring(1).toLowerCase())
    .join('. ');
};

export const isParentMenuActive = (menu, pathName) => {
  return menu.children.some((subItem) => subItem.href === pathName);
};
