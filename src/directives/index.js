//引入指令文件和服务文件，directive为指令模式文件，index.js为服务模式文件
import Focus from "./focus"

export default {
  install: (app) => {
    app.directive('focus', Focus)
  }
}
