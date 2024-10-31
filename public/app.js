const apiUrl = '/api/recipes';
const recipeForm = document.getElementById('recipeForm');
const recipeList = document.getElementById('recipeList');
const recipeIdInput = document.getElementById('recipeId');

// listar receitas
async function fetchRecipes() {
  const response = await fetch(apiUrl);
  const recipes = await response.json();
  recipeList.innerHTML = '';
  recipes.forEach(recipe => {
    const li = document.createElement('li');
    li.innerHTML = `
      <strong>${recipe.name}</strong> - ${recipe.type} <br>
      Ingredientes: ${recipe.ingredients.join(', ')}
      <button onclick="editRecipe(${recipe.id})">Editar</button>
      <button onclick="deleteRecipe(${recipe.id})">Deletar</button>
    `;
    recipeList.appendChild(li);
  });
}

// adicionar ou atualizar receita
recipeForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const recipeData = {
    name: document.getElementById('name').value,
    ingredients: document.getElementById('ingredients').value.split(',').map(i => i.trim()),
    type: document.getElementById('type').value,
  };

  const id = recipeIdInput.value;
  if (id) {
    // att receita
    await fetch(`${apiUrl}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(recipeData)
    });
  } else {
    // nova receita
    await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(recipeData)
    });
  }

  recipeForm.reset();
  recipeIdInput.value = '';
  fetchRecipes();
});

// puxar e preencher o formulário para editar
async function editRecipe(id) {
  const response = await fetch(`${apiUrl}/${id}`);
  const recipe = await response.json();
  document.getElementById('name').value = recipe.name;
  document.getElementById('ingredients').value = recipe.ingredients.join(', ');
  document.getElementById('type').value = recipe.type;
  recipeIdInput.value = recipe.id;
}

// deletar receita
async function deleteRecipe(id) {
  await fetch(`${apiUrl}/${id}`, { method: 'DELETE' });
  fetchRecipes();
}

fetchRecipes();
