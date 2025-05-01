let sets = JSON.parse(localStorage.getItem("flashcardSets")) || [];

function saveSets() {
  localStorage.setItem("flashcardSets", JSON.stringify(sets));
}

function renderSets() {
  const setsList = document.getElementById("setsList");
  setsList.innerHTML = "";
  sets.forEach((set, index) => {
    const div = document.createElement("div");
    div.className = "set";
    div.textContent = set.name;
    setsList.appendChild(div);
  });
}

function addSet() {
  const input = document.getElementById("newSetName");
  const name = input.value.trim();
  if (name) {
    sets.push({ name: name, cards: [] });
    saveSets();
    renderSets();
    input.value = "";
  }
}

// Initial render
renderSets();
