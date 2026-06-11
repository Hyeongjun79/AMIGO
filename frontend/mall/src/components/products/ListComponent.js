import { getList } from '../../api/productsApi'
import useCustomMove from '../../hooks/useCustomMove'
import FetchingModal from '../common/FetchingModal'
import { API_SERVER_HOST } from '../../api/todoApi'
import PageComponent from '../common/PageComponent'
import useCustomLogin from '../../hooks/useCustomLogin'
import { useQuery } from '@tanstack/react-query'

const host = API_SERVER_HOST
const initState = {
  dtoList: [],
  pageNumList: [],
  pageRequestDTO: null,
  prev: false,
  next: false,
  totalCount: 0,
  prevPage: 0,
  nextPage: 0,
  totalPage: 0,
  current: 0,
}

const ListComponent = () => {
  const { page, size, refresh, category: categoryParam, moveToList, moveToRead } = useCustomMove()
  const category = categoryParam ?? 1
  const { exceptionHandle } = useCustomLogin()

  const { isLoading, data, error, isError } = useQuery({
    queryKey: ['products/list', { page, size, refresh, category }],
    queryFn: () => getList({ page, size, category }),
    staleTime: 1000 * 60,
  })

  const handleClickPage = (pageParam) => {
    moveToList(pageParam)
  }

  if (isError) {
    exceptionHandle(error)
    return <></>
  }

  const serverData = data || initState

  return (
    <div className="mt-6">
      {isLoading ? <FetchingModal /> : <></>}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
        {serverData.dtoList.map((product) => (
          <div
            key={product.pno}
            className="p-5 transition-all cursor-pointer bg-white rounded-2xl border border-ibm-hairline shadow-sm hover:shadow-md hover:-translate-y-0.5"
            onClick={() => moveToRead(product.pno)}
          >
            <div className="w-full overflow-hidden rounded-xl bg-ibm-surface-4 mb-4">
              <img
                alt="product"
                className="m-auto w-full h-48 object-cover"
                src={`${host}/api/products/view/s_${product.uploadFileNames[0]}`}
              />
            </div>
            <div className="font-medium ibm-b-16 text-ibm-ink mb-1">
              {product.pname}
            </div>
            <div className="ibm-bsm-14 text-ibm-blue font-medium">
              ¥{product.price.toLocaleString()}
            </div>
          </div>
        ))}
      </div>
      <PageComponent
        serverData={serverData}
        movePage={handleClickPage}
      />
    </div>
  )
}

export default ListComponent
