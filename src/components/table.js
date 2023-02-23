import { TableList } from "./tableList"
export const Table = ({data}) => {
  const displayData = data && data.map(cellData => <TableList key={cellData.key}  cellData={cellData}/>)
  return (
    <ul className="table">  
      {displayData}
    </ul>
  )
}