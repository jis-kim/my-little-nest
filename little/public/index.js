const socket = new io();
socket.on('alertNewUser', (data) => {
  alert(`new user : ${data.name}, age : ${data.age} joinned!`);
});

const form = document.querySelector('form');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = form.querySelector('#name').value;
  const age = +form.querySelector('#age').value;
  const password = form.querySelector('#password').value;
  const data = { name, age, password };
  fetch('/user', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  }).then((res) => {
    let msg = 'fail';
    if (res.status === 201) {
      msg = 'success';
      socket.emit('newUser', { name, age });
    }
    alert(msg);
  });
});

const userDeleteButton = (user) => {
  const deleteButton = document.createElement('button', {
    id: `user${user.id}`,
  });

  deleteButton.innerHTML = 'delete';
  deleteButton.addEventListener('click', () => {
    fetch(`/user/${user.id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to delete resource');
        }
        console.log('Resource deleted successfully');
      })
      .catch((error) => {
        console.error(error);
      });
  });
  return deleteButton;
};

const userModifyButton = (user) => {
  const modifyButton = document.createElement('button', {
    id: `user${user.id}`,
  });

  modifyButton.innerHTML = 'modify';
  modifyButton.addEventListener('click', () => {
    const name = prompt('변경할 이름을 입력하세요.');
    if (name == null) return;
    fetch(`/user/${user.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to delete resource');
        }
      })
      .catch((error) => {
        console.error(error);
        alert('닉네임은 20 byte 제한이 있답니다,,');
      });
  });
  return modifyButton;
};

const userList = document.querySelector('#user-list');

(() => {
  fetch('/user')
    .then((res) => res.json())
    .then((data) => {
      for (const user of data) {
        const li = document.createElement('li', { id: `user${user.id}` });
        li.innerHTML = `name : ${user.name}, age : ${user.age}&nbsp&nbsp`;
        userList.appendChild(li);

        li.appendChild(userDeleteButton(user));
        li.appendChild(userModifyButton(user));
      }
    });
})();
