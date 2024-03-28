import {products} from '../db-memory/products.js'
import {z} from 'zod'

const productSchema = z.object({
	id: z
		.number({
			invalid_type_error: 'O id deve ser numérico.',
			required_error: 'Id obrigatório.'
		}),
		name: z
		.string({
			invalid_type_error: 'O nome deve ser uma string.',
			required_error: 'Nome obrigatório.'
		})
		.min(3, {message: 'O nome do usuário deve ter ao menos 3 lestras.'})
		.max(200, {message: 'O nome do usuário deve ter no máximo 200 caracteres.'}),
		value: z
			.number({
				invalid_type_error: 'O preço deve ser um número',
				required_error: 'Preço obrigatório.'
			}),
		category: z
			.string({
				invalid_type_error: 'A categoria deve ser uma string',
				required_error: 'Categoria obrigatória.'
			})
			.min(3,{message: 'A categoria deve ter mo mínimo 3 caracteres'})
			.max(50,{message: 'A categoria deve ter mo máximo 50 caracteres'}),
		photo: z
			.string({
				invalid_type_error: 'A foto deve ser uma string',
				required_error: 'Foto obrigatório'
			})
			.url({message: 'Url da foto inválida.'})

})
const validateCreate = (product) =>{
	const partialProductSchema = productSchema.partial({id: true})
	return partialProductSchema.safeParse(product)
}

const list = () => {
    return products
}

const create = (product) =>{
    product.id = products[products.length - 1].id + 1
	products.push(product)
    return products
}

const edit = (newProduct) => {
    return products.map(product => {
		if (product.id === newProduct.id) {
			return {
				id: product.id,
				name: newProduct.name || product.name,
				value: newProduct.value || product.value,
				category: newProduct.category || product.category,
				photo: newProduct.photo || product.photo
			}
		}
		return product
	})
}

const remove = (id) => {
    return products.filter(product => product.id !== id)
}

export default {list, create, edit, remove, validateCreate} 