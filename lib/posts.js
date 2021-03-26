import axios from "axios"

export const getAllPostsData = async () => {
  const res = await axios.get(`${process.env.NEXT_PUBLIC_RESTAPI_URL}api/list-post/`)
  return res.data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
}

export const getAllPostIds = async () => {
  const res = await axios.get(`${process.env.NEXT_PUBLIC_RESTAPI_URL}api/list-post/`)
  return res.data.map(post => {
    return {
      params: {
        id: String(post.id),
      },
    }
  })
}

export const getPostData = async id => {
  const res = await axios.get(`${process.env.NEXT_PUBLIC_RESTAPI_URL}api/detail-post/${id}/`)
  return res.data
}
