import { useParams } from 'react-router-dom'
import ModifyComponent from '../../components/products/ModifyComponent'

const ModifyPage = () => {
  const { pno } = useParams()

  return (
    <div className="w-full pt-12">
      <span className="block mb-3 ibm-e-14">Product · {pno}</span>
      <h1 className="ibm-dmd-42 text-ibm-ink">Modify</h1>
      <ModifyComponent pno={pno} />
    </div>
  )
}
export default ModifyPage
