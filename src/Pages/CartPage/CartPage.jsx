import React, { useEffect, useState } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { MdShoppingCart, MdLocalShipping, MdPayment, MdDone } from "react-icons/md";
import routes from "../../Routes/cartRoutes"
import { Route } from 'react-router-dom'
import { useHistory } from 'react-router'
import { useSelector } from 'react-redux'
import { createContext, useReducer } from 'react';
import CartInfoReducer from './CartInfoReducer';
export const context = createContext({})
const CartPage = (props) => {
    const [localState, localDispatch] = useReducer(CartInfoReducer, {
        cart: [],
        userInfo: {},
        postMethod: "",
        paymentMethod: "",
        paymentBank: ""
    })
    const history = useHistory();
    const [windowWidth, setWindowWith] = useState(window.innerWidth)
    const [state, setState] = useState([1, 0, 0, 0])
    useEffect(() => {
        window.addEventListener("resize", () => {
            setWindowWith(window.innerWidth)
        })
    }, [])
    useEffect(() => {
        console.log(history.location.pathname)
        if (history.location.pathname === "/cart") {
            setState([1, 0, 0, 0])
        }
        else if (history.location.pathname === "/cart/verifyaddress") {
            setState([1, 1, 0, 0])
        }
        else if (history.location.pathname === "/cart/payment") {
            setState([1, 1, 1, 0])
        }
        else if (history.location.pathname === "/cart/verifypayment") {
            setState([1, 1, 1, 1])
        }
    }, [history.location.pathname])
    // dispatch({type:"resetCart"})
    return (
        <div className="w-100" style={{ marginTop: `${windowWidth < 992 ? "3rem" : "5rem"}`, backgroundColor: "#F8F9FA" }}>
            <div className="d-flex justify-content-around container w-100 p-2"
                style={{ border: "1px solid gray", borderRadius: "8px", position: "relative", top: "10px", backgroundColor: "#F8F9FA" }}
            >{console.log(localState)}
                <div className="text-center" style={{ opacity: `${state[0] ? 100 : 30}%` }}>
                    <MdShoppingCart style={{ width: "50px", height: "50px", color: "black" }} />
                    <div>تایید سبد خرید</div>
                </div>
                <div style={{ width: "60px", height: "2px", margin: "auto 0", backgroundColor: "black", opacity: `${state[0] ? 100 : 30}%` }}></div>
                <div className="text-center" style={{ opacity: `${state[1] ? 100 : 30}%` }}>
                    <MdLocalShipping style={{ width: "50px", height: "50px", color: "black" }} />
                    <div>انتخاب آدرس و شیوه ارسال</div>
                </div>
                <div style={{ width: "60px", height: "2px", margin: "auto 0", backgroundColor: "black", opacity: `${state[1] ? 100 : 30}%` }}></div>
                <div className="text-center" style={{ opacity: `${state[2] ? 100 : 30}%` }}>
                    <MdPayment style={{ width: "50px", height: "50px", color: "black" }} />
                    <div>انتخاب روش پرداخت</div>
                </div>
                <div style={{ width: "60px", height: "2px", margin: "auto 0", backgroundColor: "black", opacity: `${state[2] ? 100 : 30}%` }}></div>
                <div className="text-center" style={{ opacity: `${state[3] ? 100 : 30}%` }}>
                    <MdDone style={{ width: "50px", height: "50px", color: "black" }} />
                    <div>اتمام سفارش</div>
                </div>
            </div>
            <context.Provider value={{ localState, localDispatch }}>
                <div className="container w-100 d-flex" style={{ backgroundColor: "#F8F9FA" }}>
                    {
                        routes.map((item, index) => {
                            return (
                                <Route
                                    key={index}
                                    path={"/cart" + item.path}
                                    exact={item.exact}
                                    render={(props) => <item.Component {...props} />}
                                />
                            )
                        })
                    }
                </div>
            </context.Provider>
        </div>
    )
}
export default CartPage;