import { Button, Form, Input, DatePicker, Select, Space } from 'antd'
import { useMemo } from 'react'
import { generateTimesGap } from '@/utils'
import { ITimeInterface } from '#/time'
import { catagoryConfig } from '@/config/time'

interface FieldType
  extends Pick<ITimeInterface, 'catagoryId' | 'description' | 'status'> {
  startDate: string
  startTime: string
  endDate: string
  endTime: string
}

function App() {
  const timeRange = useMemo(() => {
    return generateTimesGap()
  }, [])

  return (
    <>
      <Form layout="vertical">
        <Form.Item<FieldType> name="startDate" label="开始日期">
          <DatePicker />
        </Form.Item>
        <Form.Item<FieldType> name="startTime" label="开始时间">
          <Select size="small" options={timeRange} />
        </Form.Item>
        <Form.Item label="结束日期">
          <DatePicker />
        </Form.Item>
        <Form.Item<FieldType> name="endDate" label="结束日期">
          <DatePicker />
        </Form.Item>
        <Form.Item<FieldType> name="endTime" label="结束时间">
          <Select size="small" options={timeRange} />
        </Form.Item>

        <Form.Item<FieldType> name="catagoryId" label="分组">
          <Select size="small">
            {catagoryConfig.map((item) => (
              <Select.Option key={item.value} value={item.value}>
                <Space>
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  {item.label}
                </Space>
              </Select.Option>
            ))}
          </Select>
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
