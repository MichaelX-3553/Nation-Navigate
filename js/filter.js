/***
-------------------------------------------------------------------------- 
-------------------------------------------------------------------------- 
-------------------------------------------------------------------------- 
filter functionality logic
--------------------------------------------------------------------------
--------------------------------------------------------------------------
--------------------------------------------------------------------------
***/

// filterRegion is set as onchange in the markup

const filterRegion = (region) => {
	if (region.toLowerCase() == 'filter by region') {
		fetchData('https://restcountries.com/v3.1/all');
	} else {
		fetch(`https://restcountries.com/v3.1/region/${region}`)
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
				console.log(err);
			});
	}
};
