module.exports = {
    dev: {
      proxy: {
        '*': {
          target: 'http://localhost:8080/',
          ws: true,
          changeOrigin: true
        },
      }
    }
  }