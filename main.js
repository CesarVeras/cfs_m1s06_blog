const sectionPosts = document.querySelector('[data-posts]');

let pagina = 1;
let limitePorPagina = 20;



const carregarPosts = (pagina, limite) => {
	fetch(`https://jsonplaceholder.typicode.com/posts?_page=${pagina}&_limit=${limitePorPagina}`).then(data => data.json()).then(data => {
		data.map(post => {
			sectionPosts.insertAdjacentHTML(
				'beforeend', 
				`
					<article data-post="${post.id}" data-user="${post.userId}">
						<h2>${post.title}</h2>
						<p>${post.body}</p>
					</article>
				`
			);
		});	
	});
};

carregarPosts(pagina, limitePorPagina);