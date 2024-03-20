/** @type {import('tailwindcss').Config} */
export default {
   darkMode: 'selector',
   content: ['./resources/**/*.edge', './resources/**/*.{js,ts,jsx,tsx,vue}'],
   theme: {
      container: {
         center: true,
      },
      screens: {
         mobile: '375px',
         desktop: '1440px',
      },
      extend: {
         colors: {
            primary: {
               brightBlue: 'hsl(220, 98%, 61%)',
               checkBackground: 'linear-gradient(hsl(192, 100%, 67%), hsl(280, 87%, 65%)',
            },
            neutral: {
               veryLightGray: 'hsl(0, 0%, 98%)',
               veryLightGrayishBlue: 'hsl(236, 33%, 92%)',
               lightGrayishBlue: 'hsl(233, 11%, 84%)',
               darkGrayishBlue: 'hsl(236, 9%, 61%)',
               veryDarkGrayishBlue: 'hsl(235, 19%, 35%)',
               veryDarkBlue: 'hsl(235, 21%, 11%)',
               veryDarkDesaturatedBlue: 'hsl(235, 24%, 19%)',
               lightGrayishBlue2: 'hsl(234, 39%, 85%)',
               darkGrayishBlue2: 'hsl(234, 11%, 52%)',
               veryDarkGrayishBlue2: 'hsl(233, 14%, 35%)',
               veryDarkGrayishBlue3: 'hsl(237, 14%, 26%)',
            },
         },
         fontSize: {
            18: '18px',
         },
         fontWeight: {
            400: 400,
            700: 700,
         },
      },
   },
   plugins: [],
}
