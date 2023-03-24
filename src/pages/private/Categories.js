import React, { useCallback, useEffect, useState } from 'react'
import Form from '../../components/Form'
import Button from '../../components/Button'
import Input from '../../components/Input'
import Table from '../../components/Table'
import { useCookies } from 'react-cookie'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import Modal from '../../components/Modal'
import { BsFillTrashFill } from 'react-icons/bs'
import { ENV } from '../helpers/env'

const Categories = () => {
  const [cookie] = useCookies()

  const [categorieField, setCategorieField] = useState('')
  const [categories, setCategories] = useState([])
  const [editCategorieField, setEditCategorieField] = useState('')

  const [selectedId, setSelectedId] = useState()

  const [deleteModal, setDeleteModal] = useState(false)
  const [editModal, setEditModal] = useState(false)


  const getCategories = useCallback(() => {
    axios.get(`${ENV}/categories?userId=${cookie['userId']}`)
      .then(response => {
        setCategories(response.data)
      })
  }, [cookie])

  const searchItem = (item) => {
    axios.get(`${ENV}/categories?userId=${cookie['userId']}&name_like=${item}`)
      .then(response => {
        setCategories(response.data)
      })
  }

  const clearInput = () => {
    setCategorieField('')
  }

  const addCategorie = () => {
    if (categorieField !== '') {
      axios.post(`${ENV}/categories`, {
        userId: parseInt(cookie['userId']),
        name: categorieField
      }).then(response => {
        getCategories()
        toast.success('Categoria adicionada com sucesso !')
        clearInput()
      })
    }
  }

  const openEditModal = (id) => {
    setSelectedId(id)
    axios.get(`${ENV}/categories?id=${id}`)
      .then(response => {
        setEditCategorieField(response.data[0].name)
      })

    setEditModal(true)
  }

  const openDeleteModal = (id) => {
    setSelectedId(id)
    setDeleteModal(true)
}

  const editCategorie = () => {
    if (editCategorieField !== '') {
      axios.put(`${ENV}/categories/${selectedId}`, {
        userId: parseInt(cookie['userId']),
        name: editCategorieField
      })
        .then(() => {
          getCategories()
          toast.success('Categoria editada com sucesso !')
          setEditModal(false)
        })
    }
  }

  const deleteCategorie = () => {
    axios.get(`${ENV}/products?categoriesId=${selectedId}`)
    .then(response => {
      if(response.data.length > 0) {
        toast.error('Existem produtos vinculados a essa categoria, impossível deletar')
      } else {
        axios.delete(`${ENV}/categories/${selectedId}`).then(() => {
          getCategories()
          setDeleteModal(false)
          toast.success('Categoria deletada com sucesso !')
        })
      }
    })

  }

  const theads = [
    {
      id: 1,
      name: "nome"
    }
  ]

  useEffect(() => {
    getCategories()
  }, [getCategories])


  return (
    <div className="flex flex-col items-center w-screen">
      <Form className='flex flex-col gap-5 px-10 w-full lg:flex-row lg:w-8/12 lg:px-0 lg:justify-center'>
        <Input required
          label="Categoria"
          value={categorieField}
          getValue={(value) => setCategorieField(value)}
          placeholder="Digite o nome..."
          className="w-full lg:w-80"
        />
        <Button
          onClick={() => addCategorie()}
          name="Adicionar +"
          className="self-end w-full lg:self-end lg:w-32"
        />
      </Form>
      <div className="flex justify-end pt-14 w-full px-10 lg:w-8/12 lg:px-0">
        <Input getValue={(value) => searchItem(value)} placeholder='Pesquisar...' className="w-full lg:w-64" />
      </div>
      <Table className="flex flex-col w-full lg:w-8/12 pt-6"
        theads={theads}
        tbodies={categories}
        noContent="Oops... parece que você não tem nenhuma categoria cadastrada ainda."
        actions
        onEdit={(value) => openEditModal(value)}
        onDelete={(value) => openDeleteModal(value)}
      />
      <Modal title="Confirmar exclusão !" open={deleteModal}>
        <p>Você tem certeza que deseja excluir o item numero {selectedId} ? Essa ação é irreversivel.</p>
        <div className='modal-action'>
          <Button onClick={() => setDeleteModal(false)}>Cancelar</Button>
          <Button onClick={deleteCategorie} className='btn-error'><BsFillTrashFill className='mr-2' />Deletar</Button>
        </div>
      </Modal>
      <Modal title="Editar categoria !" open={editModal}>
        <Form>
          <Input
            required
            label="Produto"
            value={editCategorieField}
            getValue={(value) => setEditCategorieField(value)}
            size={120}
            placeholder="Digite o nome..."
          />
          <div className='modal-action'>
            <Button onClick={() => setEditModal(false)}>Cancelar</Button>
            <Button onClick={() => editCategorie()} className='btn-info'>Editar</Button>
          </div>
        </Form>
      </Modal>
    </div>
  )
}

export default Categories