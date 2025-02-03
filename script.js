async function loadFamilyData() {
    const response = await fetch("family.json");
    const familyData = await response.json();
    renderTree(familyData);
}

function renderTree(familyData) {
    const container = document.querySelector(".tree-container");

    Object.keys(familyData).forEach(person => {
        const node = document.createElement("div");
        node.classList.add("node");
        node.textContent = familyData[person].name;
        container.appendChild(node);

        // Positioning (Basic Example)
        if (familyData[person].parents.length > 0) {
            node.style.top = "50px";  // Parents move up
        }
        if (familyData[person].siblings.length > 0) {
            node.style.left = "100px"; // Siblings move sideways
        }
        if (familyData[person].spouse) {
            node.style.right = "100px"; // Spouse moves slightly closer
        }
        if (familyData[person].children.length > 0) {
            node.style.bottom = "100px"; // Children move below
        }
    });
}

window.onload = loadFamilyData;


