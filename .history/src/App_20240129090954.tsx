import { Button, CalendarPicker, Form, TextArea } from 'antd-mobile'
import { useState } from 'react'

function App() {
  const [isDateRangeShow, setIsDateRangeShow] = useState(false)

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
      <Form.Item onClick={() => setIsDateRangeShow(true)} label="时间区间">
        <CalendarPicker selectionMode="range" />
      </Form.Item>
      <Form.Item label="开始时间">
        <TextArea placeholder="开始时间" />
      </Form.Item>
      <Form.Item label="结束时间">
        <TextArea placeholder="开始时间" />
      </Form.Item>
      <Form.Item label="想法">
        <TextArea placeholder="记录此刻的想法" />
      </Form.Item>
    </Form>
  )
}

export default App
