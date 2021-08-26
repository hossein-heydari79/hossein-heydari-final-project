import React, { useEffect, useState } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Button, Modal } from 'react-bootstrap'
import { MdDelete } from "react-icons/md";
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router'
import { context } from '../CartPage'
import { useContext } from 'react';
const CartView = (props) => {
    const { localState, localDispatch } = useContext(context)
    const cartItems = useSelector(state => state.cart.cartProducts)
    const history = useHistory();
    const dispatch = useDispatch()
    const [modalItem, setModalItem] = useState()
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = (item) => {
        setModalItem(item)
        setShow(true);
    }
    const handleRemove = () => {
        modalItem && dispatch(
            { type: "delteProduct", payload: { id: modalItem.id, model: modalItem.model } })
        handleClose()
    }
    const [windowWidth, setWindowWith] = useState(window.innerWidth)
    useEffect(() => {
        window.addEventListener("resize", () => {
            setWindowWith(window.innerWidth)
        })
    }, [])
    // dispatch({type:"resetCart"})
    const handleClick = () => {
        localDispatch({ type: "addCart", payload: cartItems })
        history.push("/cart/verifyaddress")
    }
    return (
        <div className="container w-100 d-flex">
            <div className={`${windowWidth < 500 ? "w-100" : "w-75"}`}>
                {
                    cartItems.map((item) => {
                        return (
                            <div key={Math.random() * 3213} className="row bg-white p-2 m-4 rounded"
                                style={{ boxShadow: "0 5px 8px -3px rgb(0 0 0 / 10%)", borderRadius: "8px" }}
                            >
                                <div className={`${windowWidth < 500 ? "col12" : "col-4"} 
                                    text-center`}>
                                    <img className="w-100" style={{ maxWidth: "150px" }} src={item.image} alt="" />
                                </div>
                                <div className={`${windowWidth < 500 ? "col12" : "col-4"} 
                                    d-flex flex-column justify-content-around my-2`}>
                                    <div className="text-center">{item.model}</div>
                                    <div className="text-center d-flex justify-content-center align-items-center">
                                        <div
                                            style={{ fontSize: "25px", cursor: "pointer" }}
                                            onClick={() => dispatch({ type: "addProduct", payload: { id: item.id, model: item.model, action: "increase" } })}
                                        >+</div>
                                        <span className="mx-2">{item.count}</span>
                                        <div
                                            style={{ fontSize: "40px", cursor: "pointer" }}
                                            onClick={() => dispatch({ type: "addProduct", payload: { id: item.id, model: item.model, action: "decrease" } })}
                                        >-</div>
                                    </div>
                                </div>
                                <div className={`${windowWidth < 500 ? "col12" : "col-4"} 
                                    py-4 d-flex flex-column justify-content-between align-items-center`}>
                                    <div className="d-flex flex-row-reverse">
                                        <MdDelete
                                            onClick={() => handleShow(item)}
                                            style={{ width: "30px", height: "30px", color: "red", opacity: "60%", cursor: "pointer" }} />
                                    </div>
                                    <div>
                                        <div>
                                            <span>قیمت واحد : </span>
                                            <strong><span className="text-success">{item.price}</span></strong>
                                        </div>
                                        <div>
                                            <span>قیمت کامل : </span>
                                            <strong><span className="text-success">{+item.price * item.count}</span></strong>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
                <Modal show={show} onHide={handleClose} style={{ position: "fixed", top: "25%" }}>
                    <Modal.Body className="p-5">
                        <div className="text-center">
                            <MdDelete className="p-4" style={{ width: "130px", height: "130px", color: "red", backgroundColor: "#FFEFEF", borderRadius: "50%" }} />
                            <h4 className="my-3">آیا از حذف این محصول اطمینان دارید؟</h4>
                        </div>
                        <div className="text-center my-3">
                            <Button className="mx-2" variant="outline-secondary" onClick={handleClose}>
                                لغو
                            </Button>
                            <Button className="mx-2" variant="success" onClick={handleRemove}>
                                بله حذف کن
                            </Button>
                        </div>
                    </Modal.Body>
                </Modal>
                {windowWidth < 500 &&
                    <Button className="w-100"
                        style={{
                            position: "sticky", left: "0", bottom: "12%",
                            backgroundColor: "#3BC9A7"
                        }}
                        onClick={handleClick}
                    >
                        ادامه و انتخاب آدرس و شیوه ارسال
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
                                    cartItems.reduce((accumulator: number, current: ICartProducts) => {
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
                                        cartItems.reduce((accumulator: number, current: ICartProducts) => {
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
                                className="btn btn-primary w-100">
                                ادامه و انتخاب آدرس و شیوه ارسال
                            </button>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}
export default CartView;