document.getElementById("flightForm").addEventListener("submit", function (event) {
    event.preventDefault();
  
    // Fetch form values
    const origin = document.getElementById("origin").value;
    const destination = document.getElementById("destination").value;
    const passengerType = document.getElementById("passengerType").value;
    const flightType = document.getElementById("flightType").value;
    const seatClass = document.getElementById("seatClass").value;
    const passengerCount = parseInt(document.getElementById("passengerCount").value);
  
    // Calculate total cost based on selections
    const basePrice = calculateBasePrice(destination);
    const passengerMultiplier = calculatePassengerMultiplier(passengerType);
    const flightTypeMultiplier = calculateFlightTypeMultiplier(flightType);
    const seatClassMultiplier = calculateSeatClassMultiplier(seatClass);
    const totalCost = basePrice * passengerMultiplier * flightTypeMultiplier * seatClassMultiplier * passengerCount;
  
    // Create flight result row
    const flightRow = document.createElement("tr");
    flightRow.innerHTML = `
      <td>${origin}</td>
      <td>${destination}</td>
      <td>${flightType}</td>
      <td>${seatClass}</td>
      <td>${passengerCount}</td>
      <td>${totalCost.toFixed(2)}</td>
      <td><button class="deleteButton">Delete</button></td>
    `;
  
    // Append flight result row to table
    const flightTableBody = document.querySelector("#flightTable tbody");
    flightTableBody.appendChild(flightRow);
  
    // Add event listener for delete button
    const deleteButton = flightRow.querySelector(".deleteButton");
    deleteButton.addEventListener("click", deleteFlightRow);
  });
  
  function calculateBasePrice(destination) {
    const flights = {
      Kamino: 546,
      Hoth: 345,
      Alderaan: 630,
      Jabba: 176,
      Caruscant: 895,
      Debogah: 542,
      Endor: 912,
      Bespin: 365,
      Naboo: 987,
      Tatooine: 1232,
      Haden: 809,
      Yavin: 342
    };
  
    if (destination in flights) {
      return flights[destination];
    } else {
      return "we do not travel to this destination";
    }
  }
  
  function calculatePassengerMultiplier(passengerType) {
    if (passengerType === "Adult") {
      return 1;
    } else if (passengerType === "Child") {
      return 0.5;
    } else if (passengerType === "Senior") {
      return 0.75;
    } else {
      return "flyer must be adult, senior, or child";
    }
  }
  
  function calculateFlightTypeMultiplier(flightType) {
    if (flightType === "oneWay") {
      return 1;
    } else if (flightType === "roundTrip") {
      return 1.75;
    } else {
      return "flyer must be going one way or round trip";
    }
  }
  
  function calculateSeatClassMultiplier(seatClass) {
    if (seatClass === "FirstClass") {
      return 1.85;
    } else if (seatClass === "BusinessClass") {
      return 1.25;
    } else if (seatClass === "EconomyClass") {
      return 1;
    } else {
      return "invalid seat class";
    }
  }
  
  function deleteFlightRow(event) {
    const row = event.target.closest("tr");
    if (row) {
      row.remove();
    }
  }
  
  const deleteButtons = document.querySelectorAll(".deleteButton");
  deleteButtons.forEach(button => {
    button.addEventListener("click", deleteFlightRow);
  });

  document.getElementById("printTicket").addEventListener("click", printTicket);

function printTicket() {
  const origin = document.getElementById("origin").value;
  const destination = document.getElementById("destination").value;
  const passengerType = document.getElementById("passengerType").value;
  const flightType = document.getElementById("flightType").value;
  const seatClass = document.getElementById("seatClass").value;
  const passengerCount = parseInt(document.getElementById("passengerCount").value);

  const basePrice = calculateBasePrice(destination);
  const passengerMultiplier = calculatePassengerMultiplier(passengerType);
  const flightTypeMultiplier = calculateFlightTypeMultiplier(flightType);
  const seatClassMultiplier = calculateSeatClassMultiplier(seatClass);
  const totalCost = basePrice * passengerMultiplier * flightTypeMultiplier * seatClassMultiplier * passengerCount;

  const ticketContent = `
    <h3>Flight Ticket</h3>
    <p><strong>Origin:</strong> ${origin}</p>
    <p><strong>Destination:</strong> ${destination}</p>
    <p><strong>Passenger Type:</strong> ${passengerType}</p>
    <p><strong>Flight Type:</strong> ${flightType}</p>
    <p><strong>Seat Class:</strong> ${seatClass}</p>
    <p><strong>Passenger Count:</strong> ${passengerCount}</p>
    <p><strong>Total Cost:</strong> ${totalCost.toFixed(2)}</p>
  `;

  const ticketContainer = document.getElementById("ticketContainer");
  ticketContainer.innerHTML = ticketContent;
  ticketContainer.style.display = "block";
}
