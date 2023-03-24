import React from "react"
import { AiFillEdit } from "react-icons/ai"
import { BsFillTrashFill } from "react-icons/bs"
import { IoIosAdd, IoIosRemove } from "react-icons/io"
import { FaRegSadCry } from "react-icons/fa"

const Table = ({ theads, tbodies, className, actions = false, onEdit, onDelete, onRemove, onAdd, noContent, addRemove = false }) => {
    const onClickEdit = (id) => {
        onEdit(id)
    }

    const onClickDelete = (id) => {
        onDelete(id)
    }

    const onClickRemove = ({ id, name, quantity, categoriesId }) => {
        onRemove({ id, name, quantity, categoriesId })
    }

    const onClickAdd = ({ id, name, quantity, categoriesId }) => {
        onAdd({ id, name, quantity, categoriesId })
    }

    return (
        <div className={`overflow-x-auto overflow-y-auto max-h-[580px] ${className}`}>
            <table className="table table-zebra w-full">
                <thead>
                    <tr className="text-center">
                        <th></th>
                        {theads.map(thead => <th key={thead.id}>{thead.name}</th>)}
                        {actions &&
                            <th className="text-center">ação</th>
                        }
                    </tr>
                </thead>
                <tbody>
                    {tbodies.map(item => (
                        <tr className="text-center" key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.name}</td>
                            {item.categories && <td>{item.categories.name}</td>}
                            {item.quantity !== undefined && <td>{item.quantity}</td>}
                            {actions &&
                                <td>
                                    <div className="flex gap-4 justify-center">
                                        {addRemove &&
                                            <div className="flex gap-4">
                                                <IoIosAdd color="#ffffff" size={18} className="cursor-pointer" onClick={() => onClickAdd(item)} />
                                                <IoIosRemove color="#ffffff" size={18} className="cursor-pointer" onClick={() => onClickRemove(item)} />
                                            </div>
                                        }
                                        <AiFillEdit color="#0508fa" className="cursor-pointer" onClick={() => onClickEdit(item.id)} />
                                        <BsFillTrashFill color="red" className="cursor-pointer" onClick={() => onClickDelete(item.id)} />
                                    </div>
                                </td>
                            }
                        </tr>
                    ))}
                </tbody>
            </table>
            {tbodies.length === 0 &&
                <div className="flex flex-col bg-base-300 py-40 items-center justify-center w-full">
                    <p className="pr-4 pb-12 text-2xl">{noContent}</p>
                    <FaRegSadCry size={100} />
                </div>
            }
        </div>
    )
}

export default Table