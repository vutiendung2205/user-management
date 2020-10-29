const initPagination = {
    page: 0,
    rowPerPage : 5
};

const paginationReducer = (state=initPagination, action) => {
    switch (action.type){
        case "SET_PAGE" :{
            return {...state,page: action.page}
        }
        case "SET_ROW_PER_PAGE": {
            return {...state,rowPerPage: action.rowPerPage}
        }
        default: return state
    }
}
export default paginationReducer;