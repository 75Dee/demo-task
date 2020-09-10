import React from 'react'
import {useSelector , useDispatch} from 'react-redux'
import {filter} from '../config'
import {flightFilter} from '../store/Action'
const Leftsection = ()=>{
    const usedispatch = useDispatch()
    let [yeardata, setyeardata] = React.useState('');
    let [lsuccess, setlsuccess] = React.useState('');
    let [lasuccess, setlasuccess] = React.useState('');
    const mystyle = {
        listTitle:{
            borderBottomWidth: '1px',
            borderBottomStyle: 'solid',
            borderBottomColor: '#ccc',
            fontSize:'20px',
            marginBottom:'5px'
        },
        listStyle :{
            listStyle: "none",
            marginBottom: "5px",
            flexGrow: "0",
            flexShrink: "0",
            flexBasis: "50%",
            maxWidth: "50%"
        },
        button:{
            color:'#000',
            borderRadius:'6px',
            backgroundColor:'#c5e09b',
            borderWidth: '1px',
            borderStyle: 'solid',
            borderColor: '#c5e09b',
            outline: '0px',
            paddingLeft:'15px',
            paddingRight:'15px',
            cursor: 'pointer',
        }

    };
    async function fetchData() {
         let launch = lsuccess ? "&launch_success=" + lsuccess: ''
         let land = lasuccess? "&land_success=" + lasuccess:''
         let year = yeardata ? "&launch_year=" + yeardata :''
         console.log(launch,land,year ,'++++++++++++++++++++++++++++++++')
        if(launch || land || year){
            const res = await fetch("https://api.spaceXdata.com/v3/launches?limit=100"+launch+land+year )
                res.json().then(
                (result) => {
                    if(result){
                        usedispatch(flightFilter(result))
                    }
                },
                (error) => {
                    console.log('getting error')
                }
            )
        }
    }
    const filterObj = useSelector(state => state.reducer.flightData)
    let filterYear = (e ,year , launch , land) =>{
        console.log(launch,land,year ,'+++++++++++---------------+++++++++++++++++++++')

        yeardata = year
        lsuccess = launch
        lasuccess = land
        setyeardata(year => year)
        setlsuccess(launch => launch)
        setlasuccess(land => land)
        fetchData()
    }
    return(
        <>
            <aside className="col-12 col-sm-2">
                <h3><span>Filters</span></h3>
                <section className="text-center">
                    <h4><span style={mystyle.listTitle}>Launch Year</span></h4>
                    <ul className="d-flex justify-content-between flex-wrap">
                        {filter.year.map((year , index)=>(
                            <li style={mystyle.listStyle}  key={index} ><button style={mystyle.button} onClick={(e) => filterYear(e , year , null , null)}>{year}</button></li>
                        ))}
                    </ul>
                    <h4><span style={mystyle.listTitle}>Launch Success</span></h4>
                    <ul className="d-flex justify-content-between flex-wrap">
                        <li style={mystyle.listStyle}><button style={mystyle.button} onClick={(e) => filterYear(e , null , filter.launch[0] , null)}>{filter.launch[0]}</button></li>
                        <li style={mystyle.listStyle}><button style={mystyle.button} onClick={(e) => filterYear(e , null , filter.launch[1] , null)}>{filter.launch[1]}</button></li>
                    </ul>
                    <h4><span style={mystyle.listTitle}>Successfull landing</span></h4>
                    <ul className="d-flex justify-content-between flex-wrap">
                        <li style={mystyle.listStyle}><button style={mystyle.button} 
                        onClick={(e) => filterYear(e , null , null , filter.landing[0])}>{filter.landing[0]}</button></li>
                        <li style={mystyle.listStyle}><button style={mystyle.button} 
                        onClick={(e) => filterYear(e , null , null , filter.landing[1])}>{filter.landing[1]}</button></li>
                    </ul>
                </section>
            </aside>
        </>
    )
}
export default Leftsection