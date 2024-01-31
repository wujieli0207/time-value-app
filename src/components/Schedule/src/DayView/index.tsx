import { useState } from 'react'

const TIME_BLOCK_HEIGHT = 50

const CalendarDayView = () => {
  const hours = Array.from({ length: 24 }, (_, i) => i)

  // 模拟事件数据
  const [events, setEvents] = useState([
    { id: '1', title: 'Meeting with Tom', startHour: 9, endHour: 10 },
    // { id: '2', title: 'Lunch Break', startHour: 12, endHour: 13 },
    // ...其他事件...
  ])

  function handleMouseDown(e) {
    console.log('e: ', e)
  }

  function handleMouseUp(e) {
    console.log('e: ', e)
  }

  return (
    <div onMouseDown={handleMouseDown} onMouseUp={handleMouseUp}>
      {hours.map((hour) => {
        return (
          <div key={hour}>
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
                console.log('height: ', height)

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
