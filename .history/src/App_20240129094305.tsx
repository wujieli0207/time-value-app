import { Button, CalendarPicker, Form, TextArea } from 'antd-mobile'
import { useState } from 'react'

interface IFormItemShow {
  startDate: boolean
  startTime: boolean
  endDate: boolean
  endTime: boolean
}

function App() {
  const [isStartDateShow, setIsStartDateShow] = useState(false)
  const [isEndDateShow, setIsEndDateShow] = useState(false)

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
      <Form.Item label="开始日期" onClick={() => setIsStartDateShow(true)}>
        <CalendarPicker
          visible={isStartDateShow}
          onMaskClick={() => setIsStartDateShow(false)}
          onClose={() => setIsStartDateShow(false)}
        />
      </Form.Item>
      <Form.Item label="开始时间">
        <TextArea placeholder="开始时间" />
      </Form.Item>
      <Form.Item label="结束时间">
        <CalendarPicker
          visible={isEndDateShow}
          onMaskClick={() => setIsEndDateShow(false)}
          onClose={() => setIsEndDateShow(false)}
        />
      </Form.Item>
      <Form.Item label="想法">
        <TextArea placeholder="记录此刻的想法" />
      </Form.Item>
    </Form>
  )
}

export default App
