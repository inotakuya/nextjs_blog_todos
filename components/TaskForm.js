import Cookie from "universal-cookie"

const cookie = new Cookie()

import React, { useContext } from "react"
import { StateContext } from "../context/StateContext"
import axios from "axios"

const TaskForm = ({ taskCreated }) => {
  const { selectedTask, setSelectedTask } = useContext(StateContext)
  const create = async e => {
    e.preventDefault()
    try {
      await axios
        .post(
          `${process.env.NEXT_PUBLIC_RESTAPI_URL}api/tasks/`,
          {
            title: selectedTask.title,
          },
          {
            headers: {
              Authorization: `JWT ${cookie.get("access_token")}`,
            },
          }
        )
        .then(res => {
          if (res.status === 401) {
            alert("JWT Token not valid")
          } else {
            setSelectedTask({ id: 0, title: "" })
            taskCreated()
          }
        })
    } catch (err) {
      alert(err)
    }
  }
  const update = async e => {
    e.preventDefault()
    try {
      await axios
        .put(
          `${process.env.NEXT_PUBLIC_RESTAPI_URL}api/tasks/${selectedTask.id}/`,
          {
            title: selectedTask.title,
          },
          {
            headers: {
              Authorization: `JWT ${cookie.get("access_token")}`,
            },
          }
        )
        .then(res => {
          if (res.status === 401) {
            alert("JWT Token not valid")
          } else {
            setSelectedTask({ id: 0, title: "" })
            taskCreated()
          }
        })
    } catch (err) {
      alert(err)
    }
  }
  return (
    <div>
      <form onSubmit={selectedTask.id !== 0 ? update : create}>
        <input
          className="text-black mb-8 px-2 py-1"
          type="text"
          value={selectedTask.title}
          onChange={e => setSelectedTask({ ...selectedTask, title: e.target.value })}
        />
        <button
          type="submit"
          className="bg-gray-500 ml-2 hover:bg-gray-600 text-sm px-2 py-1 rounded uppercase"
        >
          {selectedTask.id !== 0 ? "update" : "create"}
        </button>
      </form>
    </div>
  )
}

export default TaskForm
