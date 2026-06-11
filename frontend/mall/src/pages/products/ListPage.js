import { useSearchParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { getCategoryList } from '../../api/productsApi'
import ListComponent from '../../components/products/ListComponent'

const ListPage = () => {
  const [searchParams] = useSearchParams()
  const categoryId = searchParams.get('category')
    ? parseInt(searchParams.get('category'))
    : 1

  const { data: categories } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategoryList,
    staleTime: 1000 * 60 * 10,
    retry: false,
  })

  const currentCategory = categories?.find((cat) => cat.id === categoryId)

  return (
    <div className="w-full pt-12 text-center">
      <span className="block mb-3 ibm-e-14">Product</span>
      <h1 className="font-semibold ibm-dmd-42 text-ibm-ink">
        {currentCategory ? currentCategory.name : 'Product list'}
      </h1>
      <p className="max-w-2xl mt-3 ibm-blg-18 text-ibm-ink-muted"></p>
      <ListComponent />
    </div>
  )
}
export default ListPage
