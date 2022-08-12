const MomentLocalesPlugin = require('moment-locales-webpack-plugin');

module.exports = {
  transpileDependencies: true,
  configureWebpack: {
    devServer: {
      proxy: {
        '/beer': {
          target: 'https://api.openbrewerydb.org',
          changeOrigin: true,
          pathRewrite: {
            '/beer': ''
          }
        },
        '/olympic': {
          target: 'http://sebastianszwarc.pl:9000',
          changeOrigin: true,
          pathRewrite: {
            '/olympic': ''
          }
        },
        '/dayoff': {
          target: 'https://isdayoff.ru/api',
          pathRewrite: {
            '/dayoff': ''
          }
        },
        '/geo': {
          target: 'https://wft-geo-db.p.rapidapi.com/v1/geo',
          pathRewrite: {
            '/geo': ''
          },
          changeOrigin: false
        },
        '/suggestions': {
          target: 'https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest',
          changeOrigin: true,
          pathRewrite: {
            '/suggestions': ''
          }
        },
        '/local': {
          target: 'https://localhost:5001/',
          pathRewrite: {
            '/local': ''
          }
        }
      }
      // headers: { 'Access-Control-Allow-Origin': 'http://localhost:8082' }
    },
    plugins: [
      // To strip all locales except “en”
      new MomentLocalesPlugin(),

      // Or: To strip all locales except “en”, “es-us” and “ru”
      // (“en” is built into Moment and can’t be removed)
      new MomentLocalesPlugin({
          localesToKeep : ['ru'],
      }),
  ],
  }
}
