async function lockedProfile() {
    let mainElement = document.querySelector('#main');
    mainElement.innerHTML = '';

    const url = 'http://localhost:3030/jsonstore/advanced/profiles';

    let response = await fetch(url);
    let data = Object.values(await response.json());

    data.forEach((user, i) => {
        let userCard = document.createElement('div');
        userCard.className = 'profile';
        let idCount = i + 1;
        userCard.innerHTML = `<img src="./iconProfile2.png" class="userIcon" />
                              <label>Lock</label>
                              <input type="radio" name="user${idCount}Locked" value="lock" checked>
                              <label>Unlock</label>
                              <input type="radio" name="user${idCount}Locked" value="unlock"><br>
                              <hr>
                              <label>Username</label>
                              <input type="text" name="user${idCount}Username" value="${user.username}" disabled readonly />
                              <div id="user1HiddenFields" style="display:none">
                                  <hr>
                                  <label>Email:</label>
                                  <input type="email" name="user${idCount}Email" value="${user.email}" disabled readonly />
                                  <label>Age:</label>
                                  <input type="email" name="user${idCount}Age" value="${user.age}" disabled readonly />
                              </div>
                              <button>Show more</button>`;
        mainElement.appendChild(userCard);
     });

    let buttons = document.querySelectorAll('div button');
    for (let i = 0; i < buttons.length; i++) {
        let button = buttons[i];
        let profileElement = button.parentElement;
        let lockedElement = profileElement.querySelector('input[value="lock"]');
        let hiddenInfoElement = profileElement.querySelector(`#user1HiddenFields`);

        button.addEventListener('click', () => {

            if (!lockedElement.checked && button.textContent == 'Show more') {
                hiddenInfoElement.style.display = 'block';
                button.textContent = 'Hide it';
            } else if (!lockedElement.checked && button.textContent == 'Hide it') {
                hiddenInfoElement.style.display = 'none';
                button.textContent = 'Show more';
            }
        });
    }
}