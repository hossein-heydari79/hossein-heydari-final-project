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
        <div className="w-100" style={{ marginTop: "7rem", backgroundColor: "#fbfbfb" }}>
            {/* <div className="container p-3">
                <span>{product?.model}</span>
                <span style={{ cursor: "pointer" }} onClick={() => history.push(`/category${product?.category}`)}> &lt; {product?.category}</span>
                <span style={{ cursor: "pointer" }} onClick={() => history.push("/homepage")}> &lt; home</span>
            </div> */}
            <div className="container w-100">
                <div className="w-100 d-flex bg-white p-3 card-container">
                    <div className="row w-100">
                        <div className="col-lg-5 col-12">
                            <PhotoViewr photo={product?.image} />
                        </div>
                        <div className="col-lg-3 col-12">
                            <div className="text-center my-3">
                                <h1>{product?.model}</h1>
                            </div>
                        </div>
                        <div className="col-lg-4 col-12">
                            <div className="bg-light text-center rounded w-100 p-3"
                                style={{ boxShadow: "rgb(0 0 0 / 10%) -1px 7px 12px 7px", borderRadius: "8px" }}
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
                    <Nav variant="tabs" className="my-2 p-2 card-container" defaultActiveKey="/home">
                        <Nav.Item>
                            <Nav.Link href="#specs">مشخصات</Nav.Link>
                        </Nav.Item>
                        {/* <Nav.Item>
                            <Nav.Link href="#comments">دیدگاه کاربران</Nav.Link>
                        </Nav.Item> */}
                        <Nav.Item>
                            <Nav.Link href="#addComments">افزودن نظر</Nav.Link>
                        </Nav.Item>
                    </Nav>
                    <div className="w-100 my-5 p-2" id="specs">
                        <div className="container">
                            <h3>مشخصات</h3>
                            <Table>
                                <tbody>
                                    <tr>
                                        <td className="p-3" style={{ width: "30%", backgroundColor: "white" }}>پردازنده</td>
                                        <td className="bg-white p-3">{product?.specifications?.cpu}</td>
                                    </tr>
                                    <tr>
                                        <td className="p-3" style={{ width: "30%", backgroundColor: "white" }}>حافظه داخلی</td>
                                        <td className="bg-white p-3">{product?.specifications?.rom}</td>
                                    </tr>
                                    <tr>
                                        <td className="p-3" style={{ width: "30%", backgroundColor: "white" }}>رم</td>
                                        <td className="bg-white p-3">{product?.specifications?.ram}</td>
                                    </tr>
                                    <tr>
                                        <td className="p-3" style={{ width: "30%", backgroundColor: "white" }}>صفحه نمایش</td>
                                        <td className="bg-white p-3">{product?.specifications?.display}</td>
                                    </tr>
                                </tbody>
                            </Table>
                        </div>
                    </div>

                    {/* <div id="comments" className="my-5 p-2 card-container">
                        <h3>دیدگاه کاربران</h3>
                        <hr />
                        <div className="bg-light">
                            <h6>ممد زامبی</h6>
                            <p>
                                آقا مفتش گرونه نخرید که رفته تو پاچتون.از ما گفتن بود از شما نشنیدن
                            </p>
                        </div>
                        <div className="bg-light">
                            <h6>علی راستگو</h6>
                            <p>
                                بهترین گوشی دنیاس رو دستش نیومده و دیگه هم نمیاد تامام
                            </p>
                        </div>
                        {
                            product?.comments && product?.comments.map((comment, index) => (
                                <div className="bg-light">
                                    <h6>{comment.name}</h6>
                                    <p>
                                        {comment.comment}
                                    </p>
                                </div>
                            ))
                        }
                    </div> */}
                    <div>
                        <ProductSlider url={`/${category}`} title="محصولات مرتبط" textColor="text-black" />
                    </div>
                    {/* <div id="addComments" className="my-2 p-2 w-100 card-container">
                        <h3>افزودن دیدگاه</h3>

                        <hr />
                        <Form
                            onSubmit={handleCommentSubmit}
                            onChange={handleComment}
                            className={`${windowWidth < 500 ? "w-100" : "w-50"}`}>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>نام</Form.Label>
                                <Form.Control name="name" type="text" placeholder="نام خود را وارد کنید" />
                                <Form.Label>آدرس ایمیل</Form.Label>
                                <Form.Control name="email" type="email" placeholder="ایمیل خود را وارد کنید" />
                                <Form.Label>دیدگاه شما</Form.Label>
                                <Form.Control name="comment" as="textarea" rows={3} />
                            </Form.Group>
                            <button className="btn btn-primary">ثبت نظر</button>
                        </Form>
                    </div> */}
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