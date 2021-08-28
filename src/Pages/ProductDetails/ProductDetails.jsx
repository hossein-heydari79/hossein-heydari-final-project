import React, { useState, useEffect } from 'react'
import { RouteComponentProps } from 'react-router'
import { useParams, useLocation } from 'react-router'
import PhotoViewr from '../../Components/PhotoViewer/PhotoViewr'
import { Form, Nav, Table } from 'react-bootstrap'
import { useHistory } from 'react-router'
import { MdShoppingCart } from "react-icons/md";
import ProductSlider from '../../Components/ProductSlider/ProductSlider'
import './ProductDetails.style.css'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const ProductDetails = (props) => {
    const [comment, setComment] = useState({
        name: "",
        email: "",
        comment: ""
    })
    const [windowWidth, setWindowWith] = useState(window.innerWidth)
    const dispatch = useDispatch()
    const [items, setItems] = useState([])
    const location = useLocation()
    const { id } = useParams();
    const product = items.find(item => item.id === id)
    const searchParams = new URLSearchParams(location.search);
    const category = searchParams.get("category")
    const history = useHistory()
    const request = (url, name) => {
        fetch(url)
            .then(response => response.json())
            .then(result => {
                console.log(result.products)
                setItems(result.products)
            })
    }
    useEffect(() => {
        request(`/${category}`, "" + category)
        window.addEventListener("resize", () => {
            setWindowWith(window.innerWidth)
        })
    }, [])
    const handleComment = (event) => {
        const data = event.target;
        console.log(data.value)
        setComment({ ...comment, [data.name]: data.value })
    }
    const handleCommentSubmit = (event) => {
        event.preventDefault()
        console.log(comment)
        axios.post("/comment", {
            comment,
            id,
            category
        }).then((res) => {
            console.log(res.data)
        })
    }
    const handleAddProduct = () => {
        dispatch({ type: "addProduct", payload: product })
        toast.success('کالا به سبد خرید اضافه شد', {
            position: "bottom-left",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }
    return (
        <div className="w-100" style={{ marginTop: "7rem", backgroundColor: "#F8F9FA" }}>
            <div className="container w-100" style={{ backgroundColor: "#F8F9FA" }}>
                <div className="w-100 d-flex p-3 card-container" style={{ backgroundColor: "#F8F9FA" }}>
                    <div className="row w-100">
                        <div className="col-lg-5 col-12">
                            <PhotoViewr photo={product?.image} />
                        </div>
                        <div className="col-lg-3 col-12" style={{ backgroundColor: "#F8F9FA" }}>
                            <div className="text-center my-3">
                                <h1>{product?.model}</h1>
                            </div>
                        </div>
                        <div className="col-lg-4 col-12">
                            <div className="text-center rounded w-100 p-3"
                                style={{ border: "1px solid lightgray", borderRadius: "8px", backgroundColor: "#F8F9FA" }}
                            >
                                <h5 className="py-4">فروشنده:دیجی کالا</h5>
                                <hr />
                                <select className="my-2" name="" id="">
                                    <option value="">انتخاب گارانتی</option>
                                    <option value="">گارانتی 18 ماهه دیجی کالا</option>
                                </select>
                                <hr />
                                <h6>موجود در انبار</h6>
                                <hr />
                                <h4 className="my-2">{product?.price} تومان</h4>
                                <button
                                    onClick={handleAddProduct}

                                    className="btn text-white w-100 my-3 p-3 bg-primary">
                                    <MdShoppingCart className="mx-2" /><span>افزودن به سبد خرید</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-100">
                    <div className="w-100 my-5 p-2" id="specs">
                        <div className="container">
                            <h3>مشخصات</h3>
                            <Table>
                                <tbody>
                                    <tr>
                                        <td className="p-3" style={{ width: "30%" }}>پردازنده</td>
                                        <td className="p-3">{product?.specifications?.cpu}</td>
                                    </tr>
                                    <tr>
                                        <td className="p-3" style={{ width: "30%" }}>حافظه داخلی</td>
                                        <td className="p-3">{product?.specifications?.rom}</td>
                                    </tr>
                                    <tr>
                                        <td className="p-3" style={{ width: "30%" }}>رم</td>
                                        <td className="p-3">{product?.specifications?.ram}</td>
                                    </tr>
                                    <tr>
                                        <td className="p-3" style={{ width: "30%" }}>صفحه نمایش</td>
                                        <td className="p-3">{product?.specifications?.display}</td>
                                    </tr>
                                </tbody>
                            </Table>
                        </div>
                    </div>
                    <div>
                        <ProductSlider url={`/${category}`} title="محصولات مرتبط" textColor="text-black" />
                    </div>
                </div>
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
export default ProductDetails;