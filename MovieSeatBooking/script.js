const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)'); //nodelist
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');
const button = document.querySelector('.delete');

let ticketPrice = parseInt(movieSelect.value);

populateUI();

//armazenando o filme selecionado pelo index e o preço do mesmo
function setMovieData(movieIndex, moviePrice) {
  localStorage.setItem('selectedMovieIndex', movieIndex);
  localStorage.setItem('selectedMoviePrice', moviePrice);
}

//update total and count
function updateSelectedCount() {
  const selectedSeats = document.querySelectorAll('.row .seat.selected');
  const selectedCount = selectedSeats.length;

  //armazenando o index de cada assento
  const seatsIndex = [...selectedSeats].map((seat) => {
    return [...seats].indexOf(seat);
  });

  //armazenando os assentos no localstorage
  //quando precisar armazenar um array, precisar usar o método JSON.stringfy
  localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));

  count.innerText = selectedCount;
  total.innerText = selectedSeats.length * ticketPrice;
}

//Get data form localstorage and populate UI
function populateUI() {
  //quando um array que foi convertido para string for pego do localstorage precisa usar o JSON.parse
  //basicamente o inverso do JSON.stringfy
  const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
  const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');
  const selectedMoviePrice = localStorage.getItem('selectedMoviePrice');

  //checando se existe esse dado no localstorage e se não está vazio
  if (selectedSeats !== null && selectedSeats.length > 0) {
    seats.forEach((seat, index) => {
      //checando se existe esse elento
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add('selected');
      }
    });
  }

  if (selectedMovieIndex !== null) {
    movieSelect.selectedIndex = selectedMovieIndex;
  }

  if (selectedMoviePrice !== null) {
    ticketPrice = parseInt(selectedMoviePrice);
  }
}

//movie select event
movieSelect.addEventListener('change', (e) => {
  ticketPrice = parseInt(e.target.value);
  setMovieData(e.target.selectedIndex, e.target.value);
  updateSelectedCount();
});

//Seat click event
container.addEventListener('click', (e) => {
  if (
    e.target.classList.contains('seat') &&
    !e.target.classList.contains('occupied')
  ) {
    e.target.classList.toggle('selected');
    updateSelectedCount();
  }
});

// //button event
// button.addEventListener('click', (e) => {
//   localStorage.clear();
//   populateUI();
// });

//Initial count and price
updateSelectedCount();
