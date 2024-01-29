import { Button, Form, Input, DatePicker } from 'antd'
import { useMemo, useState } from 'react'
import { generateTimesGap } from '@/utils'
import { ITimeInterface } from '#/time'

interface IFormItemShow {
  startDate: boolean
  startTime: boolean
  endDate: boolean
  endTime: boolean
}

interface FieldType
  extends Pick<ITimeInterface, 'catagoryId' | 'description' | 'status'> {
  startDate: string
  startTime: string
  endDate: string
  endTime: string
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
        <Form.Item<FieldType> name="startDate" label="开始日期">
          <DatePicker />
        </Form.Item>
        <Form.Item<FieldType> name="startTime" label="开始时间"></Form.Item>
        <Form.Item label="结束日期">
          <DatePicker />
        </Form.Item>
        <Form.Item<FieldType> name="endDate" label="结束日期">
          <DatePicker />
        </Form.Item>
        <Form.Item<FieldType> name="endTime" label="结束时间"></Form.Item>

        <Form.Item<FieldType> name="catagoryId" label="分组">
          <Input.TextArea placeholder="记录此刻的想法" />
        </Form.Item>

        <Form.Item<FieldType> name="status" label="状态">
          <Input.TextArea placeholder="记录此刻的想法" />
        </Form.Item>

        <Form.Item<FieldType> name="description" label="想法">
          <Input.TextArea placeholder="记录此刻的想法" />
        </Form.Item>
      </Form>

      <Button type="primary">提交</Button>
    </>
  )
}

export default App
