window.onload = () => {
	fetchData('https://restcountries.com/v3.1/all');
	searchBar.value = '';
};
/////////////////////////////////////////////////////////////

const filterBar = document.querySelector('#filter-bar');
filterBar.value = 'Filter by Region';
const countryList = document.querySelector('#countries');

/***
-------------------------------------------------------------------------- 
----------------- --------------------------------------------------------- 
--------------------------------------------------------------------------
inital display logic
--------------------------------------------------------------------------
--------------------------------------------------------------------------
--------------------------------------------------------------------------
***/

const fetchData = (url) => {
	fetch(url)
		.then((res) => {
			if (!res.ok) {
				throw Error(`Could not fetch data from that resource
                Check your internet connection...`);
			} else {
				return res.json();
			}
		})
		.then((dataArr) => {
			if (typeof dataArr === 'object') {
				countryList.innerHTML = '';
				filterBar.value = 'Filter by Region';

				dataArr.forEach((data) => {
					const flag = data.flags.svg;
					const name = data.name.common.toLowerCase();
					const population = data.population;
					const region = data.region;
					const capital = String(data.capital).toLowerCase();

					let countryDiv = document.createElement('div');
					countryDiv.classList.add('country');

					let countryData = `
            <div class="flag">
                <img src="${flag}" alt="${name} Flag" />
            </div>
            <div class="details">
                <h2>${name}</h2>
                <p><span>Population</span>: ${population}</p>
                <p><span>Region</span>: ${region}</p>
                <p><span>Capital</span>: ${capital}</p>
            </div>`;
					countryDiv.innerHTML = countryData;
					countryList.append(countryDiv);
					countryDiv.addEventListener('click', () => {
						routeCountries(name);
					});
				});
			}
		})
		.catch((err) => {
			console.log(err);
		});
};

let usedDemonym = false;
let usedCapital = false;
/***
-------------------------------------------------------------------------- 
-------------------------------------------------------------------------- 
--------------------------------------------------------------------------
search by name, demonym and capital functionality logic
--------------------------------------------------------------------------
--------------------------------------------------------------------------
--------------------------------------------------------------------------
***/
const fetchFiltered = (url) => {
	fetch(url)
		.then((res) => {
			if (!res.ok) {
				throw Error(`Could not fetch data from that resource
            Check your internet connection...`);
			} else {
				return res.json();
			}
		})
		.then((dataArr) => {
			if (typeof dataArr === 'object') {
				countryList.innerHTML = '';
				dataArr.forEach((data) => {
					const flag = data.flags.svg;
					const name = data.name.common.toLowerCase();
					const population = data.population;
					const region = data.region;
					const capital = String(data.capital).toLowerCase();

					let countryDiv = document.createElement('div');
					countryDiv.classList.add('country');
					let countryData = `
		<div class="flag">
			<img src="${flag}" alt="${name} Flag" />
		</div>
		<div class="details">
			<h2>${name}</h2>
			<p><span>Population</span>: ${population}</p>
			<p><span>Region</span>: ${region}</p>
			<p><span>Capital</span>: ${capital}</p>
		</div>`;
					countryDiv.innerHTML = countryData;
					countryList.append(countryDiv);
					countryDiv.addEventListener('click', () => {
						routeCountries(name);
					});
				});
			}
		})
		.catch((err) => {
			if (String(err).includes("can't access property")) {
				alert(`                Sorry 😢, Couldn't find that country!...
                Try checking your spelling
                or check your internet connection 🙂`);
			} else if (String(err).includes('Could not fetch data from that resource')) {
				if (!usedCapital) {
					fetchFiltered(`https://restcountries.com/v3.1/capital/${searchBar.value}`);
					usedCapital = true;
				} else if (!usedDemonym) {
					fetchFiltered(`https://restcountries.com/v3.1/demonym/${searchBar.value}`);
					usedDemonym = true;
				} else if (usedCapital && usedDemonym) {
					fetchData('https://restcountries.com/v3.1/all');
					alert("Couldn't find that place!");
					usedCapital = false;
					usedDemonym = false;
				}
			} else {
				console.log(err);
			}
		});
};
