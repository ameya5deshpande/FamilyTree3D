// script.js

document.addEventListener("DOMContentLoaded", async function () {
    const treeContainer = document.getElementById("tree-container");
    const familyData = await loadFamilyData();
    renderTree(familyData, treeContainer);
});

async function loadFamilyData() {
    const response = await fetch("family.json");
    return response.json();
}

function renderTree(data, container) {
    container.innerHTML = "";
    const nodes = {};

    data.forEach(person => {
        const node = document.createElement("div");
        node.className = "node";
        node.textContent = person.name;
        nodes[person.id] = node;
        container.appendChild(node);
    });

    data.forEach(person => {
        person.connections.forEach(connection => {
            createLink(nodes[person.id], nodes[connection]);
        });
    });
}

function createLink(fromNode, toNode) {
    if (!fromNode || !toNode) return;
    const line = document.createElement("div");
    line.className = "link";
    document.getElementById("tree-container").appendChild(line);
    positionLine(fromNode, toNode, line);
}

function positionLine(fromNode, toNode, line) {
    const fromRect = fromNode.getBoundingClientRect();
    const toRect = toNode.getBoundingClientRect();
    const x1 = fromRect.left + fromRect.width / 2;
    const y1 = fromRect.top + fromRect.height / 2;
    const x2 = toRect.left + toRect.width / 2;
    const y2 = toRect.top + toRect.height / 2;
    
    line.style.width = Math.hypot(x2 - x1, y2 - y1) + "px";
    line.style.transform = `rotate(${Math.atan2(y2 - y1, x2 - x1)}rad)`;
    line.style.left = x1 + "px";
    line.style.top = y1 + "px";
}


loadFamilyData();




