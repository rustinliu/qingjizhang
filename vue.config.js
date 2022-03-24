const path = require('path');
const Plugin = require('svg-sprite-loader/plugin');

module.exports = {
    publicPath: process.env.NODE_ENV === 'production' ? '/qingjizhang-website/' : '/',
    lintOnSave: false,
    chainWebpack: (config) => {
        const dir = path.resolve(__dirname, 'src/assets/icons');

        config.module
            .rule('svg-sprite')
            .test(/\.svg$/)
            .include.add(dir)
            .end() // 包含icons目录
            .use('svg-sprite-loader')
            .loader('svg-sprite-loader')
            .options({ extract: false })
            .end();
        config.plugin('svg-sprite').use(Plugin, [{ plainSprite: true }]);
        config.module.rule('svg').exclude.add(dir); // 其他 svg loader 排除 icons目录
    },
    pwa: {
        iconPaths: {
            favicon32: './public/favicon.png',
            favicon16: './public/favicon.png',
            appleTouchIcon: './public/favicon.png',
            maskIcon: './public/favicon.png',
            msTileImage: './public/favicon.png',
        },
    },
};
