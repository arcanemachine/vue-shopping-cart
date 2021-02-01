import { Selector, RequestLogger } from 'testcafe';
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

const url = `${helpers.BACKEND_SERVER_URL}/`

const logger = RequestLogger({url}, {
	logResponseHeaders: true
});

fixture `Hello World`
	.page(url)
	.requestHooks(logger);

test('Page returns 200', async t => {
	await t.expect(logger.contains(r => r.response.statusCode === 200)).ok();
})
