const path = require('path');

module.exports = {
  // Otras configuraciones...
  resolve: {
    alias: {
      '@components': path.resolve(__dirname, 'src/components'),
      '@services': path.resolve(__dirname, 'src/services'),
      '@utils': path.resolve(__dirname, 'src/Utils'),
      // Agrega más alias según sea necesario
    },
  },
};
