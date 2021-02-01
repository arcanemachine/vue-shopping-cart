import { ClientFunction } from 'testcafe';

export const getWindowLocation = ClientFunction(() => window.location.href.toString())

export const getCookie = ClientFunction((key) => {
	try {
		document.cookie.split('; ').map(x => x.split('=')).filter(x => x[0] === key)[0][1];
		return document.cookie;
	}
	catch(err) {
		return false;
	}
})

export const getCookies = ClientFunction(() => {
	return document.cookie;
})

export const setCookie = ClientFunction((key, value) => {
	document.cookie = `${key}=${value}`;
})

export const setCookieIntroSeen = ClientFunction((key, value) => {
	document.cookie = `introSeen=1`;
})


