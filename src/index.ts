import type { Heading, Root } from 'mdast';

import { visit } from 'unist-util-visit';
import { toString } from 'mdast-util-to-string';

export type HeadingItem = {
	id?: string;
	depth: number;
	value?: string;
	children?: Array<HeadingItem>;
};

export default function headings() {
	return async function transformer(tree: Root, vFile: any) {
		const headings: Array<HeadingItem> = [];

		const slugify = (value: string) =>
			value
				.toLowerCase()
				.trim()
				.replace(/[^\w\s-]/g, '')
				.replace(/[\s_-]+/g, '-')
				.replace(/^-+|-+$/g, '');

		function getFlatHeadingsList(node: Heading) {
			const h: HeadingItem = {
				id: slugify(toString(node)),
				depth: node.depth,
				value: toString(node)
			};

			headings.push(h);
		}

		function buildHeadingsTree(headings: Array<HeadingItem>): Array<HeadingItem> {
			const root: HeadingItem = { depth: 0 };
			const parents: Array<HeadingItem> = [];
			let previous = root;

			headings.forEach((heading) => {
				if (heading.depth > previous.depth) {
					if (previous.children === undefined) {
						previous.children = [];
					}
					parents.push(previous);
				} else if (heading.depth < previous.depth) {
					while (parents[parents.length - 1].depth >= heading.depth) {
						parents.pop();
					}
				}

				parents[parents.length - 1].children?.push(heading);
				previous = heading;
			});

			return root.children || [];
		}

		visit(tree, 'heading', getFlatHeadingsList);
		if (!vFile.data.fm) vFile.data.fm = {};
		vFile.data.fm.headings = buildHeadingsTree(headings);
	};
}
