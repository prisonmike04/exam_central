module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      keyframes: {
        'fade-in': {
          '0%': { opacity: 0, transform: 'translateY(10px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        colors: {
          'white/10': 'rgba(255, 255, 255, 0.1)',
        },
      },
      animation: {
        'fade-in': 'fade-in 0.5s ease-out',
      },
    },
  },
  plugins: [],
};
