import * as vscode from 'vscode';
import * as assert from 'assert';
import { getDocUri, activate } from '../workspace/helper';

suite('Should do completion', () => {
	const docUri = getDocUri('document.tml');

	test('Completes JS/TS in txt file', async () => {
		await testCompletion(docUri);
	});
});

async function testCompletion(docUri: vscode.Uri) {
	await activate(docUri);
	assert.ok(true);
}