const modalHTML = '<div class="modal fade" id="ExemploModalCentralizado" tabindex="-1" role="dialog" aria-labelledby="TituloModalCentralizado" aria-hidden="true"> <div class="modal-dialog modal-dialog-centered" role="document"> <div class="ring2"></div> <div class="modal-content"> <div class="modal-header"><h5 class="modal-title" id="TituloModalCentralizado">Roleta de sugestões</h5><button id="button-close" type="button" class="close" data-dismiss="modal" aria-label="Fechar"><span aria-hidden="true">&times;</span></button></div><div class="modal-body">Inserir dropdowns de seleção após consumo da API estiver pronto</div><div class="modal-footer"><button type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar</button><button type="button" class="btn btn-purple">Rodar Roleta</button></div></div></div></div>'

const modalButton = document.getElementById('modal-button');

modalButton.addEventListener('click', function (e) {
    e.preventDefault();
    const modalDiv = document.getElementById('modal-div');
    modalDiv.innerHTML = modalHTML;
});