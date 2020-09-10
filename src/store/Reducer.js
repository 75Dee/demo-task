let initState = {
    flightData:[]
}
const reducer = function(state = initState, action ){
    switch(action.type){
        case'filter_Filght_Data':{
            return{
                ...state,
                flightData:[...action.filter]
            }
        }
        default:
            return state
    }
}
export default reducer