import axios from "axios";
import {useState,useEffect} from "react";
import {Link} from "react-router-dom"

const URI = 'http://localhost:3001'

const CompShowTasks =()=> {

    const [tasks, setTask] = useState([])

    useEffect(() => {
        getTasks()
    }, []); 


    const getTasks = async () => {
        const res = await axios.get(`${URI}/tasks`)
        setTask(res.data)

    };

    const deleteTask = async (id) => {
        await axios.delete(`${URI}/tasks/${id}/delete`)
        await getTasks()

    };

    const editDoneTask = async (id) => {
        await axios.patch(`${URI}/tasks/${id}/toggleDone`)
        await getTasks()

    };


    return (
        <div>
            {tasks != ''
                ?
                <div>
                    <div className="bg-success  rounded-5 mb-lg-3">
                        <h3 className="text-light fs-2">
                            List TASK
                        </h3>
                    </div>
                    <div>
                        <table className="table table-bordered">
                            <thead>
                            <tr>
                                <th>N</th>
                                <th>title</th>
                                <th>type task</th>
                                <th>description</th>
                                <th>done</th>
                                <th>options</th>
                            </tr>
                            </thead>
                            <tbody>
                            {tasks.map((tasks, index) => (
                                <tr key={tasks.id}>
                                    <td>{index}</td>
                                    <td>{tasks.title}</td>
                                    <td>{tasks.type_task_id}</td>
                                    <td>{tasks.description}</td>
                                    <td>{tasks.done}</td>
                                    <td>
                                        {tasks.done === 0
                                            ? <button className="btn btn-secondary" onClick={() => editDoneTask(tasks.id)}><i
                                                className="fa-sharp fa-solid fa-hourglass"></i></button>
                                            : <button className="btn btn-success" onClick={() => editDoneTask(tasks.id)}><i
                                                className="fa-solid fa-check"></i></button>
                                        }

                                        <button className="btn btn-danger" onClick={() => deleteTask(tasks.id)}><i
                                            className="fa-solid fa-trash"></i></button>

                                        <Link className="btn btn-info" to={`/tasks/${tasks.id}/edit`}><i
                                            className="fa-solid fa-pen-to-square"></i></Link>

                                    </td>
                                </tr>

                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                :
                <div>
                    <div className="bg-secondary  rounded-5 mb-lg-3">
                        <h1 className="text-light fs-2">No tasks</h1>
                    </div>
                    <i className="fa-solid fa-file fa-8x"></i>
                </div>

            }
        </div>
    )

};
export default CompShowTasks;
