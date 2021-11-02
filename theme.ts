import { extendTheme } from '@chakra-ui/react'
// import { mode } from "@chakra-ui/theme-tools"

const config = {
  initialColorMode: 'light',
  useSystemColorMode: false,
  colors: {
    brand: {
      50: '#F0FFF4',
      100: '#C6F6D5',
      200: '#9AE6B4',
      300: '#68D391',
      400: '#48BB78',
      500: '#38A169',
      600: '#2F855A',
      700: '#276749',
      800: '#22543D',
      900: '#1C4532',
    },
  },
  // styles: {
  //   global: (props: any) => ({
  //     body: {
  //       fontFamily: "body",
  //       color: mode("gray.800", "whiteAlpha.900")(props),
  //       bg: mode("green.600", "green.800")(props),
  //       lineHeight: "base",
  //     },
  //   }),
  // },
}
const theme = extendTheme(config)
export default theme
