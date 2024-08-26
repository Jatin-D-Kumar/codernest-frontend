import { useMediaQuery, useTheme } from "@mui/material";

/**
 * This hook is intended to replace deprecated `withWidth()`
 * Be careful using this hook. It only works because the number of
 * breakpoints in theme is static. It will break once you change the number of
 * breakpoints. See https://reactjs.org/docs/hooks-rules.html#only-call-hooks-at-the-top-level
 */
const useWidth = () => {
  const theme = useTheme();
  const keys = [...theme.breakpoints.keys].reverse();
  return (
    keys.reduce((output, key): any => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const matches = useMediaQuery(theme.breakpoints.up(key), { noSsr: true });
      return !output && matches ? key : output;
    }, null) || "xs"
  );
};

export default useWidth;
