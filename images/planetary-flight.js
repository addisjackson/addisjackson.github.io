// planetary-flight.js
// Enhanced booking logic: dynamic passengers, bags, airline-dependent options, dynamic price, radio airline selection, route/layover logic

document.addEventListener('DOMContentLoaded', function() {
  // Get planet name from query string and set as destination
  const urlParams = new URLSearchParams(window.location.search);
  const planetName = urlParams.get('planet');
  if (planetName) {
    const destSpan = document.getElementById('destination');
    if (destSpan) destSpan.textContent = planetName;
  }

  // Airline, route, layover, and price data
  // Flight pricing constants
  const DIRECT_FLIGHT_COSTS = {
    'StarJet': 500,
    'HyperSpaceX': 700,
    'Corellian Express': 600,
    'Rebel Wings': 800
  };
  const ROUTE_COSTS = {
    'StarJet': { 'Direct': 500, 'Via Coruscant': 650 },
    'HyperSpaceX': { 'Direct': 700, 'Via Hoth': 850, 'Via Tatooine': 900 },
    'Corellian Express': { 'Direct': 600, 'Via Coruscant': 750, 'Via Tatooine': 800 },
    'Rebel Wings': { 'Direct': 800, 'Via Hoth': 950 }
  };
  const LAYOVER_DISCOUNT = 0.9; // 10% discount if layover is checked
  const BAG_PRICE = 50;
  const GUEST_PRICE = 200; // price per additional guest/seat
  const LAYOVER_PRICE = 100;
  const airlineOptions = {
    'StarJet': {
      routes: ['Direct', 'Via Coruscant'],
      layovers: {
        'Via Coruscant': ['Mos Eisley Cantina', 'Cloud City']
      },
      logo: 'assets/r2d2.gif'
    },
    'HyperSpaceX': {
      routes: ['Direct', 'Via Hoth', 'Via Tatooine'],
      layovers: {
        'Via Hoth': ['Death Star Rest Stop', 'Cloud City'],
        'Via Tatooine': ['Cloud City']
      },
      logo: 'assets/enter-the-force.gif'
    },
    'Corellian Express': {
      routes: ['Direct', 'Via Coruscant', 'Via Tatooine'],
      layovers: {
        'Via Coruscant': ['Mos Eisley Cantina', 'Death Star Rest Stop'],
        'Via Tatooine': ['Death Star Rest Stop']
      },
      logo: 'assets/party.png'
    },
    'Rebel Wings': {
      routes: ['Direct', 'Via Hoth'],
      layovers: {
        'Via Hoth': ['Cloud City', 'Mos Eisley Cantina']
      },
      logo: 'assets/r2d2.gif'
    }
  };
  const classPrices = {
    'Economy': 1,
    'Business': 2.2,
    'First': 5
  };

  const form = document.getElementById('flightBookingForm');
  const airlineRadios = document.querySelectorAll('input[name="airline"]');
  const bagsInput = document.getElementById('bags');
  const dynamicFlightOptions = document.getElementById('dynamic-flight-options');
  const dynamicLayovers = document.getElementById('dynamic-layovers');
  const dynamicPrice = document.getElementById('dynamic-price');
  // Guest modal elements
  const addGuestBtn = document.getElementById('addGuestBtn');
  const guestModal = document.getElementById('guest-modal');
  const closeGuestModal = document.getElementById('closeGuestModal');
  const saveGuestBtn = document.getElementById('saveGuestBtn');
  const guestNameInput = document.getElementById('guestName');
  const guestEmailInput = document.getElementById('guestEmail');
  const guestBagsInput = document.getElementById('guestBags');
  const guestsSection = document.getElementById('guests-section');
  const guestsTable = document.getElementById('guests-table').querySelector('tbody');
  const flightListSection = document.getElementById('flight-list-section');
  const flightListTable = document.getElementById('flight-list-table').querySelector('tbody');
  const manifestSection = document.getElementById('flight-manifest-section');
  const manifestTable = document.getElementById('manifest-table').querySelector('tbody');

  function getSelectedAirline() {
    return document.querySelector('input[name="airline"]:checked').value;
  }

  // Helper to update flight options and layovers
  function updateFlightOptions() {
    const airline = getSelectedAirline();
    const opts = airlineOptions[airline];
    dynamicFlightOptions.innerHTML = '';
    // Route dropdown
    dynamicFlightOptions.innerHTML = `<label for="route">Flight Route:</label><select id="route" name="route" required>${opts.routes.map(r => `<option value="${r}">${r}</option>`).join('')}</select><br><br>`;
    updateLayovers();
  }

  // Helper to update layovers
  function updateLayovers() {
    const airline = getSelectedAirline();
    const opts = airlineOptions[airline];
    const route = document.getElementById('route').value;
    dynamicLayovers.innerHTML = '';
    if (route !== 'Direct' && opts.layovers[route]) {
      dynamicLayovers.innerHTML = `<label>Layover Options:</label><br>` + opts.layovers[route].map((l,i) => `<input type="checkbox" id="layover${i}" name="layover" value="${l}"><label for="layover${i}">${l}</label><br>`).join('') + '<br>';
      dynamicLayovers.style.display = '';
    } else {
      dynamicLayovers.style.display = 'none';
    }
  }

  // Helper to update price
  function updatePrice() {
    const airline = getSelectedAirline();
    const route = document.getElementById('route')?.value || 'Direct';
    const base = ROUTE_COSTS[airline][route] || DIRECT_FLIGHT_COSTS[airline];
    const layoverCount = document.querySelectorAll('input[name="layover"]:checked').length;
    const layoverChecked = layoverCount > 0;
    const bags = parseInt(bagsInput.value) || 0;
    const classVal = document.querySelector('input[name="price"]:checked')?.value || 'Economy - 500 Credits';
    const classKey = classVal.split(' ')[0];
    const classMult = classPrices[classKey] || 1;
    const guestCount = manifest.length > 1 ? manifest.length - 1 : 0;
    let total = base * classMult;
    if (layoverChecked) {
      total = total * LAYOVER_DISCOUNT;
    }
    total += (bags * BAG_PRICE) + (guestCount * GUEST_PRICE) + (layoverCount * LAYOVER_PRICE);
    dynamicPrice.innerHTML = `<strong style="color:#a67c52;">Total Price: ${Math.round(total)} Credits</strong>`;
  }

  // Helper to update additional passenger fields

  // Manifest state: first is main, rest are guests
  let manifest = [];

  // Render guests table
  function renderGuestsTable() {
    guestsTable.innerHTML = '';
    let hasGuests = false;
    for (let i = 1; i < manifest.length; i++) {
      hasGuests = true;
      const g = manifest[i];
      const tr = document.createElement('tr');
      tr.innerHTML = `<td>${g.name}</td><td>${g.email}</td><td>${g.bags}</td><td>
        <button class='edit-guest-btn' data-idx='${i}'>Edit</button>
        <button class='remove-guest-btn' data-idx='${i}'>Delete</button>
      </td>`;
      guestsTable.appendChild(tr);
    }
    guestsSection.style.display = hasGuests ? '' : 'none';
  }

  // Render manifest table (main + guests)
  function renderManifestTable(passengerList) {
    manifestTable.innerHTML = '';
    const list = passengerList || manifest;
    if (list.length > 0) {
      // Main passenger (booker)
      const main = list[0];
      const trMain = document.createElement('tr');
      trMain.innerHTML = `<td><b>${main.name}</b></td><td><b>${main.email}</b></td><td><b>${main.bags}</b></td>`;
      manifestTable.appendChild(trMain);
      // Guests indented
      for (let i = 1; i < list.length; i++) {
        const g = list[i];
        const tr = document.createElement('tr');
        tr.innerHTML = `<td style='padding-left:32px;'>${g.name}</td><td>${g.email}</td><td>${g.bags}</td>`;
        manifestTable.appendChild(tr);
      }
    }
  }

  // Helper to render all flights from localStorage on page load
  function renderAllFlightsFromStorage() {
    const bookedFlights = JSON.parse(localStorage.getItem('bookedFlights') || '[]');
    if (bookedFlights.length === 0) {
      flightListSection.style.display = 'none';
      manifestSection.style.display = 'none';
      return;
    }
    flightListSection.style.display = '';
    flightListTable.innerHTML = '';
    bookedFlights.forEach((flight, idx) => {
      const flightNum = 'AGF' + (1000 + idx);
      const airlineLogo = airlineOptions[flight.airline]?.logo || '';
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td><span class='airline-link' style='color:#f0a500;cursor:pointer;text-decoration:underline;'>${flight.airline}</span></td>
        <td><img src='${airlineLogo}' alt='${flight.airline} logo' style='height:32px;'></td>
        <td>${flightNum}</td>
        <td>${flight.route}</td>
        <td>${flight.layover}</td>
        <td>${flight.planet}</td>
        <td>${flight.departure}</td>
        <td><button class='edit-flight-btn'>Edit</button> <button class='delete-flight-btn'>Delete</button></td>
      `;
      // Airline click shows manifest for this flight
      tr.querySelector('.airline-link').addEventListener('click', function(e) {
        e.stopPropagation();
        manifestSection.style.display = '';
        renderManifestTable(flight.passengers);
      });
      // Edit/delete buttons (stub)
      tr.querySelector('.edit-flight-btn').addEventListener('click', function(e) {
        alert('Edit flight not implemented in demo.');
      });
      tr.querySelector('.delete-flight-btn').addEventListener('click', function(e) {
        // Remove from localStorage and re-render
        bookedFlights.splice(idx, 1);
        localStorage.setItem('bookedFlights', JSON.stringify(bookedFlights));
        renderAllFlightsFromStorage();
        manifestSection.style.display = 'none';
      });
      flightListTable.appendChild(tr);
    });
  }

  function syncMainPassengerToManifest() {
    const name = document.getElementById('passengerName').value.trim();
    const email = document.getElementById('email').value.trim();
    const bags = document.getElementById('bags').value.trim();
    if (manifest.length === 0) {
      manifest.push({ name, email, bags });
    } else {
      manifest[0] = { name, email, bags };
    }
    renderGuestsTable();
  }
  document.getElementById('passengerName').addEventListener('input', syncMainPassengerToManifest);
  document.getElementById('email').addEventListener('input', syncMainPassengerToManifest);
  document.getElementById('bags').addEventListener('input', syncMainPassengerToManifest);
  syncMainPassengerToManifest();

  // Initial setup
  updateFlightOptions();
  updatePrice();

  // On page load, render all flights from storage
  renderAllFlightsFromStorage();

  form.addEventListener('submit', function(e) {
    e.preventDefault();
    syncMainPassengerToManifest();
    const airline = getSelectedAirline();
    const route = document.getElementById('route').value;
    const layovers = Array.from(document.querySelectorAll('input[name="layover"]:checked')).map(cb => cb.value).join(', ') || 'None';
    const price = dynamicPrice.textContent.replace('Total Price: ','').trim();
    const departure = document.getElementById('departure').value;
    // Save to localStorage
    const bookedFlights = JSON.parse(localStorage.getItem('bookedFlights') || '[]');
    const newFlight = {
      passengers: manifest.slice(), airline, route, layover: layovers, price, departure, planet: planetName
    };
    bookedFlights.push(newFlight);
    localStorage.setItem('bookedFlights', JSON.stringify(bookedFlights));

    // Show flight list section
    renderAllFlightsFromStorage();
    manifestSection.style.display = 'none';
  });
});
