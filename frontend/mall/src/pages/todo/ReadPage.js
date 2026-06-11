import { useParams } from 'react-router-dom'
import ReadComponent from '../../components/todo/ReadComponent'

const ReadPage = () => {
  const { tno } = useParams()

  return (
    <div className="w-full pt-12">
      <span className="ibm-e-14 block mb-3">Todo · {tno}</span>
      <h1 className="ibm-dmd-42 text-ibm-ink">Detail</h1>
      <ReadComponent tno={tno}></ReadComponent>
    </div>
  )
}

export default ReadPage
