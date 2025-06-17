export function createDebounce<T>(action: (arg: T) => void, ms = 1000) {
  let timerHandle: NodeJS.Timeout;

  function debounce(value: T) {
    clearTimeout(timerHandle);
    timerHandle = setTimeout(() => action(value), ms);
  }

  debounce.cancel = () => {
    clearTimeout(timerHandle);
  };

  return debounce;
}
