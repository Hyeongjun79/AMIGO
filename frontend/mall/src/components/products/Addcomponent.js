import { useRef, useState } from 'react'
import ResultModal from '../common/ResultModal'
import useCustomMove from '../../hooks/useCustomMove'
import { postAdd, getCategoryList } from '../../api/productsApi'
import FetchingModal from '../common/FetchingModal'
import { useQueryClient, useMutation, useQuery } from '@tanstack/react-query'

const initState = {
  pname: '',
  pdesc: '',
  price: 0,
  categoryId: '',
  files: [],
}

const AddComponent = () => {
  const [product, setProduct] = useState({ ...initState })
  const [newFiles, setNewFiles] = useState([])
  const { moveToList } = useCustomMove()
  const uploadRef = useRef()
  const queryClient = useQueryClient()

  const { data: categories } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategoryList,
    staleTime: 1000 * 60 * 10,
    retry: false,
  })

  const handleChangeProduct = (e) => {
    product[e.target.name] = e.target.value
    setProduct({ ...product })
  }
  const addMutation = useMutation({
    mutationFn: (product) => postAdd(product),
  }) //react-query

  const handleClickAdd = (e) => {
    const formData = new FormData()

    newFiles.forEach(({ file }) => {
      formData.append('files', file)
    })

    formData.append('pname', product.pname)
    formData.append('pdesc', product.pdesc)
    formData.append('price', product.price)
    if (product.categoryId) formData.append('categoryId', product.categoryId)

    addMutation.mutate(formData)
  }
  const closeModal = () => {
    addMutation.reset()
    queryClient.invalidateQueries('products/list')
    moveToList({ page: 1 })
  }

  const triggerFileInput = () => uploadRef.current?.click()

  const removeNewFile = (idx) => {
    setNewFiles((prev) => {
      URL.revokeObjectURL(prev[idx].preview)
      return prev.filter((_, i) => i !== idx)
    })
  }
  const handleFilesSelected = (e) => {
    const selected = Array.from(e.target.files).map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }))
    setNewFiles((prev) => [...prev, ...selected])
    e.target.value = ''
  }

  return (
    <div className="mt-6 bg-white rounded-2xl border border-ibm-hairline shadow-sm overflow-hidden">
      {addMutation.isPending ? <FetchingModal /> : <></>}
      {addMutation.isSuccess ? (
        <ResultModal
          title={'商品登録'}
          content={`No.${addMutation.data.result} を登録しました`}
          callbackFn={closeModal}
        />
      ) : (
        <></>
      )}

      <FormRow label="商品名">
        <input
          className="ibm-input"
          name="pname"
          type="text"
          value={product.pname}
          onChange={handleChangeProduct}
        />
      </FormRow>
      <FormRow label="説明">
        <input
          className="ibm-input"
          name="pdesc"
          type="text"
          value={product.pdesc}
          onChange={handleChangeProduct}
        />
      </FormRow>
      <FormRow label="価格">
        <input
          className="ibm-input"
          name="price"
          type="number"
          value={product.price}
          onChange={handleChangeProduct}
          onWheel={(e) => e.target.blur()}
        />
      </FormRow>
      <FormRow label="Category">
        <select
          className="ibm-input"
          name="categoryId"
          value={product.categoryId}
          onChange={handleChangeProduct}
        >
          <option value="">カテゴリを選択</option>
          {categories?.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
      </FormRow>
      <FormRow label="画像">
        <div className="flex flex-wrap gap-3">
          {newFiles.map((entry, i) => (
            <div
              key={`new-${i}`}
              className="flex flex-col w-[calc(33.333%-0.5rem)] gap-2"
            >
              <img alt="new" src={entry.preview} className="rounded-xl" />
              <button
                type="button"
                className="ibm-btn ibm-btn-danger py-1 text-sm"
                onClick={() => removeNewFile(i)}
              >
                削除
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={triggerFileInput}
            className="flex flex-col items-center justify-center w-[calc(33.333%-0.5rem)] min-h-[140px] border-2 border-dashed rounded-xl text-ibm-ink-muted hover:bg-ibm-surface-4 border-ibm-hairline transition-colors"
          >
            <span className="text-3xl mb-2">+</span>
            <span className="ibm-bsm-14">画像を追加</span>
          </button>
          <input
            ref={uploadRef}
            type="file"
            accept="image/*"
            multiple
            onChange={handleFilesSelected}
            className="hidden"
          />
        </div>
      </FormRow>

      <div className="flex justify-end gap-3 p-6 bg-ibm-surface-4 border-t border-ibm-hairline">
        <button
          type="button"
          className="ibm-btn ibm-btn-primary min-w-[140px]"
          onClick={handleClickAdd}
        >
          登録する
        </button>
      </div>
    </div>
  )
}
const FormRow = ({ label, children }) => (
  <div className="flex border-b border-ibm-hairline">
    <div className="w-1/4 px-6 py-4 ibm-e-14 text-ibm-ink-muted bg-ibm-surface-4">
      {label}
    </div>
    <div className="w-3/4 px-6 py-4 ibm-b-16 text-ibm-ink">{children}</div>
  </div>
)
export default AddComponent
