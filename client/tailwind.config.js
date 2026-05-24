export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'brand-pink': '#FF6B6B',
        'brand-purple': '#6F42C1',
        'brand-cyan': '#00D1FF',
        'brand-yellow': '#FFD166'
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(135deg, #FF6B6B 0%, #6F42C1 50%, #00D1FF 100%)'
      }
    }
  },
  plugins: []
};
