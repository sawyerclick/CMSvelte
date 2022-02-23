/**
 * Based on [The Pudding's inView](https://github.com/the-pudding/svelte-starter/blob/main/src/actions/inView.js)
 * This action triggers a custom event on node entering/exiting the viewport.
 * example:
 * <p
 * 	use:inView
 * 	on:enter={() => console.log("enter")}
 * 	on:exit={() => console.log("exit")}
 * >
 * 
 * optional params { root, top, bottom }
 * top and bottom are numbers
 * use:inView={ bottom: '100px' } // 100 pixels from bottom of viewport
 */

export default function inView(node, params = {}) {
	let observer;

	const handleIntersect = ([entry]) => {
		const intersecting = entry.isIntersecting;
		const v = intersecting ? 'enter' : 'exit';
		node.dispatchEvent(new CustomEvent(v));
		if (params.progress && intersecting) {
			const ratio = entry.intersectionRatio;
			const detail = { ratio };
			node.dispatchEvent(new CustomEvent('progress', { detail }));
		}
	};

	const setObserver = ({ root, top = '0px', bottom = '0px' }) => {
		const rootMargin = `${top} 0px ${bottom} 0px`;
		const options = { root, rootMargin };
		if (observer) observer.disconnect();
		observer = new IntersectionObserver(handleIntersect, options);
		observer.observe(node);
	};

	setObserver(params);

	return {
		update(params) {
			setObserver(params);
		},

		destroy() {
			if (observer) observer.disconnect();
		}
	};
}