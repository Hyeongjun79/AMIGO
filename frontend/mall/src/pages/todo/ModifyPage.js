import { useParams } from 'react-router-dom'
import ModifyComponent from '../../components/todo/ModifyComponent'

const ModifyPage = () => {
  const { tno } = useParams()

  return (
    <div className="w-full pt-12">
      <span className="ibm-e-14 block mb-3">Todo · {tno}</span>
      <h1 className="ibm-dmd-42 text-ibm-ink">Modify</h1>
      <ModifyComponent tno={tno} />
    </div>
  )
}
export default ModifyPage
