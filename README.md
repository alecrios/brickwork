# Brickwork

Brickwork is a simple and lightweight masonry grid system for images. It's highly performant and extremely flexible. It doesn't use absolute positioning, it doesn't create elements, and it doesn't apply any styles. All Brickwork does is sort items into columns. And it does so efficiently, by first performing calculations with virtual representations of the grid and only making DOM changes once, after the new layout has been determined.

In the interest of performance, the sizes of images are not pulled during every layout calculation. Rather, the aspect ratio of each item is pulled from a data attribute on the element upon initialization. Specifically, this number indicates the height of the item if the width is `1` (i.e. _height_ / _width_). For example, for an item with a 640x480 image, this attribute would read `data-height="0.75"`.

## Example

1. Create empty columns for the items to be sorted into.

	``` html
	<div class="brickwork">
		<div class="column"></div>
		<div class="column"></div>
		<div class="column"></div>
		<div class="column"></div>
	</div>
	```

2. Create items to be sorted into the columns, providing a `data-height` attribute.

	``` html
	<div class="item" data-height="0.50"><img src="img/01.jpg"></div>
	<div class="item" data-height="1.00"><img src="img/02.jpg"></div>
	<div class="item" data-height="1.00"><img src="img/03.jpg"></div>
	<div class="item" data-height="1.00"><img src="img/04.jpg"></div>
	<div class="item" data-height="1.00"><img src="img/05.jpg"></div>
	<div class="item" data-height="0.50"><img src="img/06.jpg"></div>
	<div class="item" data-height="0.75"><img src="img/07.jpg"></div>
	<div class="item" data-height="1.50"><img src="img/08.jpg"></div>
	```

3. Write styles for the columns and items.

	``` css
	/* Set the display of the grid. */
	.brickwork {
		display: flex;
	}

	/* Progressively show more columns on larger screens. */
	.column { display: none }
	.column:nth-child(1) { display: block }
	@media (min-width: 32em) { .column:nth-child(2) { display: block } }
	@media (min-width: 48em) { .column:nth-child(3) { display: block } }
	@media (min-width: 64em) { .column:nth-child(4) { display: block } }

	/* Set the spacing between images. */
	.brickwork,
	.item {
		padding: .5rem;
	}

	/* Hide items by default. */
	.item {
		display: none;
	}

	/* Only show items that have been placed in a column. */
	.column .item {
		display: block;
	}

	/* Set images to occupy the full width of the item. */
	img {
		width: 100%;
	}
	```

4. Create a new `Brickwork`, specifying the columns and items.

	``` js
	const columns = document.querySelectorAll('.column');
	const items = document.querySelectorAll('.item');
	new Brickwork(columns, items);
	```

[View the full demo files &raquo;](./demo)
