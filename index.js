function throttle(callback, delay) {
	let timeout = null;

	return function call(...args) {
		const next = () => {
			callback.apply(this, args);
			timeout = null;
		};

		if (!timeout) {
			timeout = setTimeout(next, delay);
		}
	};
}

class Brickwork {
	constructor(columns, items) {
		// Store the data for each column and item.
		this.columns = Array.from(columns).map((column) => this.getColumnInterface(column));
		this.items = Array.from(items).map((item) => this.getItemInterface(item));

		// Calculate layout initially and upon window resize.
		this.setLayout();
		window.addEventListener('resize', throttle(() => this.onResize(), 250));
	}

	getColumnInterface(element) {
		// Store the HTMLElement, visibility status, staged items, and staged height.
		return {
			element,
			active: window.getComputedStyle(element).display !== 'none',
			items: [],
			height: 0,
		};
	}

	getItemInterface(element) {
		// Store the HTMLElement and height.
		return {
			element,
			height: Number(element.dataset.height),
		};
	}

	getActiveColumns() {
		// Filter columns by whether or not they are visible.
		return this.columns.filter((column) => column.active);
	}

	getShortestActiveColumnIndex() {
		// Map each column to its height, where inactive columns are invalidated by using infinity.
		const heights = this.columns.map((column) => column.active ? column.height : Infinity);

		// Return the index of the column with the minimum height.
		return heights.indexOf(Math.min(...heights));
	}

	onResize() {
		// Check the number of active columns before and after.
		const oldColumns = this.getActiveColumns();
		this.columns = this.columns.map((column) => this.getColumnInterface(column.element));
		const newColumns = this.getActiveColumns();

		// Only set layout if there is a different number of active columns than before.
		if (oldColumns.length !== newColumns.length) {
			this.setLayout();
		}
	}

	setLayout() {
		// Perform all of the calculation virtually, without affecting the DOM.
		this.items.forEach((item) => {
			const shortestColumn = this.columns[this.getShortestActiveColumnIndex()];
			shortestColumn.items.push(item.element);
			shortestColumn.height += item.height;
		});

		// Commit changes to the DOM by appending each item into its assigned column.
		this.getActiveColumns().forEach((column) => {
			column.element.append(...column.items);
		});
	}
}
