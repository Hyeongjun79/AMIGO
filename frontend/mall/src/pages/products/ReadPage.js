import { useParams } from 'react-router-dom'
import ReadComponent from '../../components/products/ReadComponent'

const ReadPage = () => {
  const { pno } = useParams()

  return (
    <div className="w-full pt-12">
      <span className="block mb-3 ibm-e-14">Product · {pno}</span>
      <h1 className="ibm-dmd-42 text-ibm-ink">Detail</h1>
      <ReadComponent pno={pno}></ReadComponent>
    </div>
  )
}

export default ReadPage
