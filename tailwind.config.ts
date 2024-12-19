import type { Config } from 'tailwindcss'

export default <Partial<Config>>{
  theme: {
    extend: {
        colors: {
          "nerdspecsred": {
            50: "#FADBE0",
            100: "#F5B7C1",
            200: "#EC6F84",
            300: "#E22242",
            400: "#9E152C",
            500: "#831124",
            600: "#680E1D",
            700: "#510B16",
            800: "#36070F",
            900: "#1B0407",
            950: "#0E0204"
          }
        }
    }
  }
}