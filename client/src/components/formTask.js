
import axios from "axios";
import {useState,useEffect} from "react";
import { useNavigate} from "react-router-dom"


import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';


const URI = 'http://localhost:3001'
function CompFormTasks() {


    const[title,setTitle]=useState()
    const[typeTask,setTypeTask]=useState()
    const[description,setDescription]=useState()
    const[done,setDone]=useState()
    const navigate = useNavigate()



    const [typeTasks, setTypeTasks] = useState([])
    useEffect(() => {
        getTypeTasks()
    }, []);


    const getTypeTasks = async () => {
        const res = await axios.get(`${URI}/type-tasks`)
        setTypeTasks(res.data)

    };


    const postAddTasks = async (e) => {
        e.preventDefault()
        console.log(e)
        await axios.post(`${URI}/tasks/add`,{title:title,type_task_id:typeTask,done:done,description:description})
        navigate(0)

    };



    return (

        <Form onSubmit={postAddTasks}>
            <div className="bg-success  rounded-5 mb-lg-3">
                <h3 className="text-light fs-2">
                    Add TASK
                </h3>
            </div>
            <Form.Group className="mb-3">
                <Form.Label>Title</Form.Label>
                <Form.Control
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Type Task</Form.Label>
                <Form.Select

                    value={typeTask}
                    onChange={(e) => setTypeTask(e.target.value)}
                >
                    <option selected  disabled>Open this select menu</option>
                    {typeTasks.map((typeTasks ) => (
                        <option key={typeTasks.id} value={typeTasks.id}>{typeTasks.name}</option>
                    ))}
                </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control
                    as="textarea"
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Check

                    type="checkbox"
                    label="Task Done" 
                    checked={done}
                    onChange={(e) => setDone(e.target.checked)}
                />
            </Form.Group>
            <Button variant="success" type="submit">Submit</Button>

        </Form>
    );
}

export default CompFormTasks;


