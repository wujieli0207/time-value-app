import { Button, Form, Input } from 'antd'
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
      <Form layout="vertical">
        <Form.Item label="开始日期"></Form.Item>
        <Form.Item label="开始时间"></Form.Item>
        <Form.Item label="结束时间"></Form.Item>
        <Form.Item label="想法">
          <Input.TextArea placeholder="记录此刻的想法" />
        </Form.Item>
      </Form>

      <Button type="primary">提交</Button>
    </>
  )
}

export default App
