import { extendTheme } from "@chakra-ui/react"; //extend theme is obsolete now

const theme = extendTheme({
  config: {
    initialColorMode: "light",
    useSystemColorMode: false,
  },
});
export default theme;
