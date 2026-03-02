import React, { useState } from 'react';
import { Input, Button, Form, message } from 'antd';
import './contact.css';

const Contact = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleSubmit = (values: any) => {
    setLoading(true);
    setTimeout(() => {
      message.success('Спасибо! Ваше сообщение отправлено.');
      form.resetFields();
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="contact-container">
      <h1>Свяжитесь с нами</h1>
      <div className="contact-form-wrapper">
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          className="contact-form"
        >
          <Form.Item
            label="Ваше имя"
            name="name"
            rules={[{ required: true, message: 'Пожалуйста, введите имя' }]}
          >
            <Input placeholder="Вито скалетта" />
          </Form.Item>

          <Form.Item
            label="Номер телефона"
            name="phone"
            rules={[{ required: true, message: 'Пожалуйста, введите телефон' }]}
          >
            <Input placeholder="022726" />
          </Form.Item>

          <Form.Item
            label="Электронная почта"
            name="email"
            rules={[
              { required: true, message: 'Пожалуйста, введите email' },
              { type: 'email', message: 'Введите корректный email' },
            ]}
          >
            <Input placeholder="пиши сюда брат" />
          </Form.Item>

          <Form.Item
            label="Сообщение"
            name="message"
            rules={[{ required: true, message: 'Пожалуйста, введите сообщение' }]}
          >
            <Input.TextArea rows={4} placeholder="Ваше сообщение..." />
          </Form.Item>

          <Button type="primary" htmlType="submit" loading={loading} className="submit-btn">
            Отправить
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default Contact;
