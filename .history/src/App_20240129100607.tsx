import {
  Button,
  CalendarPicker,
  Form,
  Input,
  Picker,
  TextArea,
} from 'antd-mobile'
import { useMemo, useState } from 'react'
import { generateTimesGap } from './utils'

interface IFormItemShow {
  startDate: boolean
  startTime: boolean
  endDate: boolean
  endTime: boolean
}

function App() {
  const [isFormItemShow, setIsFormItemShow] = useState({
    startDate: false,
    startTime: false,
    endDate: false,
    endTime: false,
  })

  const timeRange = useMemo(() => {
    return generateTimesGap()
  }, [])

  const handleToggleFormItemShow = (key: keyof IFormItemShow) => {
    setIsFormItemShow((prevState) => ({
      ...prevState,
      [key]: !isFormItemShow[key],
    }))
  }

  return (
    <>
      {JSON.stringify(isFormItemShow)}
      <Form
        layout="horizontal"
        footer={
          <Button color="primary" block>
            提交
          </Button>
        }
      >
        <Form.Header>时间记录</Form.Header>
        <Form.Item
          label="开始日期"
          onClick={() => handleToggleFormItemShow('startDate')}
        >
          <CalendarPicker
            visible={isFormItemShow.startDate}
            onMaskClick={() => handleToggleFormItemShow('startDate')}
            onClose={() => handleToggleFormItemShow('startDate')}
          />
        </Form.Item>
        <Form.Item
          label="开始时间"
          onClick={() => handleToggleFormItemShow('startTime')}
        >
          <Input placeholder="开始时间" disabled={true} />
          <Picker
            visible={isFormItemShow.startTime}
            columns={[
              [
                { label: '周一', value: 'Mon' },
                { label: '周二', value: 'Tues' },
                { label: '周三', value: 'Wed' },
                { label: '周四', value: 'Thur' },
                { label: '周五', value: 'Fri' },
              ],
              [
                { label: '上午', value: 'am' },
                { label: '下午', value: 'pm' },
              ],
            ]}
          />
        </Form.Item>
        <Form.Item
          label="结束时间"
          onClick={() => handleToggleFormItemShow('endDate')}
        >
          <CalendarPicker
            visible={isFormItemShow.endDate}
            onMaskClick={() => handleToggleFormItemShow('endDate')}
            onClose={() => handleToggleFormItemShow('endDate')}
          />
        </Form.Item>
        <Form.Item label="想法">
          <TextArea placeholder="记录此刻的想法" />
        </Form.Item>
      </Form>
    </>
  )
}

export default App
