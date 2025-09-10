/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      screens: { 
        'xs': '560px',
        'xxs': '490px',
        'xxxs': '430px'
      },
      backgroundImage:{
        'SignUpBtnBG': 'linear-gradient(10deg, #5f5e5f 1%,  #111111 99%)',
        'ExploreBoxBG': 'linear-gradient(rgb(255, 255, 255),rgb(160, 215, 198) )',
        'HeroImgSmall':'url(./Assets/Painter_back1920.jpeg)',
        'HeroImgLarge':'url(./Assets/Painter_back2880.jpeg)'
      },
      boxShadow:{
        'shadow5px': '0 0 5px',
        'shadow10px': '0 0 10px',
        'shadow20px': '0 0 20px'
      }
    },
  },
  plugins: [],
}

