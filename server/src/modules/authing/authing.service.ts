import { Injectable } from '@nestjs/common';
import { AuthenticationClient, EmailScene } from 'authing-js-sdk';
import { RegisterEmailDto, RegisterMobileDto } from './dto/register.dto';
import {
  LoginEmailDto,
  LoginMobileDto,
  LogoutOutDto,
  ResetEmailDto,
  ResetMobileDto,
} from './dto/login.dto';

@Injectable()
export class AuthingService {
  private authClient: AuthenticationClient;

  private AUTHING_CLIENT_CONFIG = {
    appId: process.env.AUTHING_APP_ID,
    timeout: 10 * 1000, // 超时时间
  };

  constructor() {
    this.authClient = new AuthenticationClient(this.AUTHING_CLIENT_CONFIG);
  }

  // 邮箱注册
  async registerByEmail(registerEmailDto: RegisterEmailDto) {
    const { email, password, nickname } = registerEmailDto;
    return await this.authClient.registerByEmail(
      email,
      password,
      { nickname },
      { generateToken: true },
    );
  }

  // 手机号注册
  async registerByPhone(registerEmailDto: RegisterMobileDto) {
    const { mobile, password, code, nickname } = registerEmailDto;
    return await this.authClient.registerByPhoneCode(
      mobile,
      code,
      password,
      { nickname },
      { generateToken: true },
    );
  }

  async sendEmailCode(email: string) {
    console.log('sendEmailCode service email: ', email);
    return await this.authClient.sendEmail(
      email,
      EmailScene.REGISTER_VERIFY_CODE,
    );
  }

  // 发送手机验证码
  async sendSmsCode(mobile: string) {
    return await this.authClient.sendSmsCode(mobile);
  }

  // 邮箱登录
  async loginByEmail(loginEmailDto: LoginEmailDto) {
    const { email, password } = loginEmailDto;
    return await this.authClient.loginByEmail(email, password);
  }

  // 手机号登录
  async loginByPhone(loginEmailDto: LoginMobileDto) {
    const { mobile, password } = loginEmailDto;
    return await this.authClient.loginByPhonePassword(mobile, password);
  }

  // 手机号重制验证码
  async resetPasswordByPhoneCode(resetMobileDto: ResetMobileDto) {
    const { mobile, newPassword, code } = resetMobileDto;
    return await this.authClient.resetPasswordByPhoneCode(
      mobile,
      code,
      newPassword,
    );
  }

  // 邮箱重制验证码
  async resetPasswordByEmailCode(resetEmailDto: ResetEmailDto) {
    const { email, newPassword, code } = resetEmailDto;
    return await this.authClient.resetPasswordByEmailCode(
      email,
      code,
      newPassword,
    );
  }

  // 退出登陆
  async logout(logoutOutDto: LogoutOutDto) {
    const authClient = new AuthenticationClient({
      ...this.AUTHING_CLIENT_CONFIG,
      token: logoutOutDto.token,
    });

    return await authClient.logout();
  }
}
