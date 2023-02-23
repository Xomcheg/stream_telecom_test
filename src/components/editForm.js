import { useContext, useState } from "react"
import { Context } from "./context"

export const EditForm = ({cellData}) => {
  const { name, value, idx} = cellData

  const [newIdx, setNewIdx] = useState('')
  const [newName, setNewName] = useState('')
  const [newValue, setNewValue] = useState('')
  const {editCellTable, removeEditStatus, deleteCell} = useContext(Context)


  return (
    <div className="edit-form" >
      <form 
        className="edit-form__data" 
        onSubmit={(e) => e.preventDefault()} 
      >
        <label className="edit-form__data-wrapper">
          <span>
            Текущая позиция = {idx}
          </span>
          <input 
            value={newIdx} 
            type='text' 
            placeholder="Введите новую позицию для текущей ячейки"
            onChange={(e) => setNewIdx(e.target.value) }
          />
        </label>
        <label className="edit-form__data-wrapper">
          <span>
            name = {name}
          </span>
          <input 
            value={newName} 
            type='text' 
            placeholder="Введите новое имя"
            onChange = {(e) => setNewName(e.target.value)}
          />
        </label>
        <label className="edit-form__data-wrapper">
          <span>
            value = {value}
          </span>
          <input 
            value = {newValue} 
            type='text' 
            placeholder="Введите новое значение"
            onChange ={(e) => setNewValue(e.target.value)}
          />
        </label>
        <div className="edit-form__btn">
          <button onClick={() => deleteCell(idx)}>Удалить</button>
          <button onClick={() => editCellTable(idx, newIdx, newName, newValue)}>Изменить</button>
          <button onClick={removeEditStatus}>Отмена</button>
        </div>
        
      </form>
    </div>
  )
}