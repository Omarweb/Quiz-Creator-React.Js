import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Table from '../components/table/Table';
import {
    Button,
} from "@material-tailwind/react";

function QuizzesPage() {
    const [data, setData] = useState([]);

    useEffect(() => {

        const fetchData = async () => {
            const data = await fetch('./api/data.json');
            const response = await data.json();

            setData(response.quizzes);
        }

        try {
            fetchData()

        } catch (err) {
            console.log('ERR: ', err);
        }

    }, [])
    return (

        <div className="mt-12 mb-8 flex flex-col gap-12 ">
            <Link to="/new"> <Button color="green" className='ml-3'>+ New Quiz </Button></Link>
            <Table tableTitles={['title', 'id', 'modified', 'created', 'edit']} tableData={data}></Table>

        </div>
    )
}

export default QuizzesPage