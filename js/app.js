// Main application logic for Schuitema Family Recipes
let currentView = 'list';
let currentRecipe = null;

function init() {
  showSection('recipes');
  setupEventListeners();
  if (window.location.hash) {
    const id = window.location.hash.substring(1);
    const recipe = recipes.find(r => r.id === id);
    if (recipe) showRecipe(recipe);
  }
}

function showSection(section) {
  document.querySelectorAll('.section').forEach(el => el.style.display = 'none');
  const target = document.getElementById(section + '-section');
  if (target) target.style.display = 'block';
  currentView = section;
  if (section === 'recipes') renderRecipeList();
  if (section === 'add') resetAddForm();
}

function renderRecipeList(filterText = '', category = 'All') {
  const container = document.getElementById('recipe-list');
  if (!container) return;
  const filtered = recipes.filter(r => {
    const matchesText = !filterText || 
      r.title.toLowerCase().includes(filterText.toLowerCase()) ||
      r.ingredients.some(i => i.toLowerCase().includes(filterText.toLowerCase())) ||
      r.tags.some(t => t.toLowerCase().includes(filterText.toLowerCase())) ||
      (r.description && r.description.toLowerCase().includes(filterText.toLowerCase()));
    const matchesCat = category === 'All' || r.category === category;
    return matchesText && matchesCat;
  });

  if (filtered.length === 0) {
    container.innerHTML = '<p style="text-align:center; padding:2rem; font-style:italic;">No recipes found. Try a different search or add a new family treasure!</p>';
    return;
  }

  container.innerHTML = filtered.map(r => `
    <div class="recipe-card" onclick="showRecipeById('${r.id}')">
      <h3>${escapeHtml(r.title)}</h3>
      <div class="meta">${r.category} · Serves ${r.servings} · ${r.prepTime}</div>
      <p>${escapeHtml(r.description || '').substring(0, 120)}...</p>
    </div>
  `).join('');
}

function showRecipeById(id) {
  const recipe = recipes.find(r => r.id === id);
  if (recipe) showRecipe(recipe);
}

function showRecipe(recipe) {
  currentRecipe = recipe;
  document.getElementById('recipe-detail-title').textContent = recipe.title;
  document.getElementById('recipe-detail-meta').innerHTML = `
    <strong>Category:</strong> ${recipe.category} &nbsp;|&nbsp;
    <strong>Servings:</strong> ${recipe.servings} &nbsp;|&nbsp;
    <strong>Prep:</strong> ${recipe.prepTime} &nbsp;|&nbsp;
    <strong>Cook:</strong> ${recipe.cookTime || '—'}
  `;
  document.getElementById('recipe-detail-desc').textContent = recipe.description || '';
  
  document.getElementById('recipe-ingredients').innerHTML = recipe.ingredients.map(i => `<li>${escapeHtml(i)}</li>`).join('');
  document.getElementById('recipe-instructions').innerHTML = recipe.instructions.map(i => `<li>${escapeHtml(i)}</li>`).join('');
  
  const notesEl = document.getElementById('recipe-notes');
  if (recipe.notes) {
    notesEl.innerHTML = `<div class="notes-box"><strong>Family Notes:</strong> ${escapeHtml(recipe.notes)}</div>`;
    notesEl.style.display = 'block';
  } else {
    notesEl.style.display = 'none';
  }

  showSection('detail');
  window.location.hash = recipe.id;
}

function setupEventListeners() {
  const searchInput = document.getElementById('search-input');
  const categorySelect = document.getElementById('category-filter');
  if (searchInput) {
    searchInput.addEventListener('input', () => {
      renderRecipeList(searchInput.value, categorySelect.value);
    });
  }
  if (categorySelect) {
    categorySelect.addEventListener('change', () => {
      renderRecipeList(searchInput.value, categorySelect.value);
    });
  }

  const addForm = document.getElementById('add-recipe-form');
  if (addForm) {
    addForm.addEventListener('submit', handleAddRecipe);
  }
}

function handleAddRecipe(e) {
  e.preventDefault();
  const form = e.target;
  const newRecipe = {
    id: form.title.value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') + '-' + Date.now().toString(36),
    title: form.title.value.trim(),
    category: form.category.value,
    servings: parseInt(form.servings.value) || 4,
    prepTime: form.prepTime.value.trim(),
    cookTime: form.cookTime.value.trim(),
    description: form.description.value.trim(),
    ingredients: form.ingredients.value.split('\n').map(s => s.trim()).filter(Boolean),
    instructions: form.instructions.value.split('\n').map(s => s.trim()).filter(Boolean),
    notes: form.notes.value.trim(),
    tags: form.tags.value.split(',').map(s => s.trim().toLowerCase()).filter(Boolean)
  };

  currentRecipe = newRecipe;
  document.getElementById('preview-area').innerHTML = `
    <h3>Preview: ${escapeHtml(newRecipe.title)}</h3>
    <p><em>${escapeHtml(newRecipe.description)}</em></p>
    <strong>Ingredients:</strong><ul>${newRecipe.ingredients.map(i => `<li>${escapeHtml(i)}</li>`).join('')}</ul>
    <strong>Instructions:</strong><ol>${newRecipe.instructions.map(i => `<li>${escapeHtml(i)}</li>`).join('')}</ol>
    ${newRecipe.notes ? `<div class="notes-box">${escapeHtml(newRecipe.notes)}</div>` : ''}
  `;
  document.getElementById('preview-area').style.display = 'block';
  document.getElementById('post-actions').style.display = 'block';

  window.pendingRecipe = newRecipe;
  alert('Recipe created! Review the preview below, generate a PDF, then use the "Copy for Assistant" button to send it to your recipe assistant to post it on the site.');
}

function generatePDF() {
  if (!currentRecipe && !window.pendingRecipe) return alert('No recipe selected');
  const r = currentRecipe || window.pendingRecipe;

  const printWindow = window.open('', '_blank');
  printWindow.document.write(`
    <!DOCTYPE html>
    <html><head><title>${r.title} - Schuitema Family Recipes</title>
    <style>
      body { font-family: Georgia, serif; max-width: 700px; margin: 40px auto; padding: 20px; color: #3c2f2f; background: #faf6f0; }
      h1 { border-bottom: 2px solid #8b5a2b; }
      .meta { font-style: italic; color: #6b4f3a; }
      ul, ol { margin-left: 20px; }
      .notes { background: #fff8e7; padding: 15px; border-left: 4px solid #8b5a2b; margin-top: 20px; }
    </style></head><body>
    <h1>${escapeHtml(r.title)}</h1>
    <p class="meta">Category: ${r.category} | Servings: ${r.servings} | Prep: ${r.prepTime} | Cook: ${r.cookTime || '—'}</p>
    <p>${escapeHtml(r.description || '')}</p>
    <h2>Ingredients</h2>
    <ul>${r.ingredients.map(i => `<li>${escapeHtml(i)}</li>`).join('')}</ul>
    <h2>Instructions</h2>
    <ol>${r.instructions.map(i => `<li>${escapeHtml(i)}</li>`).join('')}</ol>
    ${r.notes ? `<div class="notes"><strong>Family Notes:</strong> ${escapeHtml(r.notes)}</div>` : ''}
    <p style="margin-top:40px; font-size:0.85em; text-align:center;">From the Schuitema Family Recipe Book</p>
    </body></html>
  `);
  printWindow.document.close();
  printWindow.focus();
  setTimeout(() => printWindow.print(), 500);
}

function copyForAssistant() {
  const r = window.pendingRecipe;
  if (!r) return alert('No pending recipe');
  const json = JSON.stringify(r, null, 2);
  navigator.clipboard.writeText(json).then(() => {
    alert('Recipe JSON copied! Paste it to your Schuitema Recipe Assistant bot with a message like: "Please add this recipe to the family site: [paste]"');
  }).catch(() => {
    const ta = document.createElement('textarea');
    ta.value = json;
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);
    alert('Recipe copied to clipboard!');
  });
}

function resetAddForm() {
  const form = document.getElementById('add-recipe-form');
  if (form) form.reset();
  document.getElementById('preview-area').style.display = 'none';
  document.getElementById('post-actions').style.display = 'none';
  window.pendingRecipe = null;
}

function scaleRecipe(factor) {
  if (!currentRecipe) return;
  const scaled = Math.round(currentRecipe.servings * factor);
  alert(`Scaled to ${scaled} servings (×${factor}). For precise scaling, adjust quantities manually or ask your assistant. Original servings: ${currentRecipe.servings}`);
}

function escapeHtml(text) {
  if (!text) return '';
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

function convertUnits() {
  const amount = parseFloat(document.getElementById('unit-amount').value);
  const from = document.getElementById('unit-from').value;
  const to = document.getElementById('unit-to').value;
  if (isNaN(amount)) return;

  const toMl = {
    'cup': 236.588, 'tbsp': 14.787, 'tsp': 4.929, 'oz': 29.574, 'ml': 1, 'l': 1000
  };
  const ml = amount * (toMl[from] || 1);
  const result = ml / (toMl[to] || 1);
  document.getElementById('unit-result').textContent = `${amount} ${from} ≈ ${result.toFixed(2)} ${to}`;
}

document.addEventListener('DOMContentLoaded', init);