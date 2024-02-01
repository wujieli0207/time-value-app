import { CSSProperties, MouseEvent } from 'react'
import { IDayViewState } from '../DayView'

export const TIME_BLOCK_HEIGHT = 50 // 每小时时间块的高度
export const SELECT_TIME_BLOCK_RANGE = 30 // 选择时间时，时间块的最小范围

interface IGetTimeBlockByMouseEndOptions {
  timeBlockHeight: number
}

/**
 * @description 根据鼠标移动结束时间（小时），计算当前时间块的差值
 */
export function getTimeBlockByMouseEnd(
  event: MouseEvent<HTMLDivElement, MouseEvent>,
  endHour: number,
  options?: IGetTimeBlockByMouseEndOptions
) {
  const { timeBlockHeight = TIME_BLOCK_HEIGHT } = options ?? {}

  // 获取鼠标相对于时间块顶部的垂直位置
  const mouseY = event.clientY - event.currentTarget.getBoundingClientRect().top

  // 计算时间增量（小时中的分钟数）
  const minuteDelta = (mouseY / timeBlockHeight) * 60

  // 四舍五入到最近的 SELECT_TIME_BLOCK_RANGE 分钟
  const roundedMinutes =
    Math.ceil(minuteDelta / SELECT_TIME_BLOCK_RANGE) * SELECT_TIME_BLOCK_RANGE
  const preciseEndMinute = roundedMinutes === 60 ? 0 : roundedMinutes // 如果达到60分钟，则小时增加，分钟归零
  const preciseEndHour = endHour + (roundedMinutes === 60 ? 1 : 0)

  return preciseEndHour + preciseEndMinute / 60
}

/**
 * @description 鼠标选择时，获取已选择时间的样式
 */
export function getSelectionStyle(
  hour: number,
  dayViewState: IDayViewState
): CSSProperties {
  if (
    !dayViewState.isSelecting ||
    dayViewState.startHour === null ||
    dayViewState.endHour === null
  ) {
    return {} // 如果没有选择，返回空对象
  }

  // 将小时和分钟分开处理
  const startHourFloor = Math.floor(dayViewState.startHour)
  const endHourCeil = Math.ceil(dayViewState.endHour)
  const timeRedio = SELECT_TIME_BLOCK_RANGE / 60
  const startMinuteRatio =
    dayViewState.startHour % 1 === timeRedio ? timeRedio : 0
  const endMinuteRatio = dayViewState.endHour % 1 === timeRedio ? timeRedio : 1

  if (hour >= startHourFloor && hour < endHourCeil) {
    let top = 0
    let height = TIME_BLOCK_HEIGHT

    if (hour === startHourFloor) {
      top = startMinuteRatio * TIME_BLOCK_HEIGHT // 如果是开始的半点，顶部需要调整
      height -= top
    }
    if (hour === endHourCeil - 1) {
      height = endMinuteRatio * TIME_BLOCK_HEIGHT - top // 调整结束时间的高度
    }

    return {
      position: 'absolute',
      top: `${top}px`,
      width: '100%',
      height: `${height}px`,
      backgroundColor: 'rgba(135, 206, 235, 0.5)', // 半透明的天蓝色
    }
  }

  return {}
}
