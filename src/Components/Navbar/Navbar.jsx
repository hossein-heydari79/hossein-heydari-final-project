import React, { useState, useEffect, useCallback } from 'react'
import { MdShoppingCart, MdAccountCircle, MdHome, MdList, MdSearch, MdDelete } from "react-icons/md";
import { Navbar, Nav, Form, FormControl, Badge, Offcanvas, Button } from 'react-bootstrap'
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';


const MyNavbar = () => {
    const history = useHistory()
    const [cartShow, setCartShow] = useState(false)
    const [inputSearch, setInputSearch] = useState("")
    const [searchItems, setSearchItems] = useState()
    const cartItems = useSelector(state => state.cart.cartProducts)
    const allProducts = useSelector(state => state.allProducts.allProducts)
    const [windowWidth, setWindowWith] = useState(window.innerWidth)


    const handleSearch = (event) => {
        const data = event.target;
        console.log(data.value)
        setInputSearch(data.value)
        if (data.value === "")
            setSearchItems([])
        else
            setSearchItems(allProducts.filter((item) => {
                return item.model.toLowerCase().startsWith(data.value.toLowerCase())
            }))
    }
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch({ type: "search", payload: "" })
        window.addEventListener("resize", () => {
            setWindowWith(window.innerWidth)
        })
    }, [])
    const handleSearchClick = (id, category) => {
        setInputSearch("")
        setSearchItems([])
        history.push(`/productdetails${id}?category=${category}`)
    }
    //navbar scrollong
    const [scroll, setScroll] = useState(window.scrollY);
    const [navbarShow, setNavbarShow] = useState(true)
    const handleNavigation = useCallback(
        e => {
            const window = e.currentTarget;
            if (scroll > window.scrollY) {
                setNavbarShow(true)
            } else if (scroll < window.scrollY) {
                setNavbarShow(false)
            }
            setScroll(window.scrollY);
        }, [scroll]
    );
    useEffect(() => {
        setScroll(window.scrollY);
        window.addEventListener("scroll", handleNavigation);
        return () => {
            window.removeEventListener("scroll", handleNavigation);
        };
    }, [handleNavigation]);
    //navbar scrollong
    const [categoryShow, setCategoryShow] = useState(false)
    const [searchShow, setSearchShow] = useState(false)
    const mbileBrands = ["categorymobile", 'samsung', 'apple'];
    const tabletBrands = ["categorytablet", 'samsung', 'apple', "microsoft"];
    const laptopBrands = ["categorylaptop", 'Acer', 'Asus', 'MSI'];
    const [brand, setBrand] = useState(mbileBrands)
    const [cartIconStyle, setCartIconStyle] = useState("#b8e3e6")
    const [userIconStyle, setUserIconStyle] = useState("#b8e3e6")

    const [showCategory, setshowCategory] = useState(false);
    const handleClose = () => setshowCategory(false);
    const handleShow = () => setshowCategory(true);
    const handleCloseSearch = () => setSearchShow(false);
    const handleShowSearch = () => setSearchShow(true);
    const [userAccount, setUserAccount] = useState(false)
    const userInfo = useSelector(state => state.User)
    return (
        <Navbar fixed="top" bg="white" expand="lg" className="w-100 d-flex flex-column" style={{ borderBottom: "1px solid gray" }}>
            <div className="w-100 d-flex justify-content-between container">
                <Navbar.Brand className="" onClick={() => history.push("/homepage")} href="#">دیجی کالا</Navbar.Brand>
                {windowWidth > 500 &&
                    <Form className="d-flex flex-column align-items-end mx-auto" style={{ width: "50%" }}>
                        <div className="w-75" style={{ position: "relative" }}>
                            <div className="w-100 mx-auto" style={{ position: "relative" }}>
                                <FormControl
                                    type=""
                                    placeholder="به دنبال چه چیزی می گردید؟"
                                    className="mr-2"
                                    aria-label="Search"
                                    onChange={handleSearch}
                                    value={inputSearch}
                                    style={{ borderRadius: "35px", backgroundColor: "#fbfbfb", fontSize: "0.8rem" }}
                                />
                                <MdSearch
                                    style={{ position: "absolute", bottom: "9px", left: "8px" }} />
                            </div>
                            <div className="bg-light w-100"
                                style={{
                                    minWidth: "300px",
                                    // height: `${searchItems ? searchItems.length * 100 > 500 ? 400 : searchItems.length * 100 : 0}px`,
                                    maxHeight: "400px",
                                    position: "absolute", left: "0", overflowY: "auto"
                                }}>
                                {
                                    searchItems?.map((item) => {
                                        return (
                                            <div
                                                style={{ borderBottom: "1px solid lightgray" }}
                                                onClick={() => handleSearchClick(item.id, item.category)}
                                                className="d-flex justify-content-center align-items-center w-100 my-4 pb-3">
                                                <div><img style={{ width: "80px", height: "80px" }} src={item.image} alt="" /></div>
                                                <div className="p-3">
                                                    <div>مدل : {item.model}</div>
                                                </div>
                                                <div className="p-3">
                                                    <div>نوع : {item.category}</div>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </Form>}
                {windowWidth > 500 &&
                    <div className="d-flex flex-row-reverse" style={{ width: "22%" }}>
                        <Nav.Link style={{ position: "relative" }}>
                            <div style={{ position: "relative" }}
                                onMouseEnter={() => setCartShow(!cartShow)}
                                onMouseLeave={() => setCartShow(!cartShow)}
                            >
                                <Badge pill bg="warning"
                                    style={{ position: "absolute", color: "black" }}
                                >
                                    {cartItems.length}
                                </Badge>
                                <MdShoppingCart
                                    onMouseEnter={() => setCartIconStyle("#06a0a7")}
                                    onMouseLeave={() => setCartIconStyle("#b8e3e6")}
                                    style={{
                                        width: "40px",
                                        height: "40px",
                                        padding: "5px",
                                        // backgroundColor: `${cartIconStyle}`,
                                        borderRadius: "50%",
                                        color: "black"
                                    }} />
                                {
                                    cartShow &&
                                    <div style={{
                                        position: "absolute", left: "0",
                                        height: "300px"
                                    }}>
                                        <div className="bg-light"
                                            style={{
                                                width: "400px", overflowY: "auto",
                                                // height: `${cartItems ? cartItems.length * 100 > 350 ? 400 : cartItems.length * 120 : 0}px`
                                                maxHeight: "400px",
                                                borderRadius: "3px",
                                            }}>
                                            <div>
                                                {
                                                    cartItems.map((item) => {
                                                        return (
                                                            <div className="d-flex w-100 p-3 text-dark justify-content-center align-items-center" style={{ borderBottom: "1px solid lightgray" }}>
                                                                <div className="w-100 text-center mx-5">
                                                                    <img style={{ width: "100px", height: "100px" }} src={item.image} alt="" />
                                                                </div>
                                                                <div className="w-100 d-flex">
                                                                    <div className="d-flex flex-column justify-content-between align-items-center">
                                                                        <div className="m-2">{item.model}</div>
                                                                        <div className="m-2">{(+item.price) * (+item.count)}تومان</div>
                                                                        <div className="d-flex align-items-center">
                                                                            <div
                                                                                onClick={() => dispatch({ type: "addProduct", payload: { id: item.id, model: item.model, action: "increase" } })}
                                                                                style={{ fontSize: "22px" }}
                                                                            >+</div>
                                                                            <div className="mx-2">{item.count}</div>
                                                                            <div
                                                                                onClick={() => dispatch({ type: "addProduct", payload: { id: item.id, model: item.model, action: "decrease" } })}
                                                                                style={{ fontSize: "35px" }}
                                                                            >-
                                                                            </div>
                                                                        </div>
                                                                    </div>

                                                                </div>
                                                                <div className="w-100 d-flex justify-content-center align-items-center">
                                                                    <MdDelete
                                                                        onClick={() => dispatch({ type: "delteProduct", payload: { id: item.id, model: item.model } })}
                                                                        style={{ width: "30px", height: "30px", color: "#E05C5C", marginRight: "10px" }} />
                                                                </div>
                                                            </div>
                                                        )
                                                    })
                                                }
                                            </div>
                                        </div>
                                        <div className="bg-light" style={{
                                            width: "400px",
                                            borderRadius: "12px", border: "1px solid gray", backgroundColor: "rgb(251,251,251)"
                                        }}>
                                            {
                                                cartItems.length === 0 ?
                                                    <div className="text-center p-4 text-dark">سبد خرید خالی است</div> :
                                                    <div className="text-center text-dark">
                                                        <button
                                                            onClick={() => history.push("/cart")}
                                                            className="btn btn-success w-100">ثبت سفارش</button>
                                                    </div>
                                            }
                                        </div>
                                    </div>
                                }
                            </div>
                        </Nav.Link>
                        <Nav.Link href="#link" >
                            <div
                                onMouseEnter={() => setUserAccount(true)}
                                onMouseLeave={() => setUserAccount(false)}
                            >
                                <MdAccountCircle
                                    onMouseEnter={() => setUserIconStyle("#06a0a7")}
                                    onMouseLeave={() => setUserIconStyle("#b8e3e6")}
                                    style={{
                                        width: "40px",
                                        height: "40px",
                                        padding: "5px",
                                        // backgroundColor: `${userIconStyle}`,
                                        borderRadius: "50%",
                                        color: "black"
                                    }}
                                />
                                {
                                    userAccount &&
                                    <div
                                        className="p-3"
                                        style={{ width: "", maxHeight: "85px", position: "fixed", borderRadius: "10px", border: "1px solid gray", backgroundColor: "rgb(251,251,251)" }}>
                                        <div style={{ color: "black" }}>
                                            {
                                                userInfo.firstName + " " + userInfo.lastName
                                            }
                                        </div>
                                        {
                                            userInfo.isLogin &&
                                            <div style={{ color: "blue" }} onClick={() => dispatch({ type: "logout" })}>
                                                خروج از حساب
                                            </div>
                                        }
                                        {
                                            !userInfo.isLogin &&
                                            <div
                                                onClick={() => history.push("/login")}
                                            >ورود به حساب
                                            </div>
                                        }
                                        {
                                            !userInfo.isLogin &&
                                            <div
                                                onClick={() => history.push("/register")}
                                            >ثبت نام
                                            </div>
                                        }
                                    </div>
                                }
                            </div>
                        </Nav.Link>
                    </div>}
            </div>
            <div className="w-100 container">
                {
                    windowWidth < 500 &&
                    <div
                        className="w-100 bg-white p-2 d-flex justify-content-around"
                        style={{ position: "fixed", left: "0", bottom: "0" }}>
                        <div className="d-flex flex-column text-center">
                            <MdHome
                                onClick={() => history.push("/homepage")}
                                style={{ width: "40px", height: "40px", color: "#019ca7" }}
                            />
                            <span style={{ fontSize: "smaller" }}>خانه</span>
                        </div>
                        <div className="d-flex flex-column text-center">
                            <MdList
                                onClick={handleShow}
                                style={{ width: "40px", height: "40px", color: "#019ca7" }}
                            />
                            <span style={{ fontSize: "smaller" }}>دسته بندی</span>
                        </div>
                        <div className="d-flex flex-column text-center">
                            <MdShoppingCart
                                onClick={() => history.push("/cart")}
                                style={{ width: "40px", height: "40px", color: "#019ca7" }}
                            />
                            <span style={{ fontSize: "smaller" }}>سبد خرید</span>
                        </div>
                        <div className="d-flex flex-column text-center">
                            <MdSearch
                                onClick={handleShowSearch}
                                style={{ width: "40px", height: "40px", color: "#019ca7" }}
                            />
                            <span style={{ fontSize: "smaller" }}>جستجو</span>
                        </div>
                        <div className="d-flex flex-column text-center">
                            <MdAccountCircle
                                style={{ width: "40px", height: "40px", color: "#019ca7" }}
                            />
                            <span style={{ fontSize: "smaller" }}>حساب</span>
                        </div>
                    </div>
                }
                <Offcanvas className="w-100" show={showCategory} onHide={handleClose} placement="end">
                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title>دسته بندی</Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        <div style={{ textDecoration: "none" }} >
                            <div
                                onClick={() => { history.push("/categorymobile"); handleClose() }}
                                className="my-2 p-1">گوشی</div>
                            <ul>
                                {
                                    mbileBrands.map((item, index) => {
                                        if (index > 0)
                                            return (
                                                <li
                                                    onClick={() => { history.push(`/${mbileBrands[0]}?brand=${item}`); handleClose() }} key={Math.random() * 1000}>
                                                    {item}
                                                </li>
                                            )
                                    })
                                }
                            </ul>
                        </div>
                        <div style={{ textDecoration: "none" }} >
                            <div
                                onClick={() => { history.push("/categorytablet"); handleClose() }}
                                className="my-2 p-1">تبلت</div>
                            <ul>
                                {
                                    tabletBrands.map((item, index) => {
                                        if (index > 0)
                                            return (
                                                <li
                                                    onClick={() => { history.push(`/${tabletBrands[0]}?brand=${item}`); handleClose() }} key={Math.random() * 1000}>
                                                    {item}
                                                </li>
                                            )
                                    })
                                }
                            </ul>
                        </div>
                        <div style={{ textDecoration: "none" }} >
                            <div
                                onClick={() => { history.push("/categorylaptop"); handleClose() }}
                                className="my-2 p-1">لپ تاپ</div>
                            <ul>
                                {
                                    laptopBrands.map((item, index) => {
                                        if (index > 0)
                                            return (
                                                <li
                                                    onClick={() => { history.push(`/${laptopBrands[0]}?brand=${item}`); handleClose() }} key={Math.random() * 1000}>
                                                    {item}
                                                </li>
                                            )
                                    })
                                }
                            </ul>
                        </div>
                    </Offcanvas.Body>
                </Offcanvas>
                <Offcanvas className="w-100" show={searchShow} onHide={handleCloseSearch} placement="end">
                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title>جستجو</Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        <Form.Control onChange={handleSearch}
                            style={{ borderRadius: "24px" }}
                            className="w-100" type="text" placeholder="به دنبال چه چیزی میگردید..." />
                        {
                            searchItems?.map((item) => {
                                return (
                                    <div
                                        onClick={() => { handleSearchClick(item.id, item.category); handleCloseSearch() }}
                                        className="d-flex w-100">
                                        <div className="w-50"><img className="w-100" src={item.image} alt="" /></div>
                                        <div className="w-50 p-4">
                                            <div>{item.model}</div>
                                            <div>{item.category}</div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </Offcanvas.Body>
                </Offcanvas>
                <Nav
                    className={`d-flex flex-row w-100`}
                    activeKey="/home"
                >   <div
                    onMouseEnter={() => setCategoryShow(true)}
                    onMouseLeave={() => setCategoryShow(false)}
                >
                        <Nav.Item className="">
                        </Nav.Item></div>
                    <Nav.Item>
                        <Nav.Link onClick={() => history.push("/categorymobile")}>گوشی</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link onClick={() => history.push("/categorytablet")}>تبلت</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link onClick={() => history.push("/categorylaptop")}>لپ تاپ</Nav.Link>
                    </Nav.Item>
                </Nav>
            </div>
        </Navbar>
    )
}
export default MyNavbar;