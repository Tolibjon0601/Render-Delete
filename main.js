const inputs = document.querySelectorAll(".input");
const form = document.querySelector(".form");
const box = document.querySelector(".box");
const modal = document.querySelector(".modal");
const content = document.querySelector(".content");
const loader = document.querySelector(".loader");
const render = (data) => {
  box.innerHTML = data.map(
    (item) => `
    <div>
      <img width="300" src="${item.url}" alt="img" />
      <h1>${item.title}</h1>
      <button onclick="openModal(${item.id})">show</button>
      <button data-delete="${item.id}">Delete</button>
    </div>
  `
  ).join("")
};
const getData = () => {
  fetch("http://localhost:3600/photos")
    .then((res) => res.json())
    .then((data) => {
      render(data);
    });
};

getData();

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let obj = {};

  // obj.title = inputs[0].value;
  // obj.url = inputs[1].value;
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
    .then((nurilloh) => nurilloh.json())
    .then(() => {
      getData();
    });
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
          <img width="300" src="${data.url}" alt="img" />
          <h1>${data.title}</h1>
        </div>
      `;
    })
    .finally(() => {
      loader.style.display = "none";
    });
};

const closeModal = () => {
  modal.classList.remove("active");
};
box.addEventListener("click",(e)=>{
if(e.target.dataset.delete){
fetch()
}
})