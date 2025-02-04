async function loadFamilyData() {
    const response = await fetch("family.json");
    const familyData = await response.json();
    renderTree(familyData);
}

function createNode(id, name, x, y, z = 0) {
    const node = document.createElement('div');
    node.classList.add('node');
    node.textContent = name;
    node.style.transform = `translate3d(${x}px, ${y}px, ${z}px)`;
    node.dataset.id = id;
    document.querySelector('.tree-container').appendChild(node);
}

function createLink(fromId, toId) {
    const container = document.querySelector('.tree-container');
    const fromNode = document.querySelector(`.node[data-id='${fromId}']`);
    const toNode = document.querySelector(`.node[data-id='${toId}']`);

    if (!fromNode || !toNode) return; // Skip if any node is missing

    const line = document.createElement('div');
    line.classList.add('link');
    container.appendChild(line);

    // Position line between nodes
    const fromRect = fromNode.getBoundingClientRect();
    const toRect = toNode.getBoundingClientRect();
    const x1 = fromRect.left + fromRect.width / 2;
    const y1 = fromRect.top + fromRect.height / 2;
    const x2 = toRect.left + toRect.width / 2;
    const y2 = toRect.top + toRect.height / 2;

    line.style.width = `${Math.hypot(x2 - x1, y2 - y1)}px`;
    line.style.transform = `translate(${x1}px, ${y1}px) rotate(${Math.atan2(y2 - y1, x2 - x1)}rad)`;
}

function renderTree(familyData) {
    let xOffset = 500; // Start from middle
    let yOffset = 50;
    const nodePositions = {}; // Store positions

    Object.keys(familyData).forEach((id) => {
        const person = familyData[id];
        let x = xOffset;
        let y = yOffset;
        
        if (person.parents && person.parents.length > 0) {
            // Place below parents
            const parentId = person.parents[0]; // Take first parent as reference
            if (nodePositions[parentId]) {
                x = nodePositions[parentId].x;
                y = nodePositions[parentId].y + 120;
            }
        }

        if (person.siblings && person.siblings.length > 0) {
            // Place siblings next to each other
            x += person.siblings.indexOf(id) * 150;
        }

        if (person.spouse) {
            // Place spouse next to them
            x += 100;
        }

        nodePositions[id] = { x, y };
        createNode(id, person.name, x, y);

        // Create connections
        if (person.parents) {
            person.parents.forEach((parentId) => createLink(parentId, id));
        }
        if (person.siblings) {
            person.siblings.forEach((siblingId) => createLink(id, siblingId));
        }
        if (person.spouse) {
            createLink(id, person.spouse);
        }
    });
}

loadFamilyData();




