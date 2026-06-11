import { useState, useEffect } from 'react'
import { getOne } from '../../api/todoApi'
import useCustomMove from '../../hooks/useCustomMove'

const initState = {
  tno: 0,
  title: '',
  writer: '',
  dueDate: null,
  complete: false,
}

const ReadComponent = ({ tno }) => {
  const [todo, setTodo] = useState(initState)

  const { moveToList, moveToModify } = useCustomMove()

  useEffect(() => {
    getOne(tno).then((data) => {
      console.log(data)
      setTodo(data)
    })
  }, [tno])

  return (
    <div className="mt-8 border border-ibm-hairline bg-ibm-canvas">
      {makeRow('Tno', todo.tno)}
      {makeRow('Writer', todo.writer)}
      {makeRow('Title', todo.title)}
      {makeRow('Due Date', todo.dueDate)}
      {makeRow('Complete', todo.complete ? 'Completed' : 'Not Yet')}

      <div className="flex justify-end p-6 gap-px bg-ibm-hairline border-t border-ibm-hairline">
        <button type="button" className="ibm-btn ibm-btn-secondary min-w-[160px]" onClick={() => moveToList()}>
          List
        </button>
        <button type="button" className="ibm-btn ibm-btn-primary min-w-[160px]" onClick={() => moveToModify(tno)}>
          Modify
        </button>
      </div>
    </div>
  )
}

const makeRow = (title, value) => (
  <div className="flex border-b border-ibm-hairline">
    <div className="w-1/4 px-6 py-5 ibm-e-14 text-ibm-ink-muted bg-ibm-surface-1 border-r border-ibm-hairline">
      {title}
    </div>
    <div className="w-3/4 px-6 py-5 ibm-b-16 text-ibm-ink">{value}</div>
  </div>
)

export default ReadComponent
