import React, { useState, useEffect } from 'react'
import { MdCheckCircle } from "react-icons/md";
const VerifyPayment = (props) => {
    const [windowWidth, setWindowWith] = useState(window.innerWidth)
    useEffect(() => {
        window.addEventListener("resize", () => {
            setWindowWith(window.innerWidth)
        })
    }, [])
    return (
        <div className="mt-4 p-3 w-100" style={{ backgroundColor: "#F8F9FA" }}>
            <div className={`text-center mx-auto p-5 ${windowWidth < 500 ? "w-100" : "w-50"}`}
                style={{ boxShadow: "0 5px 8px -3px rgb(0 0 0 / 10%)", borderRadius: "8px", backgroundColor: "#F8F9FA", border: "1px solid lightgray" }}>
                <MdCheckCircle
                    className="p-3"
                    style={{ width: "100px", height: "100px", backgroundColor: "#f3fff9", color: "#3cc9a7", borderRadius: "50%" }}
                />
                <div>
                    <h3>پرداخت موفق</h3>
                </div>
                <div className="mt-4">
                    <h5>باتشکر از خرید شما</h5>
                </div>
            </div>
        </div>
    )
}
export default VerifyPayment;