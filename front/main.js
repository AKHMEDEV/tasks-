const tasksList = document.getElementById("tasks-list");
const form = document.getElementById("form");

const BASE_URL = "http://localhost:4000";

async function writeToDoc() {
  const res = await fetch(`${BASE_URL}/tasks`);
  const tasks = await res.json();

  tasksList.innerHTML = "";

  if (!tasks.length) {
    tasksList.innerHTML = '<p class="text-center text-slate-500 text-lg border py-2 rounded border-slate-400">Empty</p>';
    return;
  }

  tasks.forEach((task) => {
    const div = document.createElement("div");
    div.className = "border p-2 rounded border-slate-400";

    div.innerHTML = `
    <div class="flex justify-between items-start">
      <div>
        <p class="font-bold text-lg ${task.completed ? ' text-green-400' : ''}">
          ${task.title}
        </p>
        <p class="text-sm text-slate-400 mb-2">${task.description}</p>
      </div>
      <div class="flex flex-col gap-2">
        <button onclick="completeTask(${task.id})" class="bg-slate-600 text-white px-2 py-1 rounded text-sm">✔️</button>
        <button onclick="deleteTask(${task.id})" class="bg-red-600 text-white px-2 py-1 rounded text-sm">🗑</button>
      </div>
    </div>
  `;
    tasksList.appendChild(div);
  });
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const title = e.target.title.value.trim();
  const description = e.target.desc.value.trim();

  if (!title || !description) return;

  await fetch(`${BASE_URL}/task`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title, description }),
  });

  form.reset();
  writeToDoc();
});

async function completeTask(id) {
  await fetch(`${BASE_URL}/task/${id}`, {
    method: "PATCH",
  });
  writeToDoc();
}

async function deleteTask(id) {
  await fetch(`${BASE_URL}/task/${id}`, {
    method: "DELETE",
  });
  writeToDoc();
}

writeToDoc();
