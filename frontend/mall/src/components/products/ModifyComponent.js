import { useEffect, useState, useRef } from 'react'
import { deleteOne, getOne, putOne } from '../../api/productsApi'
import useCustomMove from '../../hooks/useCustomMove'
import ResultModal from '../common/ResultModal'
import FetchingModal from '../common/FetchingModal'
import { API_SERVER_HOST } from '../../api/todoApi'
import { useQueryClient, useQuery } from '@tanstack/react-query'
import { getCategoryList } from '../../api/productsApi'

const host = API_SERVER_HOST

const initState = {
  pno: 0,
  pname: '',
  desc: '',
  price: 0,
  delFlag: false,
  uploadFileNames: [],
}

const ModifyComponent = ({ pno }) => {
  const [product, setProduct] = useState({ ...initState })
  const [result, setResult] = useState(null)
  const [fetching, setFetching] = useState(false)
  const [newFiles, setNewFiles] = useState([])
  const uploadRef = useRef()
  const { moveToList, moveToRead } = useCustomMove()
  const queryClient = useQueryClient()

  const { data: categories } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategoryList,
    staleTime: 1000 * 60 * 10,
    retry: false,
  })

  useEffect(() => {
    setFetching(true)
    getOne(pno).then((data) => setProduct(data), setFetching(false))
  }, [pno])

  const handleClickModify = () => {
    const formData = new FormData()
    newFiles.forEach((entry) => formData.append('files', entry.file))
    formData.append('pname', product.pname)
    formData.append('pdesc', product.pdesc)
    formData.append('price', product.price)
    formData.append('delFlag', product.delFlag)
    if (product.categoryId) formData.append('categoryId', product.categoryId)
    for (let i = 0; i < product.uploadFileNames.length; i++) {
      formData.append('uploadFileNames', product.uploadFileNames[i])
    }
    setFetching(true)
    putOne(pno, formData).then((data) => {
      setResult('Modified')
      setFetching(false)
    })
  }

  const triggerFileInput = () => uploadRef.current?.click()

  const handleFilesSelected = (e) => {
    const selected = Array.from(e.target.files).map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }))
    setNewFiles((prev) => [...prev, ...selected])
    e.target.value = ''
  }

  const removeNewFile = (idx) => {
    setNewFiles((prev) => {
      URL.revokeObjectURL(prev[idx].preview)
      return prev.filter((_, i) => i !== idx)
    })
  }
  const handleClickDelete = () => {
    setFetching(true)
    deleteOne(pno).then((data) => {
      queryClient.invalidateQueries({ queryKey: ['products/list'] })
      setResult('Deleted')
      setFetching(false)
    })
  }
  const colseModal = () => {
    if (result === 'Modified') {
      moveToRead(pno)
    } else if (result === 'Deleted') {
      moveToList({ page: 1 })
    }
    setResult(null)
  }

  const handleChangeProduct = (e) => {
    product[e.target.name] = e.target.value
    setProduct({ ...product })
  }

  const deleteOldImages = (imageName) => {
    const resultFileNames = product.uploadFileNames.filter(
      (fileName) => fileName !== imageName
    )
    product.uploadFileNames = resultFileNames
    setProduct({ ...product })
  }

  return (
    <div className="mt-6 bg-white rounded-2xl border border-ibm-hairline shadow-sm overflow-hidden">
      {fetching ? <FetchingModal /> : <></>}

      {result ? (
        <ResultModal
          title={result === 'Deleted' ? '商品削除' : '商品編集'}
          content={'正常に処理されました。'}
          callbackFn={colseModal}
        />
      ) : (
        <></>
      )}

      <FormRow label="商品番号">
        <div className="ibm-b-16 text-ibm-ink-muted">{product.pno}</div>
      </FormRow>
      <FormRow label="商品名">
        <input
          className="ibm-input"
          name="pname"
          type="text"
          value={product.pname}
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
        />
      </FormRow>
      <FormRow label="Category">
        <select
          className="ibm-input"
          name="categoryId"
          value={product.categoryId || ''}
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
      <FormRow label="表示状態">
        <select
          name="delFlag"
          className="ibm-input w-auto"
          onChange={handleChangeProduct}
          value={product.delFlag}
        >
          <option value={false}>公開中</option>
          <option value={true}>非公開</option>
        </select>
      </FormRow>
      <FormRow label="画像">
        <div className="flex flex-wrap gap-3">
          {product.uploadFileNames.map((imgFile) => (
            <div
              key={imgFile}
              className="flex flex-col w-[calc(33.333%-0.5rem)] gap-2"
            >
              <img alt="img" src={`${host}/api/products/view/s_${imgFile}`} className="rounded-xl" />
              <button
                type="button"
                className="ibm-btn ibm-btn-danger py-1 text-sm"
                onClick={() => deleteOldImages(imgFile)}
              >
                削除
              </button>
            </div>
          ))}
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

      <div className="flex flex-wrap justify-end gap-3 p-6 bg-ibm-surface-4 border-t border-ibm-hairline">
        <button
          type="button"
          className="ibm-btn ibm-btn-danger min-w-[120px]"
          onClick={handleClickDelete}
        >
          削除
        </button>
        <button
          type="button"
          className="ibm-btn ibm-btn-secondary min-w-[120px]"
          onClick={moveToList}
        >
          一覧へ
        </button>
        <button
          type="button"
          className="ibm-btn ibm-btn-primary min-w-[120px]"
          onClick={handleClickModify}
        >
          変更する
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

export default ModifyComponent
