import { useState } from 'react'
import { postAdd } from '../../api/todoApi'
import ResultModal from '../common/ResultModal'
import useCustomMove from '../../hooks/useCustomMove'

const initState = {
  title: '',
  writer: '',
  dueDate: '',
}

const AddComponent = () => {
  const [todo, setTodo] = useState({ ...initState })
  const [result, setResult] = useState(null)
  const { moveToList } = useCustomMove()

  const handleChangeTodo = (e) => {
    todo[e.target.name] = e.target.value
    setTodo({ ...todo })
  }
  const handleClickAdd = () => {
    //console.log(todo)
    postAdd(todo)
      .then((result) => {
        setResult(result.TNO)
        setTodo({ ...initState })
      })
      .catch((e) => {
        console.error(e)
      })
  }
  const closeModal = () => {
    setResult(null)
    moveToList()
  }

  return (
    <div className="mt-8 border border-ibm-hairline bg-ibm-canvas">
      {result ? (
        <ResultModal
          title={'Add Result'}
          content={`New ${result} Added`}
          callbackFn={closeModal}
        />
      ) : (
        <></>
      )}

      <FormRow label="TITLE">
        <input
          className="ibm-input"
          name="title"
          type="text"
          value={todo.title}
          onChange={handleChangeTodo}
        />
      </FormRow>
      <FormRow label="WRITER">
        <input
          className="ibm-input"
          name="writer"
          type="text"
          value={todo.writer}
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

      <div className="flex justify-end p-6 border-t border-ibm-hairline">
        <button
          type="button"
          className="ibm-btn ibm-btn-primary min-w-[160px]"
          onClick={handleClickAdd}
        >
          Add
        </button>
      </div>
    </div>
  )
}

const FormRow = ({ label, children }) => (
  <div className="flex border-b border-ibm-hairline">
    <div className="w-1/4 px-6 py-5 border-r ibm-e-14 text-ibm-ink-muted bg-ibm-surface-1 border-ibm-hairline">
      {label}
    </div>
    <div className="w-3/4 px-6 py-4 ibm-b-16 text-ibm-ink">{children}</div>
  </div>
)

export default AddComponent
