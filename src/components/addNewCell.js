import { useState, useContext } from "react"
import { Context } from "./context"


export const AddNewCell = ({closeAddNewCell}) => {
  const [name, setName] = useState('')
  const [value, setValue] = useState('')
  const {addNewCell} = useContext(Context)

  const checkCellData = () => {
    if (name === '' || value === '') return
    addNewCell(name, value)
    closeAddNewCell()
  }

  return (
    <div className="new-cell">
      <form className="new-cell__form" onSubmit={(e) => e.preventDefault()}>
        <label className="new-cell__wrapper">
          <span>Введите имя</span>
          <input 
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder='Ведите имя'
          />
        </label>
        <label className="new-cell__wrapper">
          <span>Введите значение</span>
          <input 
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder='Ведите значение'
          />
        </label>
        <div className="new-cell__btn">
          <button onClick ={checkCellData}>Добавить</button>
          <button onClick ={closeAddNewCell}>Отмена</button>
        </div>

      </form>
    </div>
  )
}