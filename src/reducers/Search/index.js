const initSearch = '';

const searchReducer = (state = initSearch, action) =>{
    switch (action.type){
        case 'SEARCH_DATA': {
            let searchKey = action.searchKey;
            return searchKey;
        }
        default : return state
    }
}
export default searchReducer;