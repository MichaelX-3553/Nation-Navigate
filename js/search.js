/***
-------------------------------------------------------------------------- 
-------------------------------------------------------------------------- 
-------------------------------------------------------------------------- 
fetch on search functionality
--------------------------------------------------------------------------
--------------------------------------------------------------------------
--------------------------------------------------------------------------
***/

const searchBar = document.querySelector('#search-bar');
const searchBtn = document.querySelector('.fa-solid.fa-magnifying-glass');

searchBtn.addEventListener('click', () => {
	if (searchBar.value == '' && countryList.childElementCount < 250) {
		fetchData('https://restcountries.com/v3.1/all');
	} else if (searchBar.value == '') {
		return;
	} else {
		countryList.innerHTML = `<strong>Loading...</strong>`;
		fetchFiltered(`https://restcountries.com/v3.1/name/${searchBar.value}
		`);
	}
});

document.addEventListener('keyup', (event) => {
	if (event.key == 'Enter') {
		if (searchBar.value == '' && countryList.childElementCount < 250) {
			fetchData('https://restcountries.com/v3.1/all');
		} else if (searchBar.value == '') {
			return;
		} else {
			countryList.innerHTML = `<strong>Loading...</strong>`;
			fetchFiltered(`https://restcountries.com/v3.1/name/${searchBar.value}
		`);
		}
	}
});
