import { DateFormatEnum } from '../enums/global'

/**
 * @description 按照每 15 分钟到间隔，生成时间选择列表
 */
export function generateTimesGap(): Array<Record<'label' | 'value', string>> {
  const times = []
  for (let i = 0; i < 24; i++) {
    for (let j = 0; j < 60; j += 15) {
      const date = new Date()
      date.setHours(i, j)
      const isPM = i >= 12
      const hour = isPM ? i - 12 : i
      const minute = j < 10 ? '0' + j : j
      const label = `${isPM ? '下午' : '上午'} ` + hour + ':' + minute
      times.push({
        label: label,
        value: dateFormat(date, DateFormatEnum.MINUTE),
      })
    }
  }
  return times
}
