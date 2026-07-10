// app.js - Logique et interface de l'application Minecraft Inventory Helper

// ÉTAT DE L'INVENTAIRE (36 slots vides au départ)
let inventory = Array(36).fill(null);
let selectedSlot = null; // Garde en mémoire l'index du slot cliqué

// INITIALISATION AU CHARGEMENT DE LA PAGE
document.addEventListener("DOMContentLoaded", () => {
    renderInventoryGrid();
    setupItemSelector();
    renderCraftGuide();
    setupSearchBar();
});

// 1. GESTION DU VISUEL DE L'INVENTAIRE
function renderInventoryGrid() {
    const mainInv = document.getElementById('main-inventory');
    const hotbarInv = document.getElementById('hotbar-inventory');
    
    if (!mainInv || !hotbarInv) return;
    
    mainInv.innerHTML = '';
    hotbarInv.innerHTML = '';

    for (let i = 0; i < 36; i++) {
        const slotData = inventory[i];
        const slotDiv = document.createElement('div');
        slotDiv.className = `inventory-slot ${selectedSlot === i ? 'selected' : ''}`;
        slotDiv.dataset.slot = i;
        
        // Clic sur une case pour la sélectionner
        slotDiv.onclick = () => selectSlot(i);

        // Si la case contient une ressource valide, on affiche son image et sa quantité
        if (slotData && itemDatabase[slotData.itemId]) {
            const item = itemDatabase[slotData.itemId];
            slotDiv.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <span class="count">${slotData.count}</span>
            `;
        }

        // Séparation logique entre le grand sac (0 à 26) et la hotbar (27 à 35)
        if (i < 27) {
            mainInv.appendChild(slotDiv);
        } else {
            hotbarInv.appendChild(slotDiv);
        }
    }
}

// Remplit le sélecteur d'items avec les objets de la base de données
function setupItemSelector() {
    const selector = document.getElementById('item-selector');
    if (!selector) return;
    
    selector.innerHTML = '';
    for (const key in itemDatabase) {
        // On n'affiche principalement que les items de base compressibles ou significatifs
        if(itemDatabase[key].compactsInto !== null || key.includes("block")) { 
            selector.innerHTML += `<option value="${key}">${itemDatabase[key].name}</option>`;
        }
    }
}

// Active la bordure de sélection au clic sur une case
function selectSlot(slotIndex) {
    selectedSlot = slotIndex;
    renderInventoryGrid();
}

// 2. ACTION : METTRE UN ITEM DANS LA CASE SÉLECTIONNÉE
function addItemToInventory() {
    if (selectedSlot === null) {
        alert("Sélectionne d'ici d'abord une case de ton inventaire en cliquant dessus !");
        return;
    }

    const itemId = document.getElementById('item-selector').value;
    const count = parseInt(document.getElementById('item-count').value, 10);

    if (count > 0 && count <= 64) {
        inventory[selectedSlot] = { itemId: itemId, count: count };
        renderInventoryGrid();
        calculateOptimization(); // Lance l'analyse
    }
}

// 3. L'ALGORITHME DE COMPACTAGE D'INVENTAIRE
function calculateOptimization() {
    const resultsBox = document.getElementById('optimization-results');
    if (!resultsBox) return;
    
    // Calcul du cumul total de chaque ressource présente dans les 36 slots
    let totals = {};
    inventory.forEach(slot => {
        if (slot) {
            totals[slot.itemId] = (totals[slot.itemId] || 0) + slot.count;
        }
    });

    let adviceHTML = "";
    let totalSlotsSaved = 0;

    for (const itemId in totals) {
        const totalCount = totals[itemId];
        const itemInfo = itemDatabase[itemId];

        // S'il peut être compacté en bloc
        if (itemInfo && itemInfo.compactsInto) {
            const ratio = itemInfo.ratio;
            const blockCount = Math.floor(totalCount / ratio);
            const remainder = totalCount % ratio;

            if (blockCount > 0) {
                const targetItemInfo = itemDatabase[itemInfo.compactsInto];
                
                // Calcul de l'encombrement avant/après
                const slotsBefore = Math.ceil(totalCount / 64);
                const slotsAfter = Math.ceil(blockCount / 64) + (remainder > 0 ? 1 : 0);
                const slotsSaved = slotsBefore - slotsAfter;

                if (slotsSaved > 0) {
                    totalSlotsSaved += slotsSaved;
                }

                adviceHTML += `
                    <div class="advice-card">
                        <strong>${itemInfo.name} :</strong> Tu en as ${totalCount}.<br>
                        🔨 Crafte <strong>${blockCount}x ${targetItemInfo ? targetItemInfo.name : itemInfo.compactsInto}</strong> 
                        ${remainder > 0 ? `(il restera ${remainder} ${itemInfo.name})` : ''}.<br>
                        <span class="green-text">Gain de place : +${slotsSaved} slot(s) !</span>
                    </div>
                    <hr class="advice-divider">
                `;
            }
        }
    }

    // Affichage des conseils d'optimisation
    if (adviceHTML === "") {
        resultsBox.innerHTML = `<p class="placeholder-text">Aucun compactage avantageux pour le moment. Ajoute plus de lingots ou de poudres !</p>`;
    } else {
        resultsBox.innerHTML = `
            <div class="summary-box">
                <h4>ÉCONOMIE D'ESPACE : <span class="highlight-count">${totalSlotsSaved} cases</span> libérées !</h4>
            </div>
            <div class="advice-list">${adviceHTML}</div>
        `;
    }
}

// 4. GENERATION ET FILTRE DU GUIDE DES CRAFTS
function renderCraftGuide(filterText = "") {
    const container = document.getElementById('crafts-container');
    if (!container) return;
    
    container.innerHTML = '';

    for (const key in itemDatabase) {
        const item = itemDatabase[key];
        
        // Filtre de la barre de recherche
        if (filterText !== "" && !item.name.toLowerCase().includes(filterText.toLowerCase())) {
            continue;
        }

        const card = document.createElement('div');
        card.className = 'item-card';

        let craftInfo = "Ressource de base / Autre";
        if (item.compactsInto) {
            const targetItem = itemDatabase[item.compactsInto];
            craftInfo = `🔨 9x ➔ 1x ${targetItem ? targetItem.name : item.compactsInto}`;
        } else {
            const sourceItemKey = Object.keys(itemDatabase).find(k => itemDatabase[k].compactsInto === key);
            if (sourceItemKey) {
                craftInfo = `🧱 Bloc compacté`;
            }
        }

        card.innerHTML = `
            <div class="inventory-slot">
                <img src="${item.image}" alt="${item.name}">
            </div>
            <span>${item.name}</span>
            <small style="color: #666; font-size: 0.75rem; margin-top: 4px; display: block;">${craftInfo}</small>
        `;

        container.appendChild(card);
    }

    if (container.innerHTML === '') {
        container.innerHTML = `<p class="placeholder-text" style="grid-column: 1/-1; text-align: center;">Aucun craft trouvé pour "${filterText}"</p>`;
    }
}

// Liaison de la barre de recherche
function setupSearchBar() {
    const searchBar = document.getElementById('search-bar');
    if (searchBar) {
        searchBar.addEventListener('input', (e) => {
            renderCraftGuide(e.target.value);
        });
    }
}
