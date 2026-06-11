import { useEffect, useState } from 'react'
import { getList } from '../../api/todoApi'
import useCustomMove from '../../hooks/useCustomMove'
import PageComponent from '../common/PageComponent'

const initState = {
  dtoList: [],
  pageNumList: [],
  pageRequestDTO: null,
  prev: false,
  next: false,
  totalCount: 0,
  prevPage: 0,
  nextPage: 0,
  totalPage: 0,
  current: 0,
}

const ListComponent = () => {
  const { page, size, refresh, moveToList, moveToRead } = useCustomMove()

  const [serverData, setServerData] = useState(initState)
  useEffect(() => {
    getList({ page, size }).then((data) => {
      console.log(data)
      setServerData(data)
    })
  }, [page, size, refresh])

  return (
    <div className="mt-8">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-px bg-ibm-hairline border border-ibm-hairline">
        {serverData.dtoList.map((todo) => (
          <div
            key={todo.tno}
            className="bg-ibm-canvas p-6 cursor-pointer hover:bg-ibm-surface-1 transition-colors"
            onClick={() => moveToRead(todo.tno)}
          >
            <div className="ibm-e-14 mb-2">No. {todo.tno}</div>
            <div className="ibm-ct-24 text-ibm-ink mb-6 font-light">{todo.title}</div>
            <div className="ibm-bsm-14 text-ibm-ink-muted pt-4 border-t border-ibm-hairline">
              {todo.dueDate}
            </div>
          </div>
        ))}
      </div>
      <PageComponent serverData={serverData} movePage={moveToList}></PageComponent>
    </div>
  )
}
export default ListComponent
