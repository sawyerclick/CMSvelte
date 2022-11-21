import fs from 'fs';
import archieml from 'archieml';
import fetch from 'node-fetch';
import htmlparser from 'htmlparser2';
import { decode } from 'html-entities';

const CWD = process.cwd();
const CONFIG_PATH = `${CWD}/config.json`;
const CONFIG = JSON.parse(fs.readFileSync(CONFIG_PATH, 'utf-8'));
const { doc } = CONFIG.google;

const requestAndParse = async (opt, cb) => {
	try {
		const response = await fetch(`https://docs.google.com/document/d/${opt.id}/export?format=html`);
		if (response.ok) {
			const body = await response.text();
			let parsed;
			const parser = new htmlparser.Parser(
				new htmlparser.DomHandler(function (error, dom) {
					if (error) throw error;
					else {
						const tagHandlers = {
							_base: function (tag) {
								let str = '';
								tag.children.forEach(function (child) {
									let func = tagHandlers[child.name || child.type];
									if (func) str += func(child);
								});
								return str;
							},
							text: function (textTag) {
								return textTag.data;
							},
							span: function (spanTag) {
								return tagHandlers._base(spanTag);
							},
							p: function (pTag) {
								return tagHandlers._base(pTag) + '\n';
							},
							a: function (aTag) {
								let href = aTag.attribs.href;
								if (href === undefined) return '';
								if (
									href &&
									href.includes('://www.') &&
									new URL(href) &&
									new URL(href).searchParams.get('q')
								) {
									href = new URL(href).searchParams.get('q');
								}
								return `<a href="${href}">${tagHandlers._base(aTag)}</a>`;
							},
							li: function (tag) {
								return '* ' + tagHandlers._base(tag) + '\n';
							},
							b: function (bTag) {
								return `<b>${tagHandlers._base(bTag)}</b>`;
							}
						};
						['ul', 'ol'].forEach(function (tag) {
							tagHandlers[tag] = tagHandlers.span;
						});
						['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].forEach(function (tag) {
							tagHandlers[tag] = tagHandlers.p;
						});
						const body = dom[0].children[1];
						let parsedText = tagHandlers._base(body);
						// Convert html entities into the characters as they exist in the google doc
						parsedText = decode(parsedText);
						// Remove smart quotes from inside tags
						parsedText = parsedText.replace(/<[^<>]*>/g, function (match) {
							return match.replace(/"|"/g, '"').replace(/'|'/g, "'");
						});
						parsed = JSON.stringify(archieml.load(parsedText));
					}
				})
			);
			parser.write(body);
			parser.done();
			const file = `${CWD}/${opt.filepath || 'src/lib/data/copy.json'}`;
			fs.writeFile(file, parsed, (err) => {
				if (err) throw err;
				console.log(
					'archie doc with id',
					'\x1b[32m',
					`${opt.id}`,
					'\x1b[0m',
					'successfully written to',
					'\x1b[34m',
					`${file}\n`
				);
				cb();
			});
		}
	} catch (err) {
		console.error(err);
	}
}

function init() {
	let i = 0;
	const next = () => {
		const d = doc[i];
		if (d.id)
			requestAndParse(d, () => {
				i += 1;
				if (i < doc.length) next();
				else process.exit();
			});
	};
	next();
}
init();