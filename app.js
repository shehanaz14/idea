document.getElementById("ideaForm").addEventListener("submit", async function(event) {
    event.preventDefault();
    const title = document.getElementById("title").value.trim();
    const description = document.getElementById("description").value.trim();

    if (!title || !description) {
        alert("Please enter both title and description.");
        return;
    }

    const response = await fetch("http://localhost:5000/api/ideas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description })
    });

    const data = await response.json();

    if (response.ok) {
        if (data.message === "Idea already exists!") {
            alert("This idea already exists in the submitted ideas!");
        }
        document.getElementById("title").value = "";
        document.getElementById("description").value = "";
        loadIdeas();
    } else {
        alert(data.message || "Error submitting idea");
    }
});

async function loadIdeas() {
    const response = await fetch("http://localhost:5000/api/ideas");
    const ideas = await response.json();

    const ideasList = document.getElementById("ideasList");
    ideasList.innerHTML = "";

    ideas.forEach(idea => {
        const div = document.createElement("div");
        div.classList.add("idea-container");
        div.innerHTML = `
            <h3>${idea.title}</h3>
            <p>${idea.description}</p>
            <p class="guidelines">How to Bring This Idea to Life:</p>
            <ul>${idea.steps ? idea.steps.map(step => `<li>${step}</li>`).join("") : ""}</ul>
            <p class="guidelines">Skills & Technologies to Learn:</p>
            <ul>${idea.skills ? idea.skills.map(skill => `<li>${skill}</li>`).join("") : ""}</ul>
        `;
        ideasList.appendChild(div);
    });
}

loadIdeas();
