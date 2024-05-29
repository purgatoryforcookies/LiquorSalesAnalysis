import { useEffect, Dispatch, SetStateAction } from "react";

export const useClickWatcher = <T>(
  ref: React.RefObject<HTMLInputElement>,
  closingArgument: T,
  ...states: Dispatch<SetStateAction<T>>[]
) => {
  const stateCloser = () => {
    states.forEach((setState) => {
      setState(closingArgument);
    });
  };

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (
        ref.current &&
        !ref.current.contains(event.target as HTMLInputElement)
      ) {
        states.forEach((setState) => {
          setState(closingArgument);
        });
      }
    };

    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, [ref, states]);

  return { stateCloser } as const;
};
