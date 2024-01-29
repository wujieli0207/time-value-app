import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsMobilePhone } from 'class-validator';

export class LoginDto {
  @ApiProperty({ description: '账号（手机号 / 邮箱）' })
  username: string;

  @ApiProperty({ description: '密码' })
  password: string;
}

export class LoginEmailDto {
  @IsEmail()
  @ApiProperty({ description: '邮箱' })
  email: string;

  @ApiProperty({ description: '密码' })
  password: string;
}

export class LoginMobileDto {
  @IsMobilePhone(null)
  @ApiProperty({ description: '手机号' })
  mobile: string;

  @ApiProperty({ description: '密码' })
  password: string;
}

export class ResetEmailDto {
  @IsEmail()
  @ApiProperty({ description: '邮箱' })
  email: string;

  @ApiProperty({ description: '验证码' })
  code: string;

  @ApiProperty({ description: '新密码' })
  newPassword: string;
}

export class ResetMobileDto {
  @IsMobilePhone(null)
  @ApiProperty({ description: '手机号' })
  mobile: string;

  @ApiProperty({ description: '验证码' })
  code: string;

  @ApiProperty({ description: '新密码' })
  newPassword: string;
}

export class LogoutOutDto {
  @ApiProperty({ description: 'token' })
  token: string;
}
