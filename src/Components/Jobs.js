import { useState } from "react";
import "../styles/Jobs.css" ;
import { POST_OPENINGS } from "../CONSTANTS.js";
import Cancel_img from "../assets/cancel.png" ;
import { useNavigate } from "react-router-dom";

const Skill_Label = ({name , formData , setFormData})=>{
    let keyVal = 0 ;
    return(
    <div className="cancel-skill" key={""+(keyVal++)}>
        <div className="skillname ">{name}</div>
        <div onClick={()=>{
          setFormData((prevFormData)=>({
            ...prevFormData , skills : prevFormData.skills.filter((skill)=>skill !== name ) 
          }
          )) 

        }}><img className="cancel-logo" src={Cancel_img} /></div>
    </div>
)
}


const formSubmit = (e ,formData ,  setApplicationStatus , navigate )=>{
 
    e.preventDefault() ;
    
    const XMLBody = {
        name: formData.name,
    number_of_openings: formData.number_of_openings,
    status: formData.status.length > 0 ? true : false,
    skills: [...formData.skills],
    work_location: formData.work_location,
    eligibility: formData.eligibility,
    compensation: formData.compensation,
    imp_note: formData.imp_note,
    responsibilities: formData.responsibilities,
    };
    console.log(XMLBody) ;
    const xhr = new XMLHttpRequest() ;
    xhr.open("POST" , POST_OPENINGS , true) ;
    xhr.setRequestHeader("Content-type" , "application/json") ;
    xhr.onreadystatechange = ()=>{
        if( xhr.readyState == 4 && xhr.status == 200 ){
          setApplicationStatus(xhr.responseText) ;
          navigate("/createform")
        }
        else if( xhr.status != 200 ){
          setApplicationStatus(xhr.responseText) ;
        }
    } ;
    xhr.send(JSON.stringify(XMLBody)) ;
}

const Input = () =>{
const [ApplicationStatus , setApplicationStatus] = useState("") ;
const [skillName , setSkillName] = useState("") ;
const navigate = useNavigate() ;
const [formData ,setFormData ] = useState({
    name: "",
    number_of_openings: "",
    status: "true",
    skills: [],
    work_location: "",
    eligibility: "",
    compensation: "",
    imp_note: "",
    responsibilities: "",
}) ;

const HandleForm = (e)=>{
    console.log(e.target.value) ;
    const {name , value} = e.target ;
    console.log(name + " " + value ) ;
    console.log(name);
    if( name == "skills"){
        setFormData((prevFormData)=>(
            {
                ...prevFormData , skills:[...prevFormData.skills , value ] 
            }
        )) ;
        console.log(formData.skills) ;
    }
    else{
    setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value

      }));
      console.log(formData[name]) ;
    }
}

 return(
    <div className="jobpost-form" >
      <div>
        <label htmlFor="inp-name">Enter Job Name</label>
        <input key="1" type="text" id="inp-name" name="name" value={formData.name}  onChange={HandleForm}  className="inp-name" placeholder="Enter Job Name" />
      </div>
  
      <div>
        <label htmlFor="inp-positions">Enter number of openings:</label>
        <input key="2" type="number" id="inp-positions" name="number_of_openings" onChange={HandleForm}  className="inp-positions" placeholder="Enter number of openings" />
      </div>
  
      <div>
        <label htmlFor="inp-status">Select Status</label>
        <select id="inp-status" name="status">
          <option value="true">Active</option>
          <option value="false">Expired</option>
        </select>
      </div>
  
      <div>
        <label htmlFor="inp-skills">Enter Skills</label>
        <div className="skill-div">
        <input key="3" type="text" id="inp-skills" name="skills" value={skillName} onInput={(e)=>{
          setSkillName(e.target.value) ;
        }} className="inp-skills" placeholder="Enter Skills" />
        <button className="add-skill" onClick={()=>{
          setFormData((prevFormData)=>(
            {
            ...prevFormData , skills : [...prevFormData.skills , skillName] 
            }
          ))
          setSkillName("") ;

        }} >Add Skill</button>
        </div>
        <div id="skill-box">
        {
            formData.skills.map((value)=>(
                <Skill_Label name = {value} formData={formData} setFormData ={setFormData} />
            ))
        }
        </div>
      </div>
  
      <div>
        <label htmlFor="inp-loc">Enter Work Location</label>
        <input key="5" type="text" id="inp-loc" name="work_location" className="inp-loc" onChange={HandleForm} placeholder="Enter Work Location" />
      </div>
  
      <div>
        <label htmlFor="inp-eligibility">Eligibility</label>
        <textarea key="6" type="text" id="inp-eligibility" onChange={HandleForm} name="eligibility" className="inp-eligibility inp-large"  />
      </div>
  
   
      <div>
        <label htmlFor="inp-compensation">Compensation</label>
        <textarea key="7" type="text" id="inp-compensation"  onChange={HandleForm} name="compensation" className="inp-compensation inp-large" />
      </div>
  
  
      <div>
        <label htmlFor="inp-impnote">Important Note</label>
        <textarea key="8" type="text" id="inp-impnote" name="imp_note" onChange={HandleForm} className="inp-impnote inp-large"  />
      </div>
  
  
      <div>
        <label htmlFor="inp-responsibilities">Responsibilities</label>
        <textarea key="9" type="text" id="inp-responsibilities" onChange={HandleForm} name="responsibilities" className="inp-responsibilities inp-large"  />
      </div>
      <div>
      <input onClick={(e)=>{
      formSubmit(e ,formData ,  setApplicationStatus , navigate ) ;
      }} type="submit" value="Next Step"></input>
      </div>
      {
        ApplicationStatus.length > 0 && (<h1>{ApplicationStatus}</h1>)
      }
    </div>
  );
}
  export default Input;
  