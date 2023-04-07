import { Button, Row, Input, Form } from 'antd'
import './Login.sass'
import {auth} from "../../services/mutation/use-login"
import { useMutation } from 'react-query';
import 'antd/dist/antd.css';
import  logoPath from '../../assets/svg/logo.svg';
import {toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import { useDispatch } from 'react-redux';
import { setAuthTokens } from '../../redux/actions/Auth';
import { setUserData } from '../../redux/actions/userData';
import { useNavigate } from 'react-router-dom';
toast.configure();

const FormItem = Form.Item

export const Login = ()=> {
  
    const dispatch = useDispatch();
    const navigate = useNavigate();
  
    const login = useMutation(auth.login, {
        onSuccess: ({ data }) => {
          console.log(data,'token')
          dispatch(setAuthTokens(data));
          // dispatch(setUserData(data))
          navigate("/dashboard");     
        },

        onError: (e:any) => {
            toast.error("Please enter correct credentials!");
        },
    });

    

    const onSubmit = (data:any) => {
      login.mutate({
          username: data.username,  
          password: data.password,
      });

    }
        return (
          <>
            <div className="form">
              <div className="logo" style={{fontSize: "48px", fontWeight: "600", color: "#ffce39"}}>
                Rpos
                {/* <img alt="logo" src={logoPath}/> */}
              </div>
              <span className='title'><p style={{fontSize: "32px",display: "flex", justifyContent: "center", margin: 0}}>Добро пожаловать</p>   в панель администратора
            </span>
              <Form
              
                 onFinish={onSubmit}
                >
                  <FormItem
                  name={'username'}>
                    <Input
                    style={{marginBottom:"16px"}}
                      placeholder={"Имя пользователя"}
                      />
                  </FormItem>
                  <FormItem name={"password"}>
                    <Input type='password' placeholder={"Пароль"} required />
                  </FormItem>
                <Row>
                  <Button
                    type="primary"
                    htmlType="submit"
                    loading={login.isLoading}
                  >
                    <span>Войти</span>
                  </Button>
                </Row>
              </Form>
            </div>
          </>
        )
}
    