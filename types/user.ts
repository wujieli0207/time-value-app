export interface IUserInfo {
  id: string
  token: string
  email: Nullable<string>
  phone: Nullable<string> // 手机号
  nickname: string // 昵称
  photo: string // 头像
}

export interface ILoginParams {
  username: string
  password: string
}

export interface ILoginResponse extends IUserInfo {}

export interface IRegisterParams extends ILoginParams {
  code: string // 验证码
  nickname: string // 昵称
}

export interface ISendVerifyCodeParams extends Pick<ILoginParams, 'username'> {}

export interface ILogoutParams {
  token: string
}
