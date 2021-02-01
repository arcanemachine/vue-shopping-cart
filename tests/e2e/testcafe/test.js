import { Selector, RequestLogger, ClientFunction } from 'testcafe';
import * as helpers from '../../../src/assets/js/helpers.js'

// fixture `Getting Started`
//   .page `http://devexpress.github.io/testcafe/example`;
// 
// test('My first test', async t => {
// 	const myName = 'John Smith';
// 
//   await t
// 		.typeText('#developer-name', myName)
// 		.click('#submit-button')
// 		.expect(Selector('#article-header').innerText).eql(`Thank you, ${myName}!`);
// 
// });

const domainUrl = `${helpers.FRONTEND_SERVER_URL}`


const setCookie = ClientFunction((key, value) => {
	document.cookie = `${key}=${value}`;
})

const getCookie = ClientFunction((key) => {
	try {
		document.cookie.split('; ').map(x => x.split('=')).filter(x => x[0] === key)[0][1];
	}
	catch(err) {
		return false;
	}
	return document.cookie;
})

const getCookies = ClientFunction(() => {
	return document.cookie;
})


// intro
const logger = RequestLogger({domainUrl}, {
	logResponseHeaders: true
});

fixture `Intro`
	.page(`${domainUrl}/`)
	.requestHooks(logger);

test('Page returns 200', async t => {
	await t.expect(logger.contains(r => r.response.statusCode === 200)).ok();
})

test('Browser sets introSeen cookie on page load', async t => {
	await t.expect(getCookie('introSeen')).ok();;
})


// login
fixture `views.Login`
	.page(`${domainUrl}/login/`)

test('User can login', async t => {
	const username = 'test_user';
	const password = 'drowssap';

	const usernameField = Selector('#login-input-username');
	const passwordField = Selector('#login-input-password');

	// username field is autofocused
	// await t.expect(usernameField.value).eql('', 'input is empty');

	// submit username and password

})
