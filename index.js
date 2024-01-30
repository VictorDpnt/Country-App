const countryContainer = document.getElementById("countries-container");
let countryData = [];

async function fetchCountry() {
  await fetch("https://restcountries.com/v3.1/all")
    .then((res) => res.json())
    .then((data) => (countryData = data));

  console.log(countryData);
}

displayCountry();

async function displayCountry() {
  await fetchCountry();

  countryContainer.innerHTML = countryData
    .filter((country) =>
      country.translations.fra.common
        .toLowerCase()
        .includes(inputSearch.value.toLowerCase())
    )
    .slice(0, inputRange.value)
    .map(
      (country) =>
        `
        <div class ="card">
          <img src=${country.flags.svg}>
          <h2> ${country.translations.fra.common}</h2>
          <h3> ${country.capital}</h3>
          <p>Population : ${country.population.toLocaleString()}</p>
        </div>
      `
    )
    .join(" ");
}

inputRange.addEventListener("input", (e) => {
  displayCountry();
  rangeValue.textContent = inputRange.value;
});

inputSearch.addEventListener("input", () => displayCountry());
