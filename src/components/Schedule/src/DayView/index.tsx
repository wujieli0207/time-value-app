import { MouseEvent, useState } from 'react'

const TIME_BLOCK_HEIGHT = 50

interface IDayViewState {
  startHour: Nullable<number>
  endHour: Nullable<number>
  isSelecting: boolean
}

const CalendarDayView = () => {
  const hours = Array.from({ length: 24 }, (_, i) => i)

  // 模拟事件数据
  const [events, setEvents] = useState([
    { id: '1', title: 'Meeting with Tom', startHour: 2, endHour: 3 },
    // { id: '2', title: 'Lunch Break', startHour: 12, endHour: 13 },
    // ...其他事件...
  ])

  const [dayViewState, setDayViewState] = useState<IDayViewState>({
    startHour: null,
    endHour: null,
    isSelecting: false,
  })

  const createEvent = (title: string, start: number, end: number) => {
    setEvents([
      ...events,
      {
        id: new Date().getTime().toString(),
        title,
        startHour: start,
        endHour: end,
      },
    ])
  }

  function handleMouseDown(hour: number) {
    console.log('hour: ', hour)
    setDayViewState((prev) => ({ ...prev, startHour: hour, isSelecting: true }))
  }

  function handleMouseUp(
    event: MouseEvent<HTMLDivElement, MouseEvent>,
    endHour: number
  ) {
    // 获取鼠标相对于时间块顶部的垂直位置
    const mouseY =
      event.clientY - event.currentTarget.getBoundingClientRect().top
    console.log('mouseY: ', mouseY)

    // 计算时间增量（小时中的分钟数）
    const minuteDelta = (mouseY / TIME_BLOCK_HEIGHT) * 60

    // 四舍五入到最近的 30 分钟
    const roundedMinutes = Math.ceil(minuteDelta / 30) * 30
    const preciseEndMinute = roundedMinutes === 60 ? 0 : roundedMinutes // 如果达到60分钟，则小时增加，分钟归零
    const preciseEndHour = endHour + (roundedMinutes === 60 ? 1 : 0)

    setDayViewState((prev) => ({
      ...prev,
      isSelecting: false,
    }))

    if (dayViewState.startHour) {
      createEvent(
        'TestTitle',
        dayViewState.startHour,
        preciseEndHour + preciseEndMinute / 60
      )
    }

    setDayViewState((prev) => ({
      ...prev,
      startHour: null,
      endHour: null,
    }))
  }

  return (
    <div>
      {hours.map((hour) => {
        return (
          <div
            key={hour}
            onMouseDown={() => handleMouseDown(hour)}
            onMouseUp={(e) => handleMouseUp(e, hour)}
          >
            {/* 时间轴背景 */}
            <div
              className="border-b border-black"
              style={{ height: `${TIME_BLOCK_HEIGHT}px` }}
            >
              <span className="flex items-center h-full">
                {new Date(0, 0, 0, hour).toLocaleTimeString('zh-CN', {
                  hour: 'numeric',
                })}
              </span>
            </div>

            {/* 事件 */}
            <div>
              {events.map((event) => {
                const start = hour + 1 // 事件开始区间

                const isStart = event.startHour === start
                const isEnd = event.endHour - 1 === start
                const height =
                  (event.endHour - event.startHour) *
                  (isStart || isEnd ? TIME_BLOCK_HEIGHT : 0)

                return (
                  <div
                    key={event.id}
                    className={`absolute left-20 bg-green-400`}
                    style={{ height: `${height}px` }}
                  >
                    {isStart && <div className="p-1 mx-2">{event.title}</div>}
                  </div>
                )
              })}
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default CalendarDayView
