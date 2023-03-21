import React from 'react'
import { AiFillEdit } from 'react-icons/ai'
import { BsFillTrashFill } from 'react-icons/bs'
import Input from '../Input'

const Table = ({ theads, tbodies, className, actions = false, onEdit, onDelete }) => {
    const onClickEdit = (id) => {
        onEdit(id)
    }

    const onClickDelete = (id) => {
        onDelete(id)
    }

    return (
        <div className={`overflow-x-auto ${className}`}>
            <div className="self-end pb-4">
                <Input size={25} placeholder='Pesquisar...' />
            </div>
            <table className="table table-zebra w-full">
                <thead>
                    <tr>
                        <th></th>
                        {theads.map(thead => <th key={thead.id}>{thead.name}</th>)}
                        {actions &&
                            <th className="text-center">ação</th>
                        }
                    </tr>
                </thead>
                <tbody>
                    {tbodies.map(item => (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.name}</td>
                            <td>{item.categorieName}</td>
                            <td>{item.quantity}</td>
                            {actions &&
                                <td>
                                    <div className="flex gap-4 justify-center">
                                        <AiFillEdit color='#0508fa' className='cursor-pointer' onClick={() => onClickEdit(item.id)} />
                                        <BsFillTrashFill color="red" className='cursor-pointer' onClick={() => onClickDelete(item.id)} />
                                    </div>
                                </td>
                            }
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Table