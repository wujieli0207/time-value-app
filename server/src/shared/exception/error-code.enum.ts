export enum ErrorCodeEnum {
  VERIFY_CODE_INVALID = '601',
  VERIFY_CODE_FAILED = '602',
  EXIST_USRE = '603',
  EMAIL_MOBILE_UNCORRECT = '604',
  LOGIN_FAILED = '605',
}

export const ErrorMessage = {
  [ErrorCodeEnum.VERIFY_CODE_INVALID]: '验证码已失效',
  [ErrorCodeEnum.VERIFY_CODE_FAILED]: '验证码发送失败',
  [ErrorCodeEnum.EXIST_USRE]: '用户已存在',
  [ErrorCodeEnum.EMAIL_MOBILE_UNCORRECT]: '邮箱或手机号不正确',
  [ErrorCodeEnum.LOGIN_FAILED]: '登录失败',
};
