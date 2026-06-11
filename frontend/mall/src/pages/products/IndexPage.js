import { Outlet, NavLink } from 'react-router-dom'
import BasicLayout from '../../layouts/BasicLayouts'

const tabClass = ({ isActive }) =>
  `px-5 py-4 transition-colors cursor-pointer hover:bg-ibm-surface-1 ${
    isActive
      ? 'border-b-2 ibm-be-14 text-ibm-ink border-ibm-blue'
      : 'ibm-bsm-14 text-ibm-ink-muted'
  }`

const IndexPage = () => {
  return (
    <BasicLayout>
      <div>
        <div className="mb-2 -mt-12 ibm-h-32 text-ibm-ink">
          Products Menus
        </div>
        <div className="flex border-b border-ibm-hairline">
          <NavLink to="list" className={tabClass}>
            List
          </NavLink>
          <NavLink to="add" className={tabClass}>
            Add
          </NavLink>
        </div>
      </div>
      <div className="w-full">
        <Outlet />
      </div>
    </BasicLayout>
  )
}
export default IndexPage
