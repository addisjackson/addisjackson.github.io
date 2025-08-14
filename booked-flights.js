// booked-flights.js
// Render booked flights from localStorage, show each passenger in a card

document.addEventListener("DOMContentLoaded", function () {
  const listSection = document.getElementById("booked-flights-list");
  // Use the same key as planetary-flight.js for consistency
  let flights = JSON.parse(localStorage.getItem("bookedFlights") || "[]");

  function renderFlights() {
    listSection.innerHTML = "";
    if (flights.length === 0) {
      listSection.innerHTML =
        '<p style="color:white;text-align:center;">No flights booked yet.</p>';
      return;
    }

    flights.forEach((flight, idx) => {
      // For each passenger in the flight, show a card
      if (flight.passengers && flight.passengers.length > 0) {
        flight.passengers.forEach((p, pIdx) => {
          const passengerCard = document.createElement("div");
          passengerCard.className = "flight-card";
          const flightNum = 'AGF' + (1000 + idx);
          passengerCard.innerHTML = `
            <h2>${flight.planet || flight.destination}</h2>
            <table class="flight-details-table">
              <tr><td><strong>Passenger</strong></td><td>${p.name}</td></tr>
              <tr><td><strong>Email</strong></td><td>${p.email}</td></tr>
              <tr><td><strong>Bags</strong></td><td>${p.bags}</td></tr>
              <tr><td><strong>Flight ID</strong></td><td>${flightNum}</td></tr>
              <tr><td><strong>From</strong></td><td>Earth</td></tr>
              <tr><td><strong>To</strong></td><td>${flight.planet || flight.destination}</td></tr>
              <tr><td><strong>Airline</strong></td>
                  <td>
                    <span class="airline-toggle" data-idx="${idx}" style="cursor:pointer;color:#a67c52;text-decoration:underline;">
                      ${flight.airline}
                    </span>
                  </td>
              </tr>
              <tr><td><strong>Route</strong></td><td>${flight.route}</td></tr>
              <tr><td><strong>Layovers</strong></td><td>${flight.layover || flight.layovers}</td></tr>
              <tr><td><strong>Departure</strong></td><td>${flight.departure}</td></tr>
              <tr><td><strong>Total Price</strong></td><td>${flight.price} Credits</td></tr>
            </table>
            <button class="delete-btn" data-idx="${idx}" data-pidx="${pIdx}">Delete Booking</button>
          `;
          listSection.appendChild(passengerCard);
        });
      }
    });

    // Manifest toggle for airline click (shows all passengers for that flight)
    document.querySelectorAll(".airline-toggle").forEach((el) => {
      el.addEventListener("click", function () {
        const idx = this.getAttribute("data-idx");
        const flight = flights[idx];
        if (!flight || !flight.passengers) return;
        // Show manifest in alert (or could be modal)
        let manifest = `<b>Flight Manifest</b>\n`;
        flight.passengers.forEach((p, i) => {
          manifest += `\n${i === 0 ? 'Booker: ' : 'Guest: '} ${p.name} | ${p.email} | Bags: ${p.bags}`;
        });
        alert(manifest);
      });
    });
  }

  // Delete button handler (removes the whole flight for now)
  listSection.addEventListener("click", function (e) {
    if (e.target.classList.contains("delete-btn")) {
      const idx = e.target.getAttribute("data-idx");
      flights.splice(idx, 1);
      localStorage.setItem("bookedFlights", JSON.stringify(flights));
      renderFlights();
    }
  });

  renderFlights();
});
