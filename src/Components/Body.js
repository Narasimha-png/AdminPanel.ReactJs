import "../styles/Home.css" ;
import { useNavigate } from "react-router-dom";
const Display_Div = ({name , key})=>(
    <div key={key} className="display-div">
        <h3>{name}</h3>
    </div>
)

const Body = ()=>{
    const navigate = useNavigate() ;
    return(
    <div className="body-div">
    <Display_Div name={"Users"} key={"1"} />
    <Display_Div name={"Applicants"} key={"1"} />
    <div onClick={()=>{
       
        navigate("/openposting")
    }} key={"3"} className="display-div">
        <h3>Post New Opening</h3>
    </div>
    </div>
) ;
}
export default Body ;