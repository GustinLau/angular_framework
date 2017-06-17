/**
 *  Json数据工具类
 *
 *
 *  @author  Gustin Lau
 *  @date    14/06/2017
 *
 */
export default class JsonUtils {
    /**
     * Json序列化
     * @param data
     * @returns {string}
     */
    static serialize(data) {
        return Object.keys(data).map((key) => {
            if (data[key] !== undefined && data[key] !== null)
                return encodeURIComponent(key) + '=' + encodeURIComponent(data[key]);
        }).join('&');
    }
}