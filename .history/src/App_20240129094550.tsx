import {
  Button,
  CalendarPicker,
  Form,
  Input,
  Picker,
  TextArea,
} from 'antd-mobile'
import { useState } from 'react'
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

  const handleToggleFormItemShow = (key: keyof IFormItemShow) => {
    setIsFormItemShow((prevState) => ({
      ...prevState,
      [key]: !isFormItemShow[key],
    }))
  }

  return (
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
      <Form.Item label="开始时间">
        <Input placeholder="开始时间" disabled={true} />
        <Picker
          visible={isFormItemShow.startTime}
          columns={generateTimesGap()}
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
  )
}

export default App
