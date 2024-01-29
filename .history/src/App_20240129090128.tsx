import { Button, Form, Input } from 'antd-mobile'

function App() {
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
      <Form.Item label="一些想法">
        <Input placeholder="记录此刻的想法" />
      </Form.Item>
    </Form>
  )
}

export default App
