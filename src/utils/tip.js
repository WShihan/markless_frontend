import { ElMessage } from "element-plus"
import { ElNotification } from "element-plus";

/**;

/**
 * @description 提示枚举类
 * @export
 * @class PopTip
 */
export class PopTip {
  static success(msg) {
    ElMessage({
      message: msg,
      type: "success",
    });
  }
  static info(msg) {
    ElMessage({
      message: msg,
      type: "info",
    });
  }
  static warning(msg) {
    ElMessage({
      message: msg,
      type: "warning",
    });
  }
  static error(msg) {
    return ElMessage({
      message: msg,
      type: "error",
    });
  }
}

/**
 * @description 通知类
 * @export
 * @class Notification
 */
export class Notification {
  static success(msg) {
    return ElNotification({
      message: msg,
      type: "success",
    });
  }
  static info(msg) {
    return ElNotification({
      message: msg,
      type: "info",
    });
  }
  static warning(msg) {
    return ElNotification({
      message: msg,
      type: "warning",
    });
  }
  static error(msg) {
    return ElNotification({
      message: msg,
      type: "error",
    });
  }
}
