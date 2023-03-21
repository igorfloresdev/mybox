import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Button from '../../components/Button'
import Form from '../../components/Form'
import Input from '../../components/Input'
import Select from '../../components/Select'
import Table from '../../components/Table'
import { useCookies } from 'react-cookie'
import Modal from '../../components/Modal'
import { BsFillTrashFill } from 'react-icons/bs'
import { toast } from 'react-hot-toast'

const Products = () => {
    const [cookie] = useCookies()

    const [productField, setProductField] = useState('')
    const [categorieField, setCategorieField] = useState('')
    const [quantityField, setQuantityField] = useState('')

    const [editProductField, setEditProductField] = useState('')
    const [editCategorieField, setEditCategorieField] = useState('')
    const [editQuantityField, setEditQuantityField] = useState('')


    const [deleteModal, setDeleteModal] = useState(false)
    const [editModal, setEditModal] = useState(false)

    const [selectedId, setSelectedId] = useState()

    const [categories, setCategories] = useState([])
    const [products, setProducts] = useState([])

    const clearInput = () => {
        setProductField('')
        setCategorieField('')
        setQuantityField('')
    }


    const addProduct = () => {
        if (productField !== '' && quantityField !== '' && categorieField !== '') {
            axios.post('http://localhost:3001/products', {
                userId: cookie['userId'],
                categorieName: categorieField,
                quantity: quantityField,
                name: productField
            }).then(response => {
                setProducts(products => [...products, response.data])
                toast.success('Produto adicionado com sucesso !')
                clearInput()
            })
        }
    }

    const openEditModal = (id) => {
        setSelectedId(id)
        axios.get(`http://localhost:3001/products?id=${id}`)
            .then(response => {
                setEditProductField(response.data[0].name)
                setEditQuantityField(response.data[0].quantity)
                setEditCategorieField(response.data[0].categorieName)
            })
        setEditModal(true)
    }

    const openDeleteModal = (id) => {
        setSelectedId(id)
        setDeleteModal(true)
    }

    const editProduct = () => {
        axios.put(`http://localhost:3001/products/${selectedId}`, {
            categorieName: editCategorieField,
            userId: cookie['userId'],
            quantity: editQuantityField,
            name: editProductField
        })
            .then((response) => {
                let updatedProducts = products.map((item) => {
                    if (item.id == selectedId) {
                        return {
                            ...item,
                            categorieName: editCategorieField,
                            userId: cookie['userId'],
                            quantity: editQuantityField,
                            name: editProductField
                        }
                    }
                    return item
                })
                setProducts(updatedProducts)
                toast.success('Produto editado com sucesso !')
            })

        setEditModal(false)
    }

    const deleteProduct = () => {
        axios.delete(`http://localhost:3001/products/${selectedId}`).then(() => {
            setProducts(current => current.filter((products) => products.id != selectedId))
            setDeleteModal(false)
            toast.success('Produto deletado com sucesso !')
        })
    }

    useEffect(() => {
        axios.get(`http://localhost:3001/categories?userId=${cookie['userId']}`)
            .then(response => {
                setCategories(response.data)
            })

        axios.get(`http://localhost:3001/products?userId=${cookie['userId']}`)
            .then(response => {
                setProducts(response.data)
            })

    }, [])


    const theads = [
        {
            id: 1,
            name: 'Produto'
        },
        {
            id: 2,
            name: 'Categoria'
        },
        {
            id: 3,
            name: 'Quantidade'
        }
    ]

    return (
        <div className="flex flex-col items-center w-screen">
            <Form className='flex flex-row gap-5'>
                <Input required
                    label="Produto"
                    value={productField}
                    getValue={(value) => setProductField(value)}
                    size={120} placeholder="Digite o nome..."
                />
                <Input
                    required
                    label="Quantidade"
                    type="number"
                    value={quantityField}
                    getValue={(value) => setQuantityField(value)}
                    size={50}
                    placeholder="Quantidade"
                />
                <Select
                    label="Categoria"
                    getValue={(value) => setCategorieField(value)}
                    value={categorieField}
                    options={categories}
                    className="w-60"
                />
                <Button
                    onClick={() => addProduct()}
                    name="Adicionar +"
                    className="self-end"
                />
            </Form>
            <Table className="flex flex-col w-8/12 pt-28"
                theads={theads}
                tbodies={products}
                actions
                onEdit={(value) => openEditModal(value)}
                onDelete={(value) => openDeleteModal(value)}
            />
            <Modal title="Confirmar exclusão !" open={deleteModal}>
                <p>Você tem certeza que deseja excluir o item numero {selectedId} ? Essa ação é irreversivel.</p>
                <div className='modal-action'>
                    <Button onClick={() => setDeleteModal(false)}>Cancelar</Button>
                    <Button onClick={deleteProduct} className='btn-error'><BsFillTrashFill className='mr-2' />Deletar</Button>
                </div>
            </Modal>
            <Modal title="Editar produto !" open={editModal}>
                <Form>
                    <Input
                        required
                        label="Produto"
                        value={editProductField}
                        getValue={(value) => setEditProductField(value)}
                        size={120}
                        placeholder="Digite o nome..."
                    />
                    <Input
                        required
                        label="Quantidade"
                        type="number"
                        value={editQuantityField}
                        getValue={(value) => setEditQuantityField(value)}
                        size={120}
                        placeholder="Digite o nome..."
                    />
                    <Select
                        label="Categoria"
                        getValue={(value) => setEditCategorieField(value)}
                        value={editCategorieField}
                        options={categories}
                        className="w-60"
                    />
                    <div className='modal-action'>
                        <Button onClick={() => setEditModal(false)}>Cancelar</Button>
                        <Button onClick={() => editProduct()} className='btn-info'>Editar</Button>
                    </div>
                </Form>
            </Modal>
        </div>
    )
}

export default Products