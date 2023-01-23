import { remark } from 'remark';
import { reporter } from 'vfile-reporter';
import headings from './dist/index.js';
import fs from 'fs';

remark()
	.use(headings)
	.process(fs.readFileSync('./test.md', 'utf-8'))
	.then((file) => {
		console.log(JSON.stringify(file.data.fm.headings, null, 3));
		console.error(reporter(file));
	});
