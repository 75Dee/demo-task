import React ,{ useState ,useEffect } from "react"
import {useSelector , useDispatch} from 'react-redux'
import {flightFilter} from '../store/Action'
const Rightsection = ()=>{
    const filterObj = useSelector(state => state.reducer.flightData)
    const usedispatch = useDispatch()
    async function fetchData() {
        const res = await fetch("https://api.spaceXdata.com/v3/launches?limit=100&amp;launch_success=true")
            res.json().then(
            (result) => {
                //setcard(result)
                if(result){
                    usedispatch(flightFilter(result))
                }
            },
            (error) => {
                console.log('getting error')
            }
        )
    }
    useEffect(()=>{
        fetchData();
    }, [])
    return(
        <>
        <section className="col-12 col-sm-10">
            <div className="row">
                {filterObj.length > 0 ?(
                    filterObj.map((data , index) =>(
                        <div key={index} className="col-12 col-sm-3">
                            <div  key={index} className="card card-top mb-2">
                                <div className="card-wrapper d-flex align-items-center justify-content-center">
                                {data.links.mission_patch_small ?(<img className="card-img-top" src={data.links.mission_patch_small} alt="Card image cap" />):('no Image found')}
                                </div>
                                <div className="p-2 text-left ">
                                    <a className=""><strong>{data.mission_name ? data.mission_name:''} #{data.flight_number ? data.flight_number:''}</strong></a>
                                    <div><strong>Mission Ids :</strong>
                                        {data.mission_id ?
                                            data.mission_id.map((id , index)=>(
                                            <span key={index}>{id}</span>
                                            )):('')
                                        }
                                    </div>
                                    <div><strong>Launch Year :</strong>{data.launch_year ? data.launch_year:''}</div>
                                    <div><strong>Successful Launch :</strong>{data.launch_success ?'Yes':'No'}</div>
                                    <div><strong>Successful Landing :</strong>{data.launch_landing ?'Yes':'No'}</div>
                                </div>
                            </div>
                        </div> 
                    ))
                ):('No data')
                }
            </div>
            </section>
        </>
    )
}

export default Rightsection