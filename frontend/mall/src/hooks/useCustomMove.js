import { useState } from 'react'
import { createSearchParams, useNavigate, useSearchParams } from 'react-router-dom'

const getNum = (param, defaultValue) => {
  if (!param) {
    return defaultValue
  }
  return parseInt(param)
}

const useCustomMove = () => {
  const navigate = useNavigate()
  const [refresh, setRefresh] = useState(false)
  const [quertParams] = useSearchParams()

  const page = getNum(quertParams.get('page'), 1)
  const size = getNum(quertParams.get('size'), 8)
  const category = quertParams.get('category') ? parseInt(quertParams.get('category')) : null

  const queryDefault = createSearchParams(
    category ? { page, size, category } : { page, size }
  ).toString()

  const moveToList = (pageParam) => {
    let queryStr = ''
    if (pageParam) {
      const pageNum = getNum(pageParam.page, 1)
      const sizeNum = getNum(pageParam.size, 8)
      const params = { page: pageNum, size: sizeNum }
      if (pageParam.category) params.category = pageParam.category
      queryStr = createSearchParams(params).toString()
    } else {
      queryStr = queryDefault
    }
    setRefresh(!refresh)
    navigate({ pathname: `../list`, search: queryStr })
  }
  const moveToModify = (num) => {
    console.log(queryDefault)
    navigate({
      pathname: `../modify/${num}`,
      search: queryDefault, // 수정 시 기존 쿼리 스트링 유지
    })
  }
  const moveToRead = (num) => {
    console.log(queryDefault)
    navigate({
      pathname: `../read/${num}`,
      search: queryDefault,
    })
  }
  return { moveToList, moveToModify, moveToRead, page, size, refresh, category }
}
export default useCustomMove
