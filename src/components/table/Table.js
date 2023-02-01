import React from 'react'
import {
    Card,
    CardHeader,
    CardBody,
    Typography,
} from "@material-tailwind/react";
import TableRow from './TableRow';

function Table({ tableTitles, tableData }) {
    return (
        <Card>
            <CardHeader variant="gradient" color="blue" className="mb-8 p-6">
                <Typography variant="h6" color="white">
                    All Quizzes
                </Typography>
            </CardHeader>
            <CardBody className="overflow-x-scroll px-0 pt-0 pb-2 text-left">
                <table className="w-full min-w-[640px] table-auto ">
                    <thead>
                        <tr>

                            {(tableTitles).map((title, i) => (
                                <th
                                    key={i}
                                    className="border-b border-blue-gray-50 py-3 px-5 text-left"
                                >
                                    <Typography
                                        variant="small"
                                        className="text-[11px] font-bold uppercase text-blue-gray-400"
                                    >
                                        {title}
                                    </Typography>
                                </th>
                            ))}




                        </tr>
                    </thead>
                    <tbody>

                        {(tableData).map((data, i) => (
                            <TableRow key={i} data={data} tableTitles={tableTitles}></TableRow>
                        ))}

                    </tbody>
                </table>
            </CardBody>
        </Card>
    )
}

export default Table