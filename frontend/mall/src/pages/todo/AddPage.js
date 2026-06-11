import AddComponent from '../../components/todo/AddComponent'

const AddPage = () => {
  return (
    <div className="w-full pt-12">
      <span className="ibm-e-14 block mb-3">Todo</span>
      <h1 className="ibm-dmd-42 text-ibm-ink">Add a new todo</h1>
      <p className="ibm-blg-18 text-ibm-ink-muted mt-3 max-w-2xl">
        Capture a task with title, writer, and due date.
      </p>
      <AddComponent />
    </div>
  )
}
export default AddPage
