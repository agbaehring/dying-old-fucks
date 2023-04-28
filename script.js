const form = document.querySelector('form'); // Vi henter formularen fra HTML-siden
const fileInput = document.getElementById('file'); // Vi henter input-elementet med id 'file' fra HTML-siden
let file;// Vi opretter en variabel til at gemme den fil, der skal uploades

// Funktion, der håndterer valg af lydfil. 
// Når brugeren vælger en fil, opdateres værdien af "file"-variablen
const handleAudioFile = (e) => {
  file = e.target.files;
  for (let i = 0; i <= file.length - 1; i++) {
    file = file[i];
  }
};


// Vi tilføjer en eventlistener til filinput-elementet, som kalder "handleAudioFile"-funktionen, når der vælges en fil
fileInput.addEventListener('change', handleAudioFile);

// Når brugeren klikker på "submit"-knappen, udfører vi følgende funktion:
form.addEventListener('submit', (e) => {
  // Vi forhindrer formularen i at blive sendt via den normale måde (som ville genindlæse siden)
  e.preventDefault();

  // Vi opretter en FormData-objekt, der indeholder formulardataen og den valgte fil
  const formData = new FormData();
  formData.append('username', 'Sandra Rodgers'); // Tilføjer brugernavnet som en streng-værdi
  formData.append('files', file); // Tilføjer filen til FormData-objektet

  // Vi sender en fetch-anmodning til serveren med vores data
  fetch('http://localhost:5001/upload_files', {
    method: 'POST',
    credentials: 'include',
    body: formData, // Vi inkluderer vores FormData-objekt som anmodningens krop
  })
    .then((res) => console.log(res)) // Håndtering af succesfuld respons
    .catch((err) => ('Error occurred', err)); // Håndtering af fejl

const inputText = document.getElementById("input-text").value;
    console.log(inputText); 
    fetch('http://localhost:5001/die', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({almostDeadPerson: inputText}),
    })
    .then((res) => console.log(res))
    .catch((err) => ('Error occurred', err));
});