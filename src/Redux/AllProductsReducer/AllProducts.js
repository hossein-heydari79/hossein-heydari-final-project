
let initialState = {
    allProducts: []
}
const request = (name) => {
    fetch("/" + name)
        .then(response => response.json())
        .then(result => {
            initialState.allProducts = [...initialState.allProducts, ...result.products]
        })
}
['mobile', 'tablet', 'laptop'].map(item => request(item))
const allProductReducer = (state = initialState, action) => {
    switch (action.type) {
        case "search":
        default:
            return state;
    }
};
export default allProductReducer;
