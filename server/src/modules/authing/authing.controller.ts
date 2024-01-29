import { Controller, Post, Body } from '@nestjs/common';
import { AuthingService } from './authing.service';
import { RegisterDto, SendVerifyCodeDto } from './dto/register.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { LoginDto, LogoutOutDto } from './dto/login.dto';
import { isEmail, isMobilePhone } from 'validator';
import { CustomHttpException, ErrorCodeEnum } from '@/shared/exception';

@Controller('authing')
@ApiTags('认证')
export class AuthingController {
  constructor(private readonly authingService: AuthingService) {}

  @Post('/register')
  @ApiOperation({ summary: '注册' })
  register(@Body() registerDto: RegisterDto) {
    const { username, password, nickname, code } = registerDto;

    if (isEmail(username)) {
      return this.authingService.registerByEmail({
        email: username,
        password,
        nickname,
      });
    }

    if (isMobilePhone(username)) {
      return this.authingService.registerByPhone({
        mobile: username,
        password,
        code,
        nickname,
      });
    }

    throw new CustomHttpException(ErrorCodeEnum.EMAIL_MOBILE_UNCORRECT);
  }

  @Post('/login')
  @ApiOperation({ summary: '登陆' })
  login(@Body() loginDto: LoginDto) {
    const { username, password } = loginDto;

    if (isEmail(username)) {
      return this.authingService.loginByEmail({
        email: username,
        password,
      });
    }

    if (isMobilePhone(username)) {
      return this.authingService.loginByPhone({
        mobile: username,
        password,
      });
    }

    throw new CustomHttpException(ErrorCodeEnum.LOGIN_FAILED);
  }

  @Post('/sendVerifyCode')
  @ApiOperation({ summary: '发送验证码' })
  sendVerifyCode(@Body() sendVerifyCodeDto: SendVerifyCodeDto) {
    const { username } = sendVerifyCodeDto;

    if (isEmail(username)) {
      return this.authingService.sendEmailCode(username);
    }

    if (isMobilePhone(username)) {
      return this.authingService.sendSmsCode(username);
    }

    throw new CustomHttpException(ErrorCodeEnum.VERIFY_CODE_FAILED);
  }

  @Post('/logout')
  @ApiOperation({ summary: '退出登陆' })
  logout(@Body() logoutOutDto: LogoutOutDto) {
    return this.authingService.logout(logoutOutDto);
  }
}
