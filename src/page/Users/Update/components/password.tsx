import { useState } from 'react';
import { Input, Form } from 'antd';
import './style.sass';

const PasswordInput = ({setPassword,setNewPassword}:any) => {
  const [form] = Form.useForm();
  const [oldPasswordError, setOldPasswordError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  const handleOldPasswordChange = (event:any) => {
    const oldPassword = event.target.value;

    // Add your validation logic for the old password input here
    if (oldPassword.length == 0) {
      setOldPasswordError('Пожалуйста, заполните поле!');
    } else {
      setOldPasswordError('');
    }

    form.setFieldsValue({ password: '', confirmPassword: '' });
  };

  const handlePasswordChange = (event:any) => {
    // const password = event.target.value;
    // const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

    // if (!passwordRegex.test(password)) {
    //   setPasswordError('Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number.');
    // } else {
    //   setPasswordError('');
    // }

    form.setFieldsValue({ confirmPassword: '' });
  };

  const handleConfirmPasswordChange = (event:any) => {
    const confirmPassword = event.target.value;

    if (confirmPassword !== form.getFieldValue('password')) {
      setConfirmPasswordError('Пароли не совпадают!');
    } else {
      setConfirmPasswordError('');
    }
  };

 
    const { oldPassword, password, confirmPassword } = form.getFieldsValue();
    setPassword(oldPassword);
    setNewPassword(confirmPassword);
  
  
  return (
    <div>
      <Form form={form} className={'form'}>
        <Form.Item
          name="oldPassword"
          label="Старый пароль"
          rules={[
            {
              required: true,
              message: 'Please enter your old password.',
            },
          ]}
          validateStatus={oldPasswordError ? 'error' : ''}
          help={oldPasswordError}
        >
          <Input.Password onChange={handleOldPasswordChange} />
        </Form.Item>
        <Form.Item
          name="password"
          label="Новый пароль"
          rules={[
            {
              required: true,
              message: 'Please enter your new password.',
            },
          ]}
          validateStatus={passwordError ? 'error' : ''}
          help={passwordError}
        >
          <Input.Password onChange={handlePasswordChange} />
        </Form.Item>
        <Form.Item
          name="confirmPassword"
          label="Подтвердите пароль"
          dependencies={['password']}
          rules={[
            {
              required: true,
              message: 'Please confirm your new password.',
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('Passwords do not match.'));
              },
            }),
          ]}
          validateStatus={confirmPasswordError ? 'error' : ''}
          help={confirmPasswordError}
        >
          <Input.Password onChange={handleConfirmPasswordChange} />
        </Form.Item>
      </Form>
    </div>
  );
};

export default PasswordInput;