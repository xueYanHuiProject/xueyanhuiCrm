// 全站正则判断
export const testNum = (val) => {
  // 判断数字
  return (/^\d+$/g).test(val)
}
export const testName = (val) => {
  // 判断名字，涵盖少数民族
  return (/^[\u4e00-\u9fa5\s\.·-]{1,25}$|^[\@A-Za-z_\s\.·-]{1,50}$|^[A-Za-z\u4e00-\u9fa5]{1,20}$|^[\u4e00-\u9fa5A-Za-z]{1,20}$/).test(val)
}
export const testPhoneNum = (val) => {
  // 判断手机号 包含16、17号段
  // return (/^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/).test(val);
  return (/^1\d{10}$/).test(val)
}
// 密码中必须包含字母（不区分大小写）、数字，至少8个字符，最多30个字符；
export const testPassword = (val) => {
  const pwdRegex = new RegExp('(?=.*[0-9])(?=.*[a-zA-Z]).{8,30}')
  return pwdRegex.test(val)
}
export const testEmail = (str) => {
  const reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/
  return reg.test(str)
}
export const testID = (val) => {
  // 判断身份证
  return (/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/).test(val)
}
export const isPInt = (str) => {
  return (/^[1-9]*[1-9][0-9]*$/).test(str)
}
export const decimals = (str) => {
  return (/^\d+(\.\d+)?$/).test(str)
}
export const minus = (str) => {
  return (/^(\-|\+)?\d+(\.\d+)?$/).test(str)
}
