import { Selector, RequestLogger } from 'testcafe';
import * as helpers from '../../../src/assets/js/helpers.js'
import * as tHelpers from './testHelpers.js'

const frontendUrl = helpers.FRONTEND_SERVER_URL;
let testPageUrl = `${frontendUrl}/login/`

fixture `views.Login`
	.page(testPageUrl)
	.beforeEach(async t => {
		// ENSURE THIS WORKS
		tHelpers.setCookie('introSeen', '1');
		await t.navigateTo(testPageUrl);
	})

test('User can login with Enter key', async t => {
	const username = 'test_user';
	const password = 'drowssap';

	const usernameField = await Selector('#login-input-username');
	const passwordField = await Selector('#login-input-password');

	await t.expect(usernameField.getAttribute('autofocus')).eql('autofocus', 'username field is autofocused');

	// submit username and password
	await t.typeText(usernameField, username);
	await t
		.typeText(passwordField, password)
		.pressKey('enter');

	// user is logged in
	tHelpers.getCookie('userToken');
	await t.expect(tHelpers.getWindowLocation()).eql(`${frontendUrl}/my-account/`);
})

test('User can login by clicking Login button', async t => {
	const username = 'test_user';
	const password = 'drowssap';

	const usernameField = await Selector('#login-input-username');
	const passwordField = await Selector('#login-input-password');
	const loginButton = await Selector('#login-button-submit');

	await t.expect(usernameField.getAttribute('autofocus')).eql('autofocus', 'username field is autofocused');

	// submit username and password
	await t.typeText(usernameField, username);
	await t.typeText(passwordField, password)
	await t.click('#login-button-submit')

	// user is logged in and redirected to userDetail
	tHelpers.getCookie('userToken');
	await t.expect(tHelpers.getWindowLocation()).eql(`${frontendUrl}/my-account/`);
})

// test('User is redirected to userDetail if already logged in', async t => {
// 	await t.expect(true).eql(true);
// })
