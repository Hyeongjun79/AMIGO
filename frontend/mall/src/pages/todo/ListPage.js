import ListComponent from '../../components/todo/ListComponent'

const ListPage = () => {
  return (
    <div className="w-full pt-12">
      <span className="ibm-e-14 block mb-3">Todo</span>
      <h1 className="ibm-dmd-42 text-ibm-ink">Todo list</h1>
      <p className="ibm-blg-18 text-ibm-ink-muted mt-3 max-w-2xl">
        Browse and manage your scheduled tasks.
      </p>
      <ListComponent />
    </div>
  )
}
export default ListPage
