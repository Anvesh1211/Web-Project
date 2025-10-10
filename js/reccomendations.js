document.getElementById("addRecBtn").addEventListener("click", addRecommendation);

function addRecommendation() {
  const liked = document.getElementById("liked").value;
  const recommend = document.getElementById("recommend").value;
  const note = document.getElementById("note").value;

  if (!liked || !recommend) {
    alert("Please fill in both fields!");
    return;
  }

  const recCard = document.createElement("div");
  recCard.className = "rec-card";
  recCard.innerHTML = `
    <h3>If you liked <span>${liked}</span>...</h3>
    <p>You'll like <strong>${recommend}</strong></p>
    ${note ? `<p><em>Note:</em> ${note}</p>` : ""}
    <button class="edit-btn">✏️ Edit</button>
    <button class="delete-btn">🗑️ Delete</button>
  `;

  document.getElementById("recContainer").appendChild(recCard);

  document.getElementById("liked").value = "";
  document.getElementById("recommend").value = "";
  document.getElementById("note").value = "";

  recCard.querySelector(".delete-btn").addEventListener("click", () => recCard.remove());
  recCard.querySelector(".edit-btn").addEventListener("click", () => editRecommendation(recCard));
}

function editRecommendation(card) {
  const likedText = card.querySelector("span").innerText;
  const recommendText = card.querySelector("strong").innerText;
  const noteText = card.querySelector("em") ? card.querySelector("em").parentNode.innerText.replace("Note:", "").trim() : "";

  document.getElementById("liked").value = likedText;
  document.getElementById("recommend").value = recommendText;
  document.getElementById("note").value = noteText;

  card.remove();
}
