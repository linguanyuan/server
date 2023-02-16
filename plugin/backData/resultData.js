/*
 * @Description: 这是统一返回结果（组件）
 * @Date: 2023-02-16 18:43:40
 * @Author: linguanyuan
 * @LastEditors: linguanyuan
 * @LastEditTime: 2023-02-16 18:56:21
 */
import BizResultCode from './baseResultCode.js';

class ResultData {
   
    /**
     * 返回code
     */
    code;
    /**
     * 返回消息
     */
    msg;
    /**
     * 返回数据
     */
    data;
    /**
     * 返回时间
     */
    time;

    /**
     * 
     * @param code {number} 返回code
     * @param msg {string} 返回消息
     * @param data {any} 返回具体对象
     */
    constructor(code, msg, data) {
        this.code = code;
        this.msg = msg;
        this.data = data;
        this.time = Date.now();
    }

    /**
     * 成功
     * @param data {any} 返回对象
     * @return {ResultData}
     */
    static success(data) {
        return (BizResultCode.SUCCESS.code, BizResultCode.SUCCESS.desc, data);
    }

    /**
     * 失败
     */
    static fail(errData) {
        return new ResultData(BizResultCode.FAILED.code, BizResultCode.FAILED.desc, errData);
    }

    /**
     * 参数校验失败
     */
    static validateFailed(param) {
        return new ResultData(BizResultCode.VALIDATE_FAILED.code, BizResultCode.VALIDATE_FAILED.desc, param);
    }

    /**
     * 拦截到的业务异常
     * @param bizException {BizException} 业务异常
     */
    static bizFail(bizException) {
        return new ResultData(bizException.code, bizException.msg, null);
    }

}

//导出该路由
export default ResultData;