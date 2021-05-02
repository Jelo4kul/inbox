const path = require('path');
const fs = require('fs');
const solCompiler = require('solc');

const inboxPath = path.resolve(__dirname, 'contracts', 'inbox.sol');
const inboxContent = fs.readFileSync(inboxPath, 'utf8');

module.exports = solCompiler.compile(inboxContent, 1).contracts[':Inbox'];