import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsMobilePhone } from 'class-validator';

export class RegisterDto {
  @ApiProperty({ description: '账号（手机号 / 邮箱）' })
  username: string;

  @ApiProperty({ description: '密码' })
  password: string;

  @ApiProperty({ description: '验证码' })
  code: string;

  @ApiProperty({ description: '昵称' })
  nickname: string;
}

export class RegisterEmailDto {
  @IsEmail()
  @ApiProperty({ description: '邮箱' })
  email: string;

  @ApiProperty({ description: '密码' })
  password: string;

  @ApiProperty({ description: '昵称' })
  nickname: string;
}

export class RegisterMobileDto {
  @IsMobilePhone(null)
  @ApiProperty({ description: '手机号' })
  mobile: string;

  @ApiProperty({ description: '密码' })
  password: string;

  @ApiProperty({ description: '验证码' })
  code: string;

  @ApiProperty({ description: '昵称' })
  nickname: string;
}

// 发送验证码
export class SendVerifyCodeDto {
  @ApiProperty({ description: '账号（手机号 / 邮箱）' })
  username: string;
}
