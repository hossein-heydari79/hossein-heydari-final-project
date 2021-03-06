import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { Button, Form } from 'react-bootstrap';
import { RouteComponentProps } from 'react-router'
import { useHistory } from 'react-router'
import { MdPersonAdd } from "react-icons/md";


export const Register = (props) => {
    const history = useHistory()
    const [user, setUser] = useState({ firstName: "", lastName: "", email: "", password: "", phoneNumber: "" })
    const [message, setMessage] = useState("")
    const handleChange = (event) => {
        const data = event.target
        setUser({ ...user, [data.name]: data.value })
    }
    const handleRegister = (event) => {
        event.preventDefault()
        axios.post('/register', {
            ...user
        })
            .then((res) => {
                if (res.data === "user already exists") {
                    setMessage("کاربر وجود دارد.لطفا وارد شوید.")
                    setTimeout(() => {
                        history.push("/login")
                    }, 1000)
                }
                else if (res.data === "successed") {
                    setMessage("شما به طور اتوماتیک به صفحه ورود هدایت میشوید.")
                    setTimeout(() => {
                        history.push("/login")
                    }, 2000)
                }
                console.log(res.data)
            })
            .catch(err => {
                console.log(err.message)
                setMessage(err.message)
            })
    }
    const [windowWidth, setWindowWith] = useState(window.innerWidth)
    useEffect(() => {
        window.addEventListener("resize", () => {
            setWindowWith(window.innerWidth)
        })
    }, [])
    return (
        <div className="w-100 mb-5" style={{ marginTop: `${windowWidth < 992 ? "3rem" : "6rem"}`, backgroundColor: "#F8F9FA" }}>
            <div className={`container d-flex justify-content-center align-items-center
            ${windowWidth < 992 ? "w-100" : "w-50"}
            `}>
                <Form className=" p-5 rounded"
                    style={{ border: "1px solid lightgray", borderRadius: "8px", backgroundColor: "#F8F9FA" }}>
                    <div className="text-center">
                        <MdPersonAdd
                            className="p-3"
                            style={{ width: "100px", height: "100px", borderRadius: "50%" }} />
                    </div>
                    <div className="text-center mt-4"><h5>حساب کاربری جدید بسازید</h5></div>
                    <div className="row">
                        <div className="col-lg-6 col-12 mt-4">
                            <Form.Label>نام</Form.Label>
                            <Form.Control
                                className="bg-light"
                                style={{ borderRadius: "22px", border: "1px solid lightgray" }}
                                onChange={handleChange} name="firstName" type="text" placeholder="نام خود را وارد نمایید" />
                        </div>
                        <div className="col-lg-6 col-12 mt-4">
                            <Form.Label>ایمیل</Form.Label>
                            <Form.Control
                                className="bg-light"
                                style={{ borderRadius: "22px", border: "1px solid lightgray" }}
                                onChange={handleChange} name="email" type="email" placeholder="آدرس ایمیل خود را وارد نمایید" />
                        </div>
                        <div className="col-lg-6 col-12 mt-4">
                            <Form.Label>نام خانوادگی</Form.Label>
                            <Form.Control
                                className="bg-light"
                                style={{ borderRadius: "22px", border: "1px solid lightgray" }}
                                onChange={handleChange} name="lastName" type="text" placeholder="نام خانوادگی خود را وارد نمایید" />
                        </div>
                        <div className="col-lg-6 col-12 mt-4">
                            <Form.Label>شماره موبایل</Form.Label>
                            <Form.Control
                                className="bg-light"
                                style={{ borderRadius: "22px", border: "1px solid lightgray" }}
                                onChange={handleChange} name="phoneNumber" type="email" placeholder="شماره موبایل خود را وارد نمایید" />
                        </div>
                        <div className="col-lg-6 col-12 mt-4">
                            <Form.Label>کلمه عبور</Form.Label>
                            <Form.Control
                                className="bg-light"
                                style={{ borderRadius: "22px", border: "1px solid lightgray" }}
                                onChange={handleChange} name="password" type="password" placeholder="کلمه عبور خود را وارد نمایید" />
                        </div>
                        <div className="col-lg-6 col-12 mt-4">
                            <Form.Label>تایید کلمه عبور</Form.Label>
                            <Form.Control
                                className="bg-light"
                                style={{ borderRadius: "22px", border: "1px solid lightgray" }}
                                onChange={handleChange} name="password" type="password" placeholder="کلمه عبور را مجددا وارد نمایید" />
                        </div>
                    </div>
                    <small>{message}</small>
                    <div className="w-100 px-5">
                        <Button

                            className="w-100 mt-3 bg-primary"
                            onClick={handleRegister} variant="primary" type="submit">
                            ایجاد حساب کاربری
                        </Button>
                    </div>
                </Form>
            </div>
        </div>
    )
}
export default Register;