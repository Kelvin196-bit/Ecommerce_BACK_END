const { Produto, Imagem, Opcao, Categoria } = require('../models/associate');
const { Op } = require('sequelize');

class ProdutoController {
   async buscarProdutos(req, res) {
    try {
      const {
        limit = 12,
        page = 1,
        match,
        fields,
        category_ids,
        'price-range': priceRange,
        ...optionsFilters // para option[45]=GG,PP
      } = req.query;
      //limit é o range de páginas que é solicitado
      //page é a posição em que o range de paginas é mostrado
      //offset calcula a quantidade de paginas que salta
      const offset = (page - 1) * limit;

      // Campos selecionados
      const selectedFields = fields ? fields.split(',') : undefined;

      // Consulta ao banco
      //quando se passa um valor indefinido para sequelize ele retorna todos os resultados da busca. Também vale se selectedFields = undefined.
      const limiteFinal = limit == -1 ? undefined : parseInt(limit);
      const offsetFinal = limit == -1 ? undefined : offset

      const where = {};
      console.log('where', where)
      const produtos = await Produto.findAll({
      where,
      attributes: selectedFields,
      limit: limiteFinal,
      offset: offsetFinal,
      include: [
        { model: Imagem, as: 'images' },
        { model: Opcao, as: 'options' },
        category_ids
          ? {
              model: Categoria,
              as: 'categorias',
              where: { id: category_ids.split(',').map(Number) }
            }
          : {
              model: Categoria,
              as: 'categorias'
            }
      ]
    });

      // Filtros dinâmicos
      //pega os valores guardados nas variáveis criadas por meio da descontrução do objeto req.query e realiza a filtragem.

      if (match) {
        where[Op.or] = [
          { name: { [Op.like]: `%${match}%` } },
          { description: { [Op.like]: `%${match}%` } }
        ];
      }


      if (priceRange) {
        const [min, max] = priceRange.split('-').map(Number);
        where.price = { [Op.between]: [min, max] };
      }

      return res.json(produtos);
    } catch (error) {
      console.error('Erro ao buscar produtos:', error);
      return res.status(500).json({ erro: 'Erro interno do servidor' });
    }
  }
     async consultarPorId(req, res) {
    const { id } = req.params;

    try {
      const produto = await Produto.findByPk(id, {
        include: [
          { model: Imagem, as: 'images', attributes: ['id', 'content'] },
          { model: Opcao, as: 'options' },
          { model: Categoria, as: 'categorias', attributes: ['id'] }
        ]
      });

      if (!produto) {
        return res.status(404).json({ erro: 'Produto não encontrado.' });
      }

      // Extrai apenas os IDs das categorias
      const category_ids = produto.categorias.map(c => c.id);

      // Remove o campo categorias original para não repetir
      const resultado = {
        ...produto.toJSON(),
        category_ids
      };
      delete resultado.categorias;

      return res.json(resultado);

    } catch (error) {
      console.error('Erro ao buscar produto por ID:', error);
      return res.status(500).json({ erro: 'Erro interno do servidor' });
    }
  }
   async criar(req, res) {
    const {
      enabled,
      name,
      slug,
      stock,
      description,
      price,
      price_with_discount,
      category_ids,
      images,
      options
    } = req.body;

    try {
      // 1. Cria o produto
      const produto = await Produto.create({
        enabled,
        name,
        slug,
        stock,
        description,
        price,
        price_with_discount
      });

      // 2. Associa categorias (tabela N:N)
      if (category_ids && category_ids.length > 0) {
        await produto.setCategorias (category_ids); // usa relacionamento belongsToMany
      }

      // 3. Cria imagens associadas
      if (images && images.length > 0) {
        const imagensCriadas = images.map(img => ({
          ...img,
          produto_id: produto.id
        }));
        await Imagem.bulkCreate(imagensCriadas);
      }

      // 4. Cria opções associadas
      if (options && options.length > 0) {
        const opcoesCriadas = options.map(opt => ({
          ...opt,
          produto_id: produto.id
        }));
        await Opcao.bulkCreate(opcoesCriadas);
      }

      return res.status(201).json({ message: 'Produto criado com sucesso!' });
    } catch (error) {
      console.error('Erro ao criar produto:', error);
      return res.status(500).json({ erro: 'Erro interno do servidor' });
    }
  }
   async atualizar(req, res) {
  const id = req.params.id;
  const {
    enabled, name, slug, stock, description,
    price, price_with_discount, category_ids,
    images = [], options = []
  } = req.body;

  const produto = await Produto.findByPk(id, {
    include: ['images', 'options', 'categorias']
  });

  if (!produto) {
    return res.status(404).json({ erro: 'Produto não encontrado' });
  }

  // Atualiza campos principais
  await produto.update({
    enabled, name, slug, stock, description, price, price_with_discount
  });

  // Atualiza categorias (N:N)
  await produto.setCategorias (category_ids);

  // Atualiza imagens:
  for (const imagem of images) {
    if (imagem.deleted) {
      await Imagem.destroy({ where: { id: imagem.id, produto_id: id } });
    } else if (imagem.id) {
      await Imagem.update(imagem, { where: { id: imagem.id } });
    } else {
      await Imagem.create({ ...imagem, produto_id: id });
    }
  }

  // Atualiza opções:
  for (const opcao of options) {
    if (opcao.deleted) {
      await Opcao.destroy({ where: { id: opcao.id, produto_id: id } });
    } else if (opcao.id) {
      await Opcao.update(opcao, { where: { id: opcao.id } });
    } else {
      await Opcao.create({ ...opcao, produto_id: id });
    }
  }

  return res.status(200).json({ message: 'Produto atualizado com sucesso' });
}
 async deletarProduto(req, res) {
  const id = req.params.id;

  try {
    const produto = await Produto.findByPk(id);
    if (!produto) {
      return res.status(404).json({ erro: 'Produto não encontrado' });
    }

    // Apaga todas imagens relacionadas
    await Imagem.destroy({ where: { produto_id: id } });

    // Apaga todas opções relacionadas
    await Opcao.destroy({ where: { produto_id: id } });

    // Remove categorias relacionadas (se for N:N)
    await produto.setCategorias ([]); // desassocia todas categorias

    // Deleta o produto
    await produto.destroy();

    return res.status(200).json({ message: 'Produto e dados relacionados deletados com sucesso' });
  } catch (error) {
    return res.status(500).json({ erro: 'Erro ao deletar produto' });
  }
}

}





module.exports = new ProdutoController;
