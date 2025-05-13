const form = document.getElementById("registerForm");
const listBody = document.querySelector("#guestList tbody");

function getGuests() {
  return JSON.parse(localStorage.getItem("guests") || "[]");
}

function saveGuests(guests) {
  localStorage.setItem("guests", JSON.stringify(guests));
}

function addGuest(guest) {
  const guests = getGuests();
  guests.push(guest);
  saveGuests(guests);
  renderGuests();
}

function checkInGuest(index) {
  const guests = getGuests();
  guests[index].checkedIn = true;
  saveGuests(guests);
  renderGuests();
}

function renderGuests() {
  const guests = getGuests();
  listBody.innerHTML = "";
  guests.forEach((guest, index) => {
    const row = document.createElement("tr");
    if (guest.checkedIn) row.classList.add("checked-in");

    row.innerHTML = `
      <td>${guest.name}</td>
      <td>${guest.date}</td>
      <td>${guest.room}</td>
      <td>${guest.note}</td>
      <td>${guest.checkedIn ? "? チェックイン済" : "未"}</td>
      <td>${guest.checkedIn ? "" : `<button onclick="checkInGuest(${index})">チェックイン</button>`}</td>
    `;
    listBody.appendChild(row);
  });
}

form.addEventListener("submit", e => {
  e.preventDefault();
  const guest = {
    name: form.name.value,
    date: form.date.value,
    room: form.room.value,
    note: form.note.value,
    checkedIn: false
  };
  addGuest(guest);
  form.reset();
});

renderGuests();
