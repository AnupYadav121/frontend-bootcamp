import React, { useState } from "react";

function TableRowData(props) {
  const [propsData,setPropsData] = useState(props.rowData)
  const handleStatusChange = (data) =>{
    if(data==="Issued"){
      setPropsData("Paid");
    }
  }

  if(props.rowData==="Issued" || props.rowData==="Created"){
    return <td> <button onClick={()=>handleStatusChange(propsData)}>{propsData}</button> </td>;
  }else{
    return <td key={props.id}>{props.rowData}</td>;
  }
}

export default TableRowData;
