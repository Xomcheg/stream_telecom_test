import { useContext } from "react"
import { EditForm } from "./editForm"
import { Context } from "./context"

export const TableList = ({cellData}) => {
  const {idx, name, value, editStatus} = cellData
  const {toggleEditform} = useContext(Context)

  const displayEditForm = editStatus && <EditForm toggleEditform={toggleEditform}  cellData={cellData}/>

  return (
    <>
      {displayEditForm}
      <li 
        className='table-list' 
        onClick={() => toggleEditform(idx)} 
      >
        <span className='table-list__title' >{name}</span>
        <span className='table-list__text' >{value}</span>
      </li>
    </>

  )
}