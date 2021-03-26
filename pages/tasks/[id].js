import React, { useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/router"
import Layout from "../../components/Layout"
import PropTypes from "prop-types"
import { getAllTaskIds, getTaskData } from "../../lib/tasks"
import axios from "axios"
import useSWR from "swr"

const fetcher = url => axios.get(url).then(res => res.data)

const Task = ({ staticTask, id }) => {
  const router = useRouter()
  const apiUrl = `${process.env.NEXT_PUBLIC_RESTAPI_URL}api/detail-task/${id}`
  const { data: task, mutate } = useSWR(apiUrl, fetcher, {
    initialData: staticTask,
  })
  useEffect(() => {
    mutate()
  }, [])

  if (router.isFallback || !task) {
    return <div>Loading...</div>
  }
  return (
    <Layout title={task.title}>
      <p className="m-4">
        {"ID : "}
        {task.id}
      </p>
      <p className="mb-4 text-xl font-bold">{task.title}</p>
      <p className="mb-12">{task.created_at}</p>
      <Link href="/task-page">
        <div className="flex cursor-pointer mt-12">
          <svg
            className="w-6 h-6 mr-3"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
            />
          </svg>
          <span>Back to task-page</span>
        </div>
      </Link>
    </Layout>
  )
}

export default Task

Task.propTypes = {
  post: PropTypes.shape({
    created_at: PropTypes.string,
    title: PropTypes.string,
  }).isRequired,
}

export const getStaticPaths = async () => {
  const paths = await getAllTaskIds()
  return {
    paths,
    fallback: true,
  }
}
export const getStaticProps = async ({ params }) => {
  const staticTask = await getTaskData(params.id)
  return { props: { staticTask, id: staticTask.id }, revalidate: 3 }
}
