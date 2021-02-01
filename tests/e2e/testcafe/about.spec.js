import { Selector, RequestLogger } from 'testcafe';
import * as helpers from '../../../src/assets/js/helpers.js'
import * as tHelpers from './testHelpers.js'


const frontendUrl = helpers.FRONTEND_SERVER_URL;
let testPageUrl = `${frontendUrl}/about/`;

const logger = RequestLogger({frontendUrl}, {
	logResponseHeaders: true
});


fixture `About`
	.page(testPageUrl)
	.requestHooks(logger);


test('Page returns 200', async t => {
	await t.expect(logger.contains(r => r.response.statusCode === 200)).ok();
})


test('Browser sets introSeen cookie on page load', async t => {
	await t.expect(tHelpers.getCookie('introSeen')).ok();
})


test(`Button "Let's go shopping!" goes to storeList`, async t => {
	await t.click('#button-lets-go-shopping');
	await t.expect(tHelpers.getWindowLocation()).eql(frontendUrl + '/');
})
