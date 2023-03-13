const sectionPosts = document.querySelector('[data-posts]');
const btnCarregar = document.querySelector('[data-carregar]');

let pagina = 1;
let limitePorPagina = 20;
let chegouNoFim = false;


const carregarPosts = () => {
	if (chegouNoFim) btnCarregar.style.display = 'none';
	fetch(`https://jsonplaceholder.typicode.com/posts?_page=${pagina}&_limit=${limitePorPagina}`).then(data => data.json()).then(data => {
		if (data.length < limitePorPagina) {
			chegouNoFim = true;
			btnCarregar.style.display = 'none';
		} else {
			btnCarregar.style.display = 'block';
			pagina++;
		}
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

carregarPosts();

btnCarregar.addEventListener('click', carregarPosts);