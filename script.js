const API_URL = 'https://api.github.com/users/';

const mainElm = document.getElementById('main');
const formElm = document.getElementById('form');
const searchElm = document.getElementById('search');

// test
getUser('florinpop17');

async function getUser(userName) {
  const resp = await fetch(API_URL + userName);
  const respDate = await resp.json();

  // test
  // console.log(respDate);

  createUserCard(respDate);

  getRepos(userName);
}

async function getRepos(userName) {
  const resp = await fetch(API_URL + userName + '/repos');
  const respData = await resp.json();

  // test
  console.log(respData);

  addReposToCard(respData);
}

function createUserCard(user) {
  const { avatar_url,
          name, bio,
          public_repos,
          followers,
          following } = user;

  const cardHTML = `
    <div class="card">
      <div class="avatar-container">
        <img class="avatar" src="${avatar_url}" alt="${name}" />
      </div>

      <div class="user-info">
        <h2>${name}</h2>
        <p>${bio}</p>

        <ul class="info">
          <li>${followers}<strong>Followers</strong></li>
          <li>${following}<strong>Following</strong></li>
          <li>${public_repos}<strong>Repos</strong></li>
        </ul>

        <div id="repos" class="repos"></div>
      </div>
    </div>
  `;

  mainElm.innerHTML = cardHTML;
}

function addReposToCard(repos) {
  const reposElm = document.getElementById('repos');

  // レポジトリリストを表示する
  repos
    .sort((a, b) => b.stargazers_count - a.stargazers_count)
    .slice(0, 10)
    .forEach(repo => {
      const repoElm = document.createElement('a');
      repoElm.classList.add('repo');

      repoElm.href = repo.html_url;
      repoElm.target = '_blank';
      repoElm.innerText = repo.name;

      reposElm.appendChild(repoElm);
  });
}

formElm.addEventListener('submit', event => {
  event.preventDefault();

  const user = searchElm.value;
  if(user) {
    getUser(user);
  }
  searchElm.value = '';
});