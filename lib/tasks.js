import axios from "axios"

export const getAllTasksData = async () => {
  const res = await axios.get(`${process.env.NEXT_PUBLIC_RESTAPI_URL}api/list-task/`)
  return res.data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
}

export const getAllTaskIds = async () => {
  const res = await axios.get(`${process.env.NEXT_PUBLIC_RESTAPI_URL}api/list-task/`)
  return res.data.map(task => {
    return {
      params: {
        id: String(task.id),
      },
    }
  })
}

export const getTaskData = async id => {
  const res = await axios.get(`${process.env.NEXT_PUBLIC_RESTAPI_URL}api/detail-task/${id}`)
  return res.data
}
