// LOGIN
async function signUp() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    try {
      await firebase.auth.createUserWithEmailAndPassword(auth, email, password);
      showUser();
    } catch (error) {
      alert("Signup error: " + error.message);
    }
  }
  
  async function logIn() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    try {
      await firebase.auth.signInWithEmailAndPassword(auth, email, password);
      showUser();
      loadSets();
    } catch (error) {
      alert("Login error: " + error.message);
    }
  }
  
  function showUser() {
    const user = auth.currentUser;
    document.getElementById('userInfo').textContent = user ? "Logged in as: " + user.email : "Not logged in";
  }
  
  async function addSet() {
    const input = document.getElementById('newSetName');
    const name = input.value.trim();
    const user = auth.currentUser;
    if (name && user) {
      await addDoc(collection(db, "flashcardSets"), {
        uid: user.uid,
        name: name,
        cards: []
      });
      input.value = '';
      loadSets();
    }
  }
  
  async function loadSets() {
    const user = auth.currentUser;
    const setsList = document.getElementById('setsList');
    setsList.innerHTML = '';
    if (!user) return;
  
    const q = query(collection(db, "flashcardSets"), where("uid", "==", user.uid));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(doc => {
      const div = document.createElement('div');
      div.className = 'set';
      div.textContent = doc.data().name;
      setsList.appendChild(div);
    });
  }
  
  auth.onAuthStateChanged(user => {
    if (user) {
      showUser();
      loadSets();
    }
  });

// SETS
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
