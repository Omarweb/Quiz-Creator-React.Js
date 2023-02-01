import React from 'react'
import {
    Typography,


} from "@material-tailwind/react";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import { AcademicCapIcon } from "@heroicons/react/24/outline";
import { Link } from 'react-router-dom';
function TableRow({ data, tableTitles }) {
    return (
        <tr>
            {tableTitles.map((title) => (
                <td className='py-3 px-5 border-b border-blue-gray-50'>
                    <div className="flex items-center gap-4">

                        <div>
                            {
                                (title === 'edit') ?
                                    < Link to={`/edit/` + data.id}>
                                        <EllipsisVerticalIcon
                                            strokeWidth={2}
                                            className="h-5 w-5 text-inherit"
                                        />
                                    </Link>
                                    :
                                    <Typography
                                        variant="small"
                                        color="blue-gray"
                                        className="font-semibold"
                                    >
                                        {data[title]}
                                    </Typography>
                            }



                        </div>
                    </div>
                </td>
            ))
            }



        </tr >
    )
}
export default TableRow