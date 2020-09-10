export const flightFilter = (filter) =>{
    console.log(filter , 'checking action')
    return{
        type:'filter_Filght_Data',
        filter
    }
}