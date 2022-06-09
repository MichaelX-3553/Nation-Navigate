/***
-------------------------------------------------------------------------- 
-------------------------------------------------------------------------- 
-------------------------------------------------------------------------- 
theme change functionality
--------------------------------------------------------------------------
--------------------------------------------------------------------------
--------------------------------------------------------------------------
***/

const themeSwitcherBtn = document.querySelector('.app-theme');
let darkMode = true;

const changeTheme = () => {
	if (darkMode) {
		document.documentElement.style.setProperty('--pale-gray', '#202c37');
		document.documentElement.style.setProperty('--white', '#2b3945');
		document.documentElement.style.setProperty('--gray', '#111517');
		document.documentElement.style.setProperty('--deep-blue', '#fafafa');

		//change the moon icon to solid and back
		themeSwitcherBtn.querySelector('i').classList.remove('fa-regular');
		themeSwitcherBtn.querySelector('i').classList.add('fa-solid');
	} else {
		document.documentElement.style.setProperty('--pale-gray', '#fafafa');
		document.documentElement.style.setProperty('--white', '#ffffff');
		document.documentElement.style.setProperty('--gray', '#858585');
		document.documentElement.style.setProperty('--deep-blue', '#111517');
		//change the moon icon from solid and back
		themeSwitcherBtn.querySelector('i').classList.remove('fa-solid');
		themeSwitcherBtn.querySelector('i').classList.add('fa-regular');
	}
};

themeSwitcherBtn.onclick = () => {
	darkMode = !darkMode;
	changeTheme();
};
