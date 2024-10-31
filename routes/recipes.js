const express = require('express');
const router = express.Router();

// Dados em memória (não persistem após reiniciar o servidor)
let recipes = [
  { id: 1, name: 'Bolo de Chocolate', ingredients: ['farinha', 'açúcar', 'chocolate'], type: 'sobremesa' },
  { id: 2, name: 'Salada Caesar', ingredients: ['alface', 'frango', 'molho caesar'], type: 'entrada' },
];

// Criar uma nova receita
router.post('/', (req, res) => {
  const newRecipe = { id: recipes.length + 1, ...req.body };
  recipes.push(newRecipe);
  res.status(201).json(newRecipe);
});

// Listar todas as receitas
router.get('/', (req, res) => {
  res.json(recipes);
});

// Obter uma receita por ID
router.get('/:id', (req, res) => {
  const recipe = recipes.find(r => r.id === parseInt(req.params.id));
  recipe ? res.json(recipe) : res.status(404).json({ message: 'Receita não encontrada' });
});

// Atualizar uma receita
router.put('/:id', (req, res) => {
  const recipeIndex = recipes.findIndex(r => r.id === parseInt(req.params.id));
  if (recipeIndex >= 0) {
    recipes[recipeIndex] = { ...recipes[recipeIndex], ...req.body };
    res.json(recipes[recipeIndex]);
  } else {
    res.status(404).json({ message: 'Receita não encontrada' });
  }
});

// Deletar uma receita
router.delete('/:id', (req, res) => {
  const recipeIndex = recipes.findIndex(r => r.id === parseInt(req.params.id));
  if (recipeIndex >= 0) {
    const deletedRecipe = recipes.splice(recipeIndex, 1);
    res.json(deletedRecipe);
  } else {
    res.status(404).json({ message: 'Receita não encontrada' });
  }
});

// Pesquisa por ingrediente ou tipo
router.get('/search', (req, res) => {
  const { ingredient, type } = req.query;
  const results = recipes.filter(recipe =>
    (ingredient ? recipe.ingredients.includes(ingredient) : true) &&
    (type ? recipe.type === type : true)
  );
  res.json(results);
});

module.exports = router;
