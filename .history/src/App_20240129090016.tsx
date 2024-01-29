import { Button, Form } from 'antd-mobile'

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
    </Form>
  )
}

export default App
