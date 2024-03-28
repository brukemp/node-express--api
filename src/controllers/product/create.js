import productModel from "../../models/productModel.js"

const create = (req, res) => {
	const product = req.body
	const validateData = productModel.validateCreate(product)
	if(!validateData.success){
		return res.status(400).json({
			error: "Dados Inválidos!",
			fields: validateData.error.flatten().fieldErrors
		})
	}

	const result = productModel.create(product)
	res.json({
		success: "Produto adicionado com sucesso!",
		products: result
	})
}

export default create