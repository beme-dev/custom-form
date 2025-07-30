export const capitalize = (s: string) => {
  return s[0].toUpperCase() + s.slice(1);
};

export const logIndex = (index: number, length: number) => {
  const logLen = Math.floor(Math.log10(length));
  const logIndex = Math.floor(Math.log10(index));

  const zeroNum = Math.max(logLen - logIndex, 0);
  const zeroStr = '0'.repeat(zeroNum);

  return `${zeroStr}${index}`; // +1 pour l'indexation humaine
};
