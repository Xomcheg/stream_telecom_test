import { useEffect, useState, useRef } from 'react';
import {CreateData} from './components/createData';
import { Table } from './components/table';
import { Context } from './components/context';
import './App.scss';

function App() {
  const [data, setData] = useState()
  const [errorJson, setErrorJson] = useState(false)
  let keyCell = useRef(1)

  const test =  [{"name":"name1", "value":"Test1"}, {"name":"name2", "value":"Test2"}, {"name":"name3", "value":"Test3"}]

  const setInfoForCell = (data) => {
    return data.map((cell, idx) => {
      cell.key = keyCell.current++
      cell.editStatus = false
      cell.idx = idx+1
      return cell
    })
  } 

  const updateIdxData = (data) => {
    return data.map((cell, i) => {
      cell.idx = i + 1
      return cell
    })
  }

  const setStartData = (data) => {
    const newData = setInfoForCell(data)
    setData(newData)
  }

  const setNewData = (data) => {
    try {
      const parseData = JSON.parse(data)
      const newData = setInfoForCell(parseData)
      setErrorJson(false)
      setData(newData)
    } catch (err) {
      setErrorJson(true)
    }
  }

  const toggleEditform = (idx) => {
    const oldCell = data[idx-1]
    const newCell = {...oldCell, editStatus: true }
    const newData = [...data.slice(0, idx-1), newCell, ...data.slice(idx)]
    setData(newData)
  }

  const removeEditStatus = () => {
    const newData = data.slice(0)
    const updateNewData = newData.map(cell => {
      cell.editStatus = false
      return cell
    })
    setData(updateNewData)
  }

  const deleteCell = (idx) => {
    const newData = [...data.slice(0, idx-1), ...data.slice(idx)]
    const updateIdxNewData = updateIdxData(newData)
    setData(updateIdxNewData)
  }

  const addNewCell = (name, value) => {
    const cell = {
      name,
      value,
      key: keyCell.current++,
      editStatus: false,
      idx: data.length ? data.length + 1 : 1
    }
    setData(data => [...data, cell]) 
  }


  const editCellTable = (idx, newIdx, newName, newValue) => {
    const oldCell = data[idx-1]
    const newCell = {
      ...oldCell, 
      editStatus: false,
      name: newName === '' ? oldCell.name : newName,
      value: newValue === '' ? oldCell.value : newValue
    }
    let newData
    if(newIdx !== '') {
      let dataWithoutNewCell = [...data.slice(0, idx-1), ...data.slice(idx)]
      newData = [...dataWithoutNewCell.slice(0, newIdx-1), newCell, ...dataWithoutNewCell.slice(newIdx-1)]
    } else {
      newData = [...data.slice(0, idx-1), newCell, ...data.slice(idx)]
    }
    const updateIdxNewData = updateIdxData(newData)
    setData(updateIdxNewData)
  } 


  useEffect(() => {
    setStartData(test)
  }, [])

  const contextData = {
    data, 
    editCellTable, 
    toggleEditform, 
    removeEditStatus,
    deleteCell,
    addNewCell
  }

  return (
    <div className="app">
      <header className="App-header">
        Test table
      </header>
      <Context.Provider 
        value={contextData}
      >
        <Table 
          data={data}
        />
      <CreateData 
        setNewData={setNewData} 
        errorJson={errorJson}
        data={data}
      />
      </Context.Provider>
    </div>
  );
}

export default App;
