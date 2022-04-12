const list_items = document.querySelectorAll('.list-item');
const lists = document.querySelectorAll('.list');

let draggedItem = null;
let InsDelEvent = '';

for (let i = 0; i < list_items.length; i++) {
	const item = list_items[i];

	item.addEventListener('click', function () {
		$.ajax({
			method: "POST",
			url: "dnd.php",
			data: { text: item.innerHTML }
			// data: { text: $("p.unbroken").text() }
		  })
		.done(function( response ) {
			$("p.otvet_php").html(response);
			console.log("axaj click");
		});
	});

	item.addEventListener('dragstart', function () {
		draggedItem = item;
		setTimeout(function () {
			item.style.display = 'none';
		}, 0)
		
		InsDelEvent = ' dragstart';
		console.log(InsDelEvent);
		console.log(item.innerHTML);
		// console.log(item.outerHTML);

		$.ajax({
			method: "POST",
			url: "dnd.php",
			data: { text: item.innerHTML }
			// data: { text: $("p.unbroken").text() }
		  })
		.done(function( response ) {
			$("p.otvet_php").html(response);
			console.log("axaj dragstart");
		});

	});

	item.addEventListener('dragend', function () {
		setTimeout(function () {
			draggedItem.style.display = 'block';
			draggedItem = null;
		}, 0);
		
		InsDelEvent = ' dragend';
		console.log(InsDelEvent);
		item.innerHTML += ' change';
	})

	for (let j = 0; j < lists.length; j ++) {
		const list = lists[j];

		list.addEventListener('dragover', function (e) {
			e.preventDefault();
		});
		
		list.addEventListener('dragenter', function (e) {
			e.preventDefault();
			this.style.backgroundColor = 'rgba(0, 0, 0, 0.2)';
		});

		list.addEventListener('dragleave', function (e) {
			this.style.backgroundColor = 'rgba(0, 0, 0, 0.1)';
		});

		list.addEventListener('drop', function (e) {
			console.log('drop');
			this.append(draggedItem);
			this.style.backgroundColor = 'rgba(0, 0, 0, 0.1)';
		});
	}
}