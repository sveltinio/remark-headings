<div align="center">
    <h1>remark-headings</h1>
    &nbsp;
    <a href="https://www.npmjs.com/package/@sveltinio/remark-headings" target="_blank"><img src="https://img.shields.io/npm/v/@sveltinio/remark-headings.svg?style=flat" alt="sveltinio/remark-headings NPM version badge" /></a>
</div>

Extracts the headings tree from your markdown and add it to the frontmatter.

## Installation

`npm install @sveltinio/remark-headings`

## Usage

### remark

```javascript
import { remark } from 'remark';
import { reporter } from 'vfile-reporter';
import headings from '@sveltinio/remark-headings';

const mdContent = `
# Welcome Post

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.

## Intro

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.

## Roadmap

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.

### Short-Term

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.

### Long-Term

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
`;

remark()
	.use(headings)
	.process(mdContent)
	.then((file) => {
		console.log(JSON.stringify(file.data.fm.headings, null, 3));
		console.error(reporter(file));
	});
```

**Output**

```javascript
// file.data.fm.headings
[
   {
      "id": "welcome-post",
      "depth": 1,
      "value": "Welcome Post",
      "children": [
         {
            "id": "intro",
            "depth": 2,
            "value": "Intro"
         },
         {
            "id": "roadmap",
            "depth": 2,
            "value": "Roadmap",
            "children": [
               {
                  "id": "short-term",
                  "depth": 3,
                  "value": "Short-Term"
               },
               {
                  "id": "long-term",
                  "depth": 3,
                  "value": "Long-Term"
               }
            ]
         }
      ]
   }
]
```

### mdsvex

```javascript
// mdsvex.config.js
import headings from "@sveltinio/remark-headings";

export default {
  // ... rest of your config
  remarkPlugins: [headings],
};
```

## License

Free and open-source software under the [MIT License](LICENSE)