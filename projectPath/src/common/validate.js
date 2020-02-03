import util from "common/util";

export default {
  nameValidate: name => {
    if (util.isEmpty(name)) return "请输入姓名";
    let Pattern = /^[a-zA-Z0-9_-]{4,16}$/;
    if (!Pattern.test(name)) return "用户名在4~16之间";
    return false;
  },
  emailValidate: email => {
    if (util.isEmpty(email)) return "请输入邮箱";
    let Pattern = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    if (!Pattern.test(email)) return "请输入正确的邮箱";
    return false;
  },
  passwordValidate: password => {
    if (util.isEmpty(password)) return "请输入密码";
    let Pattern = /^[a-zA-Z]\w{5,17}$/;
    if (!Pattern.test(password)) return "长度在6~18之间";
    return false;
  }
};
