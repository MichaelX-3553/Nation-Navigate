//--------- creating variables for the pages of a single country and the list of countries
const maincountry = document.querySelector('#single-country');
const allCountries = document.querySelector('#all-countries');
//----------------------------------------------------------------------

/***
-------------------------------------------------------------------------- 
----------------- --------------------------------------------------------- 
--------------------------------------------------------------------------
get required data for routing
--------------------------------------------------------------------------
--------------------------------------------------------------------------
--------------------------------------------------------------------------
***/

const routeCountries = (name) => {
	fetch(`https://restcountries.com/v3.1/name/${name}`)
		.then((res) => {
			if (!res.ok) {
				throw Error(`Could not fetch data from that resource
            Check your internet connection...`);
			} else {
				return res.json();
			}
		})
		.then((dataArr) => {
			dataArr.forEach((data) => {
				let initNative = data.name.nativeName;
				const nativeName = initNative[Object.keys(initNative)[0]].common;
				const name = data.name.common.toLowerCase();
				const flag = data.flags.svg;
				const population = data.population;
				const region = data.region;
				const subRegion = data.subregion;
				const capital = String(data.capital).toLowerCase();
				const tld = String(data.tld).toLowerCase();
				// currencies
				let currency;
				if (data.hasOwnProperty('currencies')) {
					const initCurrency = data.currencies;
					currency = initCurrency[Object.keys(initCurrency)[0]].name;
				}
				// languages
				let langsArr = [];
				let languages = '';
				const initLangs = Object.keys(data.languages);
				initLangs.forEach((lang, i) => {
					let langName = data.languages[Object.keys(data.languages)[i]];
					langsArr.push(langName);
					languages = '';
					langsArr.forEach((lang) => {
						languages += ` ${lang},`;
					});
					languages = languages.replace(/.$/, '');
				});
				let bordersArr;
				if (data.hasOwnProperty('borders')) {
					bordersArr = [...data.borders];
				}
				routeCountry({
					nativeName: nativeName,
					name: name,
					flag: flag,
					population: population,
					region: region,
					subRegion: subRegion,
					capital: capital,
					tld: tld,
					currencies: currency,
					languages: languages,
				});
				if (bordersArr != undefined) {
					// include the border countries on the country page
					getBorders(bordersArr);
				}
			});
		})
		.catch((err) => {
			console.log(err);
		});
};

/***
-------------------------------------------------------------------------- 
----------------- --------------------------------------------------------- 
--------------------------------------------------------------------------
change the page to the selected country's page
--------------------------------------------------------------------------
--------------------------------------------------------------------------
--------------------------------------------------------------------------
***/
const routeCountry = ({
	nativeName,
	name,
	flag,
	population,
	region,
	subRegion,
	capital,
	tld,
	currencies,
	languages,
}) => {
	let mainBodyData = `<button id="back-btn" class="back-btn"><i class="fa-solid fa-arrow-left"></i> Back</button>
                <div class="country-page">
                    <img src="${flag}" alt="Flag" />
                    <div class="about">
                        <div class="infos">
                            <article class="main-info">
                                <h1><span class="bold-info">${name}</span></h1>
                                <p><span class="bold-info">Native Name:</span> ${nativeName}</p>
                                <p><span class="bold-info">Population:</span> ${population}</p>
                                <p><span class="bold-info">Region:</span> ${region}</p>
                                <p><span class="bold-info">Sub Region:</span> ${subRegion}</p>
                                <p><span class="bold-info">Capital:</span> ${capital}</p>
                            </article>

                            <article class="other-info">
                                <p class='not-capitalize'><span class="bold-info">Top Level Domain: </span>${tld}</p>
                                <p><span class="bold-info">Currencies: </span>${currencies}</p>
                                <p><span class="bold-info">Languages: </span>${languages}</p>
                            </article>
                        </div>

                        <article class="border-countries">
                            <p class="bold-info">Border Countries:</p>
                            <div class="btns" id='border-btns'>
                                <button class='country-btn'>France</button>
                                <button class='country-btn'>Germany</button>
                                <button class='country-btn'>Netherlands</button>
                            </div>
                        </article>
                    </div>
                </div>
                `;
	maincountry.innerHTML = '';
	maincountry.innerHTML = mainBodyData;
	allCountries.style.display = 'none';
	maincountry.style.display = 'block';

	document.querySelectorAll('.country-btn').forEach((btn) => {
		btn.addEventListener('click', (e) => {
			fetchFiltered(`https://restcountries.com/v3.1/name/${btn.textContent}
			`);
			maincountry.style.display = 'none';
			allCountries.style.display = 'block';
		});
	});

	document.querySelector('#back-btn').addEventListener('click', () => {
		fetchData('https://restcountries.com/v3.1/all');
		maincountry.style.display = 'none';
		allCountries.style.display = 'block';
	});
};

/***
-------------------------------------------------------------------------- 
----------------- --------------------------------------------------------- 
--------------------------------------------------------------------------
add the country's border countries it's page
--------------------------------------------------------------------------
--------------------------------------------------------------------------
--------------------------------------------------------------------------
***/

const getBorders = (bordersArr) => {
	const borderBtnsContainer = document.querySelector('#border-btns');
	borderBtnsContainer.innerHTML = '';
	bordersArr.forEach((borderName) => {
		fetch(`https://restcountries.com/v3.1/alpha/${borderName}`)
			.then((res) => res.json())
			.then((data) => {
				const borderBtn = document.createElement('button');
				borderBtn.classList.add('country-btn');
				borderBtn.innerText = data[0].name.common;
				borderBtnsContainer.append(borderBtn);
				borderBtn.addEventListener('click', (e) => {
					fetchFiltered(`https://restcountries.com/v3.1/name/${borderBtn.textContent}
					`);
					maincountry.style.display = 'none';
					allCountries.style.display = 'block';
				});
			});
	});
};
