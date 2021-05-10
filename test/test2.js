"use strict";

function displayUser(users) {
  const usersDiv = document.getElementById("users");
  const ul = document.createElement("ul");

  users.forEach((user) => {
    const li = document.createElement("li");
    li.textContent = user.firstName + " " + user.lastName;
    ul.appendChild(li);
  });
  usersDiv.appendChild(ul);
}

async function request(url, options = {}) {
  const response = await fetch(url, options);
  const result = await response.json();
  const users = result.users;
  displayUser(users);
}

request("users.json");
