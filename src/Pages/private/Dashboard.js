import React, { useCallback, useEffect, useState } from 'react'
import Card from '../../components/Card'
import Table from '../../components/Table'
import Modal from '../../components/Modal'
import { useCookies } from 'react-cookie'
import axios from 'axios'
import Input from '../../components/Input'
import { FiMoreHorizontal } from 'react-icons/fi'
import {AiFillCloseCircle} from 'react-icons/ai'
import { ENV } from '../../helpers/env'

const Dashboard = () => {
    const [cookies] = useCookies()
    const [products, setProducts] = useState([])
    const [productsCount, setProductsCount] = useState(0)
    const [categoriesCount, setCategoriesCount] = useState(0)
    const [outOfStockCount, setOutOfStockCount] = useState(0)
    const [outOfStock, setOutOfStock] = useState([])
    const [outOfStockModal, setOutOfStockModal] = useState(false)

    const getProducts = useCallback(() => {
        axios.get(`${ENV}/products?userId=${cookies['userId']}&_expand=categories`)
            .then(response => {
                setProducts(response.data)
            })
    }, [cookies])

    const getProductsCount = useCallback(() => {
        axios.get(`${ENV}/products?userId=${cookies['userId']}`)
            .then(response => {
                setProductsCount(response.data.length)
            })
    }, [cookies])
    const getOutOfStock = useCallback(() => {
        axios.get(`${ENV}/products?userId=${cookies['userId']}&quantity=0`)
            .then(response => {
                setOutOfStock(response.data)
                setOutOfStockCount(response.data.length)
            })
    }, [cookies])

    const getCategoriesCount = useCallback(() => {
        axios.get(`${ENV}/categories?userId=${cookies['userId']}`)
            .then(response => {
                setCategoriesCount(response.data.length)
            })
    }, [cookies])

    const searchItem = (item) => {
        axios.get(`${ENV}/products?userId=${cookies['userId']}&name_like=${item}&_expand=categories`)
            .then(response => {
                setProducts(response.data)
            })
    }

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

    useEffect(() => {
        getProducts()
        getProductsCount()
        getCategoriesCount()
        getOutOfStock()
    }, [getProducts, getProductsCount, getCategoriesCount, getOutOfStock,])

    return (
        <div>
            <div className="flex flex-col px-10 gap-y-8 lg:flex-row lg:justify-center lg:gap-y-0 lg:gap-x-48">
                <Card title="Produtos Cadastrados">
                    <span className="text-2xl text-center">{productsCount}</span>
                </Card>
                <Card title="Categorias Cadastradas">
                    <span className="text-2xl text-center">{categoriesCount}</span>
                </Card>
                <Card title="Produtos em Falta">
                    <span className="text-2xl text-center">{outOfStockCount}</span>
                    <FiMoreHorizontal onClick={() => setOutOfStockModal(true)} size={20} className="absolute bottom-4 right-6 cursor-pointer" />
                </Card>
            </div>
            <div className="flex flex-col items-center mt-10 justify-center w-screen">
                <div className="flex pt-14 w-full px-10 justify-center lg:w-8/12 lg:px-0 lg:justify-end">
                    <Input getValue={(value) => searchItem(value)} size={25} placeholder='Pesquisar...' className="w-full lg:w-64" />
                </div>
                <Table className="flex flex-col w-full lg:w-8/12 pt-6"
                    theads={theads}
                    tbodies={products}
                    noContent="Oops... parece que você não tem nenhum produto cadastrado ainda."
                />
            </div>
            <Modal open={outOfStockModal} title="Produtos em falta">
                <AiFillCloseCircle onClick={() => setOutOfStockModal(false)} className="btn btn-sm btn-circle absolute right-2 top-2" />
                <div className="h-96 overflow-y-auto pt-4">
                    {outOfStock.map(item => (
                        <p className="text-error" key={item.id}>{item.name}</p>
                    ))}
                </div>
            </Modal>
        </div>
    )
}

export default Dashboard