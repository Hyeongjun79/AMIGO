import { useEffect, useState } from 'react'
import { deleteOne, getOne, putOne } from '../../api/todoApi'
import useCustomMove from '../../hooks/useCustomMove'
import ResultModal from '../common/ResultModal'

const initState = {
  tno: 0,
  title: '',
  writer: '',
  dueDate: null,
  complete: false,
}

const ModifyComponent = ({ tno }) => {
  const [todo, setTodo] = useState({ ...initState })
  const [result, setResult] = useState(null)
  const { moveToList, moveToRead } = useCustomMove()

  useEffect(() => {
    getOne(tno).then((data) => setTodo(data))
  }, [tno])

  const handleClickModify = () => {
    putOne(todo).then((data) => {
      setResult('Modified')
    })
  }
  const handleClickDelete = () => {
    deleteOne(tno).then((data) => {
      setResult('Deleted')
    })
  }
  const colseModal = () => {
    if (result === 'Deleted') {
      moveToList()
    } else {
      moveToRead(tno)
    }
  }

  const handleChangeTodo = (e) => {
    todo[e.target.name] = e.target.value
    setTodo({ ...todo })
  }
  const handleChangeTodoComplete = (e) => {
    const value = e.target.value
    todo.complete = value === 'Y'
    setTodo({ ...todo })
  }

  return (
    <div className="mt-8 border border-ibm-hairline bg-ibm-canvas">
      {result ? <ResultModal title={'처리결과'} content={result} callbackFn={colseModal}></ResultModal> : <></>}
      <FormRow label="TNO">
        <div className="ibm-b-16 text-ibm-ink-muted">{todo.tno}</div>
      </FormRow>
      <FormRow label="WRITER">
        <div className="ibm-b-16 text-ibm-ink-muted">{todo.writer}</div>
      </FormRow>
      <FormRow label="TITLE">
        <input
          className="ibm-input"
          name="title"
          type="text"
          value={todo.title}
          onChange={handleChangeTodo}
        />
      </FormRow>
      <FormRow label="DUE DATE">
        <input
          className="ibm-input"
          name="dueDate"
          type="date"
          value={todo.dueDate}
          onChange={handleChangeTodo}
        />
      </FormRow>
      <FormRow label="COMPLETE">
        <select
          name="status"
          className="ibm-input cursor-pointer"
          onChange={handleChangeTodoComplete}
          value={todo.complete ? 'Y' : 'N'}
        >
          <option value="Y">Completed</option>
          <option value="N">Not Yet</option>
        </select>
      </FormRow>

      <div className="flex justify-end gap-px p-6 bg-ibm-hairline border-t border-ibm-hairline">
        <button type="button" className="ibm-btn ibm-btn-danger min-w-[160px]" onClick={handleClickDelete}>
          Delete
        </button>
        <button type="button" className="ibm-btn ibm-btn-primary min-w-[160px]" onClick={handleClickModify}>
          Modify
        </button>
      </div>
    </div>
  )
}

const FormRow = ({ label, children }) => (
  <div className="flex border-b border-ibm-hairline">
    <div className="w-1/4 px-6 py-5 ibm-e-14 text-ibm-ink-muted bg-ibm-surface-1 border-r border-ibm-hairline">
      {label}
    </div>
    <div className="w-3/4 px-6 py-4 ibm-b-16 text-ibm-ink">{children}</div>
  </div>
)

export default ModifyComponent
