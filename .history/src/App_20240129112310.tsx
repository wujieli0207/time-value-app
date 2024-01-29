import { Button, Form, Input, DatePicker, Select, Space } from 'antd'
import { useMemo, useState } from 'react'
import { dateFormat, generateTimesGap } from '@/utils'
import { ITimeInterface } from '#/time'
import { catagoryConfig, statusConfig } from '@/config/time'
import { StatusEnum } from '@/enums/time'
import dayjs, { Dayjs } from 'dayjs'
import { DateFormatEnum } from './enums/global'

interface FieldType
  extends Pick<ITimeInterface, 'catagoryId' | 'description' | 'status'> {
  startDate: string
  startTime: string
  endDate: string
  endTime: string
}

function App() {
  const [form, setForm] = useState<FieldType>({
    startDate: dateFormat(dayjs(), DateFormatEnum.DATE),
    startTime: '',
    endDate: dateFormat(dayjs(), DateFormatEnum.DATE),
    endTime: '',
    catagoryId: '',
    description: '',
    status: StatusEnum.MIDDLE,
  })

  const timeRange = useMemo(() => {
    return generateTimesGap()
  }, [])

  function handleFormChange(value: string, field: keyof FieldType) {
    console.log('value: ', value)
    // setForm((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <div className="p-4">
      <Form layout="vertical">
        <Form.Item<FieldType> name="startDate" label="开始日期">
          <DatePicker defaultValue={dayjs(form.startDate)} className="w-full" />
        </Form.Item>
        <Form.Item<FieldType> name="startTime" label="开始时间">
          <Select options={timeRange} />
        </Form.Item>
        <Form.Item<FieldType> name="endDate" label="结束日期">
          <DatePicker defaultValue={dayjs(form.endDate)} className="w-full" />
        </Form.Item>
        <Form.Item<FieldType> name="endTime" label="结束时间">
          <Select options={timeRange} />
        </Form.Item>

        <Form.Item<FieldType> name="catagoryId" label="分组">
          <Select>
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
          <Select defaultValue={form.status}>
            {statusConfig.map((item) => (
              <Select.Option key={item.value} value={item.value}>
                <Space>{item.label}</Space>
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item<FieldType> name="description" label="想法">
          <Input.TextArea placeholder="记录此刻的想法" />
        </Form.Item>
      </Form>

      <Button type="primary" size="large" className="w-full">
        提交
      </Button>
    </div>
  )
}

export default App
