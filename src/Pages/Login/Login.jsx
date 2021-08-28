import React, { useState } from 'react'
import axios from 'axios';
import { Button, Form } from 'react-bootstrap';
import { RouteComponentProps } from 'react-router'
import { useDispatch } from 'react-redux'
import { MdLockOpen } from "react-icons/md";
import { useHistory } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Login = (props) => {
    const dispatch = useDispatch()
    const history = useHistory()
    const [user, setUser] = useState({ email: "", password: "" })
    const handleChange = (event) => {
        const data = event.target
        setUser({ ...user, [data.name]: data.value })
    }
    const handleLogin = (event) => {
        event.preventDefault()
        axios.post('/login', {
            email: user.email,
            password: user.password
        })
            .then((res) => {
                console.log(res.data)
                dispatch({
                    type: "userLogin", payload: {
                        isLogin: true,
                        accessToken: res.data.accessToken,
                        refreshToken: res.data.refreshToken,
                        role: "",
                        firstName: res.data.firstName,
                        lastName: res.data.lastName,
                        phoneNumber: res.data.phoneNumber
                    }
                })
                toast.success('با موفقیت وارد شدید', {
                    position: "bottom-left",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                setTimeout(() => history.push("/"), 2000)
            })
            .catch(err => {
                toast.error('کاربر وجود ندارد', {
                    position: "bottom-left",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                console.log(err)
            })
    }
    return (
        <div className="w-100 h-100" style={{ marginTop: "6rem", backgroundColor: "#F8F9FA" }}>
            <div className="container w-100 h-75 d-flex justify-content-center align-items-center">
                <Form className="p-5 rounded"
                    style={{ border: "1px solid lightgray", borderRadius: "8px", width: "40%", backgroundColor: "#F8F9FA" }}
                >
                    <div className="text-center">
                        <MdLockOpen
                            className="p-3"
                            style={{ width: "80px", height: "80px", backgroundColor: "#fff9f9", borderRadius: "50%", margin: "1rem" }} />
                    </div>
                    <div className="text-center"><h1>Login</h1></div>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>ایمیل</Form.Label>
                        <Form.Control
                            style={{ borderRadius: "22px", border: "1px solid lightgray" }}
                            onChange={handleChange} name="email" type="email" placeholder="آدرس ایمیل" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>رمز عبور</Form.Label>
                        <Form.Control
                            style={{ borderRadius: "22px", border: "1px solid lightgray" }}
                            onChange={handleChange} name="password" type="password" placeholder="کلمه عبور" />
                    </Form.Group>
                    <Button

                        className="w-100 mt-3 bg-primary"
                        onClick={handleLogin} variant="primary" type="submit">
                        ورود به حساب
                    </Button>
                </Form>
            </div>
            <ToastContainer
                position="bottom-left"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={true}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </div>
    )
}
export default Login;