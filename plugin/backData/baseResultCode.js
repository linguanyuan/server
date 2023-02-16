/*
 * @Description: 这是返回状态页面（组件）
 * @Date: 2023-02-16 18:42:07
 * @Author: linguanyuan
 * @LastEditors: linguanyuan
 * @LastEditTime: 2023-02-16 18:42:24
 */
/**
 * @author ycx
 * @description 业务异常通用code
 *
 */
class BaseResultCode {
  /***********************************/
  /**
   * code
   */
  code;
  /**
   * 说明
   */
  desc;

  constructor(code, desc) {
    this.code = code;
    this.desc = desc;
  }

  /************************************/

  static SUCCESS = new BaseResultCode(200, "成功");
  static FAILED = new BaseResultCode(500, "失败");
  static VALIDATE_FAILED = new BaseResultCode(400, "参数校验失败");
  static API_NOT_FOUNT = new BaseResultCode(404, "接口不存在");
  static API_BUSY = new BaseResultCode(700, "操作过于频繁");
}

//导出该路由
export default BaseResultCode;
