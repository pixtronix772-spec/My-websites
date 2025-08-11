function loadProjects() {
  const projects = JSON.parse(localStorage.getItem('projects') || '[]');
  const list = document.getElementById('projectsList');
  list.innerHTML = '';
  projects.forEach((project, idx) => {
    const li = document.createElement('li');
    li.innerHTML = `<img class='thumb' src="${project.image}"/> <span class='project-link' data-id="${idx}">${project.title}</span>`;
    list.appendChild(li);
  });
}

function showProjectDetail(id) {
  const projects = JSON.parse(localStorage.getItem('projects') || '[]');
  const detail = document.getElementById('projectDetail');
  if (projects[id]) {
    const project = projects[id];
    detail.innerHTML = `
      <h1>${project.title}</h1>
      <img src="${project.image}" alt="Project Image">
      <p>${project.description}</p>
      <button id="closeDetail">Close</button>
    `;
    document.getElementById('closeDetail').onclick = function() {
      detail.innerHTML = '';
    };
  } else {
    detail.innerText = 'Project not found!';
  }
}

document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('projectsList').onclick = function(e) {
    if (e.target.classList.contains('project-link')) {
      const id = e.target.getAttribute('data-id');
      showProjectDetail(id);
    }
  };

  document.getElementById('projectForm').onsubmit = function(e) {
    e.preventDefault();
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const imageInput = document.getElementById('image');
    const reader = new FileReader();
    reader.onload = function() {
      const image = reader.result;
      const projects = JSON.parse(localStorage.getItem('projects') || '[]');
      projects.push({ title, description, image });
      localStorage.setItem('projects', JSON.stringify(projects));
      loadProjects();
      document.getElementById('projectForm').reset();
    };
    reader.readAsDataURL(imageInput.files[0]);
  };

  loadProjects();
});