import axios from 'axios'
import React, { useCallback, useEffect, useState } from 'react'
import Button from '../../components/Button'
import Form from '../../components/Form'
import Input from '../../components/Input'
import Select from '../../components/Select'
import Table from '../../components/Table'
import { useCookies } from 'react-cookie'
import Modal from '../../components/Modal'
import { BsFillTrashFill } from 'react-icons/bs'
import { toast } from 'react-hot-toast'
import { ENV } from '../helpers/env'

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

    const getProducts = useCallback(() => {
        axios.get(`${ENV}/products?userId=${cookie['userId']}&_expand=categories`)
            .then(response => {
                setProducts(response.data)
            })
    }, [cookie])


    const getCategories = useCallback(() => {
        axios.get(`${ENV}/categories?userId=${cookie['userId']}`)
        .then(response => {
            setCategories(response.data)
        })
    }, [cookie])

    const clearInput = () => {
        setProductField('')
        setCategorieField('')
        setQuantityField('')
    }

    const addProduct = () => {
        if (productField !== '' && quantityField !== '' && categorieField !== '') {
            if (parseInt(quantityField) >= 0) {
                axios.post(`${ENV}/products`, {
                    userId: parseInt(cookie['userId']),
                    categoriesId: parseInt(categorieField),
                    quantity: parseInt(quantityField),
                    name: productField
                }).then(() => {
                    getProducts()
                    getCategories()
                    toast.success('Produto adicionado com sucesso !')
                    clearInput()
                })
            }
        }
        if (productField !== '' && quantityField !== '' && categorieField === '') {
            toast.error('você deve selecionar uma categoria')
        }
    }

    const openEditModal = (id) => {
        setSelectedId(id)
        axios.get(`${ENV}/products?id=${id}`)
            .then(response => {
                setEditProductField(response.data[0].name)
                setEditQuantityField(response.data[0].quantity)
                setEditCategorieField(response.data[0].categoriesId)
            })
        setEditModal(true)
    }

    const openDeleteModal = (id) => {
        setSelectedId(id)
        setDeleteModal(true)
    }

    const editProduct = () => {
        if (editProductField !== '' && editQuantityField !== '' && editCategorieField !== '') {
            if (parseInt(editQuantityField) >= 0) {
                axios.put(`${ENV}/products/${selectedId}`, {
                    categoriesId: parseInt(editCategorieField),
                    userId: parseInt(cookie['userId']),
                    quantity: parseInt(editQuantityField),
                    name: editProductField
                })
                    .then(() => {
                        getProducts()
                        getCategories()
                        toast.success('Produto editado com sucesso !')
                    })

                setEditModal(false)
            }
        }
        if (editProductField !== '' && editQuantityField !== '' && editCategorieField === '') {
            toast.error('você deve selecionar uma categoria')
        }
    }

    const addQuantity = (product) => {
        axios.put(`${ENV}/products/${product.id}`, {
            categoriesId: product.categoriesId,
            userId: parseInt(cookie['userId']),
            quantity: product.quantity + 1,
            name: product.name
        })
            .then(() => {
                getProducts()
                getCategories()
                toast.success(`${product.name} adicionado !`)
            })
    }

    const removeQuantity = (product) => {
        if (product.quantity > 0) {
            axios.put(`${ENV}/products/${product.id}`, {
                categoriesId: parseInt(product.categoriesId),
                userId: parseInt(cookie['userId']),
                quantity: product.quantity - 1,
                name: product.name
            })
                .then(() => {
                    getProducts()
                    getCategories()
                    toast.success(`${product.name} removido !`)
                })
        } else {
            toast.error('Produto não tem quantidade, impossível remover !')
        }
    }

    const deleteProduct = () => {
        axios.delete(`${ENV}/products/${selectedId}`).then(() => {
            getProducts()
            getCategories()
            setDeleteModal(false)
            toast.success('Produto deletado com sucesso !')
        })
    }

    const searchItem = (item) => {
        axios.get(`${ENV}/products?userId=${cookie['userId']}&name_like=${item}&_expand=categories`)
            .then(response => {
                setProducts(response.data)
            })
    }

    useEffect(() => {
        getCategories()
        getProducts()
    }, [getCategories, getProducts])


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
            <Form className='flex flex-col w-full items-center gap-5 px-10 lg:flex-row lg:w-8/12'>
                <Input required
                    label="Produto"
                    value={productField}
                    getValue={(value) => setProductField(value)}
                    placeholder="Digite o nome..."
                    className="w-full"
                />
                <Input
                    required
                    label="Quantidade"
                    type="number"
                    value={quantityField}
                    getValue={(value) => setQuantityField(value)}
                    placeholder="Quantidade"
                    className="w-full"
                />
                <Select
                    label="Categoria"
                    getValue={(value) => setCategorieField(value)}
                    value={categorieField}
                    options={categories}
                />
                <Button
                    onClick={() => addProduct()}
                    name="Adicionar +"
                    className="lg:self-end w-full lg:w-32"
                />
            </Form>
            <div className="flex justify-end pt-14 w-full px-10 lg:px-0 lg:w-8/12">
                <Input getValue={(value) => searchItem(value)} size={25} placeholder='Pesquisar...' className="w-full lg:w-64" />
            </div>
            <Table className="flex flex-col w-full lg:w-8/12 pt-6"
                theads={theads}
                tbodies={products}
                addRemove={true}
                noContent="Oops... parece que você não tem nenhum produto cadastrado ainda."
                actions
                onEdit={(value) => openEditModal(value)}
                onDelete={(value) => openDeleteModal(value)}
                onAdd={(value) => addQuantity(value)}
                onRemove={(value) => removeQuantity(value)}
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
                        <Button onClick={() => setEditModal(false)} className="lg:w-32">Cancelar</Button>
                        <Button onClick={() => editProduct()} className="btn-info lg:w-32">Editar</Button>
                    </div>
                </Form>
            </Modal>
        </div>
    )
}

export default Products