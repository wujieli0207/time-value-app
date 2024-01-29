import * as crypto from 'crypto';

/**
 * @description md5 加密方法
 */
export function md5(str: string) {
  const hash = crypto.createHash('md5');
  hash.update(str);
  return hash.digest('hex');
}
