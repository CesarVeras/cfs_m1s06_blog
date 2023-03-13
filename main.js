const sectionPosts = document.querySelector('[data-posts]');
const btnCarregar = document.querySelector('[data-carregar]');
const dlgComentarios = document.querySelector('[data-comentarios]');
const dlgComentariosBody = document.querySelector('[data-comentarios-body');

let pagina = 1;
let limitePorPagina = 20;
let chegouNoFim = false;
let postAtual;

window.eventoClick = (id) => {
	carregarComentarios(id);
}

window.fecharModal = () => {
	dlgComentarios.close()
}

const carregarComentarios = (id) => {
	fetch(`https://jsonplaceholder.typicode.com/posts/${id}/comments`).then(data => data.json()).then(data => {
		dlgComentariosBody.innerHTML = '';
		data.map(comentario => {
			dlgComentariosBody.insertAdjacentHTML(
				'beforeend', 
				`
					<article data-post="${comentario.postId}" data-id="${comentario.id}">
						<h2>${comentario.name}</h2>
						<h3>${comentario.email}</h3>
						<p>${comentario.body}</p>
					</article>
				`
			);
		});
		dlgComentarios.showModal();
	});
};

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
					<article data-post="${post.id}" data-user="${post.userId}" onclick="eventoClick(${post.id})">
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
dlgComentarios.addEventListener('click', fecharModal);