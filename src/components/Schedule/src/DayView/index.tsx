import { MouseEvent, useState } from 'react'
import {
  TIME_BLOCK_HEIGHT,
  getSelectionStyle,
  getTimeBlockByMouseEnd,
} from '../utils/timeHelper'

export interface IDayViewState {
  startHour: Nullable<number>
  endHour: Nullable<number>
  isSelecting: boolean
}

const CalendarDayView = () => {
  const hours = Array.from({ length: 24 }, (_, i) => i)

  // 模拟事件数据
  const [events, setEvents] = useState([
    { id: '1', title: 'Meeting with Tom', startHour: 9, endHour: 10 },
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

  // 修改选择时间区间的显示逻辑

  function handleMouseDown(hour: number) {
    setDayViewState((prev) => ({ ...prev, startHour: hour, isSelecting: true }))
  }

  function handleMouseMove(
    event: MouseEvent<HTMLDivElement, MouseEvent>,
    hour: number
  ) {
    if (dayViewState.isSelecting) {
      const endHour = getTimeBlockByMouseEnd(event, hour)

      setDayViewState((prev) => ({
        ...prev,
        endHour,
      }))
    }
  }

  function handleMouseUp(
    event: MouseEvent<HTMLDivElement, MouseEvent>,
    hour: number
  ) {
    setDayViewState((prev) => ({
      ...prev,
      isSelecting: false,
    }))

    const endHour = getTimeBlockByMouseEnd(event, hour)

    if (dayViewState.startHour) {
      createEvent('TestTitle', dayViewState.startHour, endHour)
    }

    setDayViewState((prev) => ({
      ...prev,
      startHour: null,
      endHour: null,
    }))
  }

  return (
    <div className="mb-40">
      {JSON.stringify(dayViewState)}
      {hours.map((hour) => {
        return (
          <div
            key={hour}
            onMouseDown={() => handleMouseDown(hour)}
            // @ts-ignore
            onMouseMove={(e) => handleMouseMove(e, hour)}
            // @ts-ignore
            onMouseUp={(e) => handleMouseUp(e, hour)}
          >
            {/* 时间轴背景 */}
            <div
              className="relative border-b border-black"
              style={{ height: `${TIME_BLOCK_HEIGHT}px` }}
            >
              <span className="flex items-center h-full">
                {new Date(0, 0, 0, hour).toLocaleTimeString('zh-CN', {
                  hour: 'numeric',
                })}

                {/* 已选择的时间区间 */}
                <div style={getSelectionStyle(hour, dayViewState)}></div>
              </span>
            </div>

            {/* 事件 */}
            <div>
              {events.map((event) => {
                const start = hour + 1 // 事件开始区间

                const isStart = event.startHour === start
                const isEnd = event.endHour === start
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
