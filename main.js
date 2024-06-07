const inputs = document.querySelectorAll(".input");
const form = document.querySelector(".form");
const box = document.querySelector(".box");
const modal = document.querySelector(".modal");
const content = document.querySelector(".content");
const loader = document.querySelector(".loader");

const render = (data) => {
  box.innerHTML = data
    .map(
      (item) => `
    <div>
      <img width="300" height="300" src="${item.url}" alt="img" />
      <h1>${item.title}</h1>
      <button class="show_btn" onclick="openModal(${item.id})">show</button>
      <button class="delete_btn" data-delete="${item.id}">Delete</button>
    </div>
  `
    )
    .join("");
};

const getData = () => {
  fetch("http://localhost:3600/photos")
    .then((res) => res.json())
    .then((data) => {
      render(data);
    })
    .catch((error) => console.error("Error fetching data:", error));
};

getData();

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let obj = {};

  for (let i of inputs) {
    obj[i.name] = i.value;
    i.value = "";
  }

  fetch("http://localhost:3600/photos", {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(obj),
  })
    .then((res) => res.json())
    .then(() => {
      getData();
    })
    .catch((error) => console.error("Error posting data:", error));
});

const openModal = (id) => {
  content.innerHTML = "";
  loader.style.display = "block";
  modal.classList.add("active");
  fetch(`http://localhost:3600/photos/${id}`)
    .then((res) => res.json())
    .then((data) => {
      content.innerHTML = `
        <div>
          <img width="500" height="500" src="${data.url}" alt="img" />
          <h1>${data.title}</h1>
        </div>
      `;
    })
    .finally(() => {
      loader.style.display = "none";
    })
    .catch((error) => console.error("Error fetching modal data:", error));
};

const closeModal = () => {
  modal.classList.remove("active");
};

box.addEventListener("click", (e) => {
  if (e.target.dataset.delete) {
    const id = e.target.dataset.delete;
    if (confirm("Are you sure you want to delete this item?")) {
      fetch(`http://localhost:3600/photos/${id}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then(() => {
          getData();
        })
        .catch((error) => console.error("Error deleting data:", error));
    }
  }
});
