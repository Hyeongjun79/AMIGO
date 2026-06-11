import axios from 'axios'
import { API_SERVER_HOST } from './todoApi'
import jwtAxios from '../util/jwtUtil'

const host = `${API_SERVER_HOST}/api/products`

export const postAdd = async (product) => {
  const header = { headers: { 'Content-Type': 'multipart/form-data' } }

  const res = await jwtAxios.post(`${host}/`, product, header)
  return res.data
}

export const getCategoryList = async () => {
  const res = await jwtAxios.get(`${API_SERVER_HOST}/api/categories`)
  return res.data
}

export const getList = async (pageParam) => {
  const { page, size, category } = pageParam
  const params = { page, size }
  if (category) params.category = category

  const res = await jwtAxios.get(`${host}/list`, { params })
  return res.data
}

export const getOne = async (tno) => {
  const res = await jwtAxios.get(`${host}/${tno}`)
  return res.data
}

export const putOne = async (pno, product) => {
  const header = { headers: { 'Content-Type': 'multipart/form-data' } }
  const res = await jwtAxios.put(`${host}/${pno}`, product, header)
  return res.data
}

export const deleteOne = async (pno) => {
  const res = await jwtAxios.delete(`${host}/${pno}`)
  return res.data
}
