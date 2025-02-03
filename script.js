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
    document.querySelector('.tree-container').appendChild(node);
}

function renderTree(familyData) {
    let xOffset = 0; // Track x position for spacing

    Object.keys(familyData).forEach((id) => {
        const person = familyData[id];

        let x = xOffset;
        let y = person.parents ? -100 * (person.parents.length + 1) : 0;
        let z = person.siblings ? 50 : 0; // Move siblings slightly in Z-axis

        createNode(id, person.name, x, y, z);
        xOffset += 150; // Adjust spacing dynamically
    });
}

loadFamilyData();


