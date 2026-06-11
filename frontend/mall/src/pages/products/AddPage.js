import AddComponent from '../../components/products/Addcomponent'

const AddPage = () => {
  return (
    <div className="w-full pt-12">
      <span className="block mb-3 ibm-e-14">Product</span>
      <h1 className="ibm-h-32 text-ibm-ink">Add a new products</h1>
      <p className="max-w-2xl mt-3 ibm-blg-18 text-ibm-ink-muted">your products</p>
      <AddComponent />
    </div>
  )
}
export default AddPage
