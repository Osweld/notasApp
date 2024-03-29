module.exports = {
    prefix: '',
    purge: {
      content: [
        './src/**/*.{html,ts}',
      ]
    },
    darkMode: 'class', // or 'media' or 'class'
    theme: {
      extend: {},
    },
    variants: {
      extend: {
        opacity: ['disabled'],
        backgroundColor: ['disabled'],
        backgroundColor: ['checked'],
        borderColor: ['checked'],
      },
    },
    plugins: [],
};