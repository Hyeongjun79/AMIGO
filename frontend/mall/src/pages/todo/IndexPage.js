import { Outlet, useNavigate } from 'react-router-dom'
import BasicLayout from '../../layouts/BasicLayouts'
import { useCallback } from 'react'

const IndexPage = () => {
  const navigate = useNavigate()
  const handleClickList = useCallback(() => {
    navigate({ pathname: 'list' })
  })
  const handleClickAdd = useCallback(() => {
    navigate({ pathname: 'add' })
  })
  return (
    <BasicLayout>
      <div className="flex border-b border-ibm-hairline">
        <button
          className="px-5 py-4 transition-colors border-b-2 cursor-pointer ibm-be-14 text-ibm-ink border-ibm-blue hover:bg-ibm-surface-1"
          onClick={handleClickList}
        >
          List
        </button>
        <button
          className="px-5 py-4 transition-colors cursor-pointer ibm-bsm-14 text-ibm-ink-muted hover:bg-ibm-surface-1"
          onClick={handleClickAdd}
        >
          Add
        </button>
      </div>
      <div className="w-full">
        <Outlet />
      </div>
    </BasicLayout>
  )
}
export default IndexPage
