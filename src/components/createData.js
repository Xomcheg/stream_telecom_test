import { useState } from "react"
import { AddNewCell } from "./addNewCell"

export const CreateData = ({setNewData, errorJson, data}) => {
  const [value, setValue] = useState('')
  const [addCell, setAddCell] = useState(false)

  const setData = () => {
    setNewData(value)
    setValue('')
  }

  const closeAddNewCell = () => {
    setAddCell(false)
  }

  const downloadData = () => {
    const getData = data.reduce((acc, item) => {
      const obj = {}
      obj.name = item.name
      obj.value = item.value
      acc.push(obj)
      return acc
    }, [])
    setValue(JSON.stringify(getData))
  }

  const displayAddCellForm = addCell && <AddNewCell closeAddNewCell={closeAddNewCell} />

  return (
    <div className="create-data"> 
      <div className="create-data__wrapper">
        <div className='create-data__box'>
          <div className='create-data__title'>Введите данные в формате: <br/>
            [ "name":"name1", "value":"value1" ]
          </div>
          {errorJson && <div className="error-json">Некорректные данные</div>}
          <textarea 
            value={value} 
            className="create-data__text" 
            placeholder="Enter data... " 
            onChange={(e) => setValue(e.target.value)}
          />
        </div>
        {displayAddCellForm}
      </div>
      
      <div className="create-data__btn">
        <button onClick ={setData}>Загрузить JSON</button>
        <button onClick={downloadData}>Сохранить</button>
        
        <button onClick={() => setAddCell(flag => !flag)}>Добавить новый элемент</button>
      </div>
    </div>

  )
}