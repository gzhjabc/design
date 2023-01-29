// 加载插件
import { Cloud } from'laf-client-sdk'

// 初始化插件，暴露出去
export const cloud = new Cloud({
    baseUrl: 'https://bx5oq8.lafyun.com:443',

    dbProxyUrl: '/proxy/index',
});