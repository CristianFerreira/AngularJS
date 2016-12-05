angular.module("listaTelefonica").factory("contatosAPI", function($http, config){
  var _getContatos = function (){
    return $http.get(config.baseUrl + "/contatos");
  };

  var _saveContato = function (contato){
    return $http.post("http://localhost:3412/contatos",contato);
  };

  return{
    getContatos: _getContatos,
    saveContato: _saveContato
  };
});
