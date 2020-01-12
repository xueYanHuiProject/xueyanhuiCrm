// http://eslint.org/docs/user-guide/configuring
module.exports = {
    root: true,
    env: {
        browser: true,
    },
    // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
    'extends': [
        'plugin:vue/essential',
        'standard'
    ],
    globals: {
        "apiData": true,
        "touch": true,
        "watermark": true,
        "Swiper":true,
        "SiriWave":true,
        "wx":true,
        "echarts":true
    },
    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',//非开发环境下禁止使用console
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',//非开发环境下禁止使用debugger
        'no-alert': process.env.NODE_ENV === 'production' ? 'error' : 'off',//非开发环境下禁止使用alert
        "no-tabs": 2,// 禁止使用tabs
        "no-useless-escape": 0,
        "no-empty": 0,// 块语句中的内容不能为空
        "no-var": 2,//使用let和const代替var
        "no-mixed-spaces-and-tabs": 2,//不允许混用tab和空格
        "no-useless-return": 0,
        "vue/no-parsing-error": [2, { "x-invalid-end-tag": false }],
        "vue/html-self-closing":0,
        "vue/no-use-v-if-with-v-for": 0
    },
    parserOptions: {
        parser: 'babel-eslint',
        ecmaFeatures: {
            'legacyDecorators': true
        }
    }
}
