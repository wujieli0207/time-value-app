import { Button, Form, Input, DatePicker, Select, Space, message } from 'antd'
import { useMemo, useState } from 'react'
import { dateFormat, generateTimesGap } from '@/utils'
import { ITimeInterface } from '#/time'
import { catagoryConfig, statusConfig } from '@/config/time'
import { StatusEnum } from '@/enums/time'
import dayjs from 'dayjs'
import { DateFormatEnum } from '@/enums/global'
import { ResultEnum } from '@/enums/common'
import { ICreateTimeLogParams, createTimeLogApi } from '@/api/module/timeLog'
import { omit } from 'lodash-es'
import { DayView } from '@/components/Schedule'

interface FieldType
  extends Pick<ITimeInterface, 'catagoryId' | 'description' | 'status'> {
  startDate: string
  startTime: string
  endDate: string
  endTime: string
}

const ORIGIN_FORM_DATA: FieldType = {
  startDate: dateFormat(dayjs(), DateFormatEnum.DATE),
  startTime: '',
  endDate: dateFormat(dayjs(), DateFormatEnum.DATE),
  endTime: '',
  catagoryId: 0,
  description: '',
  status: StatusEnum.MIDDLE,
}

function App() {
  const [form] = Form.useForm()

  const [formValue, setFormValue] = useState<FieldType>(ORIGIN_FORM_DATA)

  const timeRange = useMemo(() => {
    return generateTimesGap()
  }, [])

  function handleFormChange(value: string, field: keyof FieldType) {
    setFormValue((prev) => ({ ...prev, [field]: value }))
  }

  async function handleSubmit() {
    const saveParams: ICreateTimeLogParams = {
      start: dateFormat(
        `${formValue.startDate} ${formValue.startTime}`,
        DateFormatEnum.DATE_MINUTE
      ),
      end: dateFormat(
        `${formValue.endDate} ${formValue.endTime}`,
        DateFormatEnum.DATE_MINUTE
      ),
      ...omit(formValue, ['startDate', 'startTime', 'endDate', 'endTime']),
    }

    try {
      if (await form.validateFields()) {
        const result = await createTimeLogApi(saveParams)
        if (result.status === ResultEnum.SUCCESS) {
          message.success('保存成功')
          setFormValue(ORIGIN_FORM_DATA)
          form.resetFields()
        }
      }
    } catch (error) {
      console.error('error: ', error)
    }
  }

  return (
    <div className="p-4">
      <DayView />
      {/* <Form form={form} layout="vertical">
        <Form.Item<FieldType> name="startDate" label="开始日期">
          <DatePicker
            defaultValue={dayjs(formValue.startDate)}
            className="w-full"
            onChange={(value) =>
              handleFormChange(
                dateFormat(value, DateFormatEnum.DATE),
                'startDate'
              )
            }
          />
        </Form.Item>
        <Form.Item<FieldType>
          name="startTime"
          label="开始时间"
          rules={[{ required: true, message: '开始时间必填' }]}
        >
          <Select
            options={timeRange}
            onChange={(value) => handleFormChange(value, 'startTime')}
          />
        </Form.Item>
        <Form.Item<FieldType> name="endDate" label="结束日期">
          <DatePicker
            defaultValue={dayjs(formValue.endDate)}
            className="w-full"
            onChange={(value) =>
              handleFormChange(
                dateFormat(value, DateFormatEnum.DATE),
                'endDate'
              )
            }
          />
        </Form.Item>
        <Form.Item<FieldType>
          name="endTime"
          label="结束时间"
          rules={[{ required: true, message: '开始时间必填' }]}
        >
          <Select
            options={timeRange}
            onChange={(value) => handleFormChange(value, 'endTime')}
          />
        </Form.Item>

        <Form.Item<FieldType>
          name="catagoryId"
          label="分类"
          rules={[{ required: true, message: '分类必填' }]}
        >
          <Select onChange={(value) => handleFormChange(value, 'catagoryId')}>
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
          <Select
            defaultValue={formValue.status}
            onChange={(value) => handleFormChange(value, 'status')}
          >
            {statusConfig.map((item) => (
              <Select.Option key={item.value} value={item.value}>
                <Space>{item.label}</Space>
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item<FieldType> name="description" label="想法">
          <Input.TextArea
            placeholder="记录此刻的想法"
            onChange={(e) => handleFormChange(e.target.value, 'description')}
          />
        </Form.Item>
      </Form>

      <Button
        type="primary"
        size="large"
        className="w-full"
        onClick={handleSubmit}
      >
        提交
      </Button> */}
    </div>
  )
}

export default App
