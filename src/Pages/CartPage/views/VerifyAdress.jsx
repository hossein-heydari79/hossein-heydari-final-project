import React, { useState, useEffect } from 'react'
import { Button, Form } from 'react-bootstrap'
import { RouteComponentProps } from 'react-router-dom'
import { useHistory } from 'react-router'
import { useSelector } from 'react-redux'
import Proviences from '../../../Assets/provinces.json'
import Cities from '../../../Assets/cities.json'
import { context } from '../CartPage'
import { useContext } from 'react';
const VerifyAdress = (props) => {
    const { localState, localDispatch } = useContext(context)
    const cartItems = useSelector(state => state.cart.cartProducts)
    const history = useHistory();
    const [windowWidth, setWindowWith] = useState(window.innerWidth)
    const [cities, setCities] = useState([Cities[0]])
    const [userInfo, setUserInfo] = useState({
        postalCode: "",
        fullName: "",
        provience: "",
        city: "",
        address: "",
    })
    const [postMethod, setPostMethod] = useState("")
    const userInput = (event) => {
        const data = event.target;
        // console.log(data.value)
        setUserInfo({ ...userInfo, [data.name]: data.value })
    }
    useEffect(() => {
        window.addEventListener("resize", () => {
            setWindowWith(window.innerWidth)
        })
    }, [])
    const handleProvienceChange = (event) => {
        const data = event.target
        setCities(Cities.filter(item => +item.province_id === +data.value))
        const provience = Proviences.find(item => item.id === +data.value)
        provience && setUserInfo({ ...userInfo, provience: provience.name })
    }
    const handleCityChange = (event) => {
        const data = event.target
        setUserInfo({ ...userInfo, city: data.value })
    }
    const handlePostMethod = (event) => {
        const data = event.target
        setPostMethod(data.value)
    }
    const handleClick = () => {
        localDispatch({ type: "addUserInfo", payload: { userInfo, postMethod } })
        history.push("/cart/payment")
    }
    return (
        <div className="container w-100 d-flex">
            <div className={`bg-light mt-4 p-3 ${windowWidth < 500 ? "w-100" : "w-75"}`} >{console.log(userInfo)}
                <div className="container w-100">
                    <div className="row d-flex justify-content-lg-between justify-content-center">
                        <div className="col-lg-9 col-12 row bg-white p-3"
                            style={{ boxShadow: "0 5px 8px -3px rgb(0 0 0 / 10%)", borderRadius: "8px" }}
                        >
                            <h4 className="mb-3">نشانی</h4>
                            <div className="col-lg-6 col-12">
                                <label className="my-2" htmlFor="">کدپستی</label>
                                <Form.Control className="bg-light" style={{ borderRadius: "22px", border: "none" }}
                                    type="text" placeholder="کدپستی خود را وارد کنید"
                                    name="postalCode"
                                    onChange={userInput} />
                            </div>
                            <div className="col-lg-6 col-12">
                                <label className="my-2" htmlFor="">نام تحویل گیرنده</label>
                                <Form.Control className="bg-light"
                                    style={{ borderRadius: "22px", border: "none" }}
                                    type="text" placeholder="نام گیرنده را وارد کنید"
                                    name="fullName"
                                    onChange={userInput} />
                            </div>
                            <div className="col-lg-6 col-12">
                                <label className="my-2" htmlFor="">استان</label>
                                <Form.Select className="bg-light"
                                    style={{ borderRadius: "22px", border: "none", fontSize: "smaller" }}
                                    onChange={handleProvienceChange} aria-label="Default select example">
                                    <option>یک مورد را انتخاب نمایید</option>
                                    {
                                        Proviences.map((provience) => (
                                            <option key={provience.id + provience.name} value={provience.id}>{provience.name}</option>
                                        ))
                                    }
                                </Form.Select>
                            </div>
                            <div className="col-lg-6 col-12">
                                <label className="my-2" htmlFor="">شهر</label>
                                <Form.Select className="bg-light"
                                    style={{ borderRadius: "22px", border: "none", fontSize: "smaller" }}
                                    aria-label="Default select example"
                                    onChange={handleCityChange}
                                >
                                    <option>یک مورد را انتخاب نمایید</option>
                                    {
                                        cities.map((city) => (
                                            <option key={city.id + city.name} value={city.name}>{city.name}</option>
                                        ))
                                    }
                                </Form.Select>
                            </div>
                            <div className="col-12">
                                <label className="my-2" htmlFor="">آدرس دقیق</label>
                                <Form.Control className="bg-light"
                                    style={{ borderRadius: "22px", border: "none" }}
                                    as="textarea" placeholder="آدرس دقیق محل تحویل کالا را وارد نمایید"
                                    name="address"
                                    onChange={userInput}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                {
                    windowWidth < 500 &&
                    <Button className="w-100"
                        style={{
                            position: "sticky", left: "0", bottom: "12%",
                            backgroundColor: "#3BC9A7"
                        }}
                        onClick={handleClick}
                    >
                        ادامه و انتخاب روش پرداخت
                    </Button>
                }
            </div>
            {
                windowWidth > 500 &&
                <div className="w-25 my-4 mx-1 bg-white"
                    style={{ boxShadow: "0 5px 8px -3px rgb(0 0 0 / 10%)", borderRadius: "8px", height: "200px" }}>
                    <div className="rounded p-3">
                        <div>
                            <h5>خلاصه فاکتور</h5>
                            <hr />
                        </div>
                        <div className="my-3">
                            <span>مجموع سبد خرید :  </span>
                            <strong><span className="text-success">
                                {
                                    cartItems.reduce((accumulator: number, current) => {
                                        return accumulator + (+current.price * current.count);
                                    }, 0)
                                }
                            </span></strong>
                        </div>
                        <div className="my-3">
                            <span>مجموع کل :  </span>
                            <strong>
                                <span className="text-success">
                                    {
                                        cartItems.reduce((accumulator: number, current) => {
                                            return accumulator + (+current.price * current.count);
                                        }, 0)
                                    }
                                </span>
                            </strong>
                        </div>
                        <div className="text-center">
                            <button
                                style={{ fontSize: "small" }}
                                onClick={handleClick}
                                className="btn btn-primary w-100">ادامه و انتخاب روش پرداخت
                            </button>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}
export default VerifyAdress;