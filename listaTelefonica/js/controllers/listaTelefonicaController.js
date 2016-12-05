angular.module("listaTelefonica").controller("listaTelefonicaController", function($scope, contatosAPI, operadorasAPI, serialGenerator){
  $scope.titulo = "Lista Telefonica";
  $scope.contatos = [];

  $scope.operadoras = [
    {nome: "oi", codigo:1, categoria: "Celular"},
    {nome: "claro", codigo:2, categoria: "Celular"},
    {nome: "TIM", codigo:3, categoria: "Celular"},
    {nome: "vivo", codigo:4, categoria: "Celular"},
    {nome: "GVT", codigo:5, categoria: "Fixo"},
    {nome: "Embratel", codigo:6, categoria: "Fixo"}
  ];

  var carregarContatos = function(){
      contatosAPI.getContatos().success(function (data){
         $scope.contatos = data;
      });
  };

  var carregarOperadoras = function(){
     operadorasAPI.getOperadoras().success(function(data){
       $scope.operadoras = data;
     }).error(function(data, status){
         $scope.message = "Aconteceu um problema" + data;
     });
  };

  $scope.ordernarPor = function(campo){
      $scope.criterioDeBusca = campo;
      $scope.direcaoDaOrdenacao = !$scope.direcaoDaOrdenacao;
  };

  $scope.adicionarContato = function(contato){
    contato.serial = serialGenerator.generate();
      contatosAPI.saveContato(contato).success(function(data){
      delete $scope.contato;
      $scope.contatoForm.$setPristine();
      carregarContatos();
    }).error(function(data, status){
        $scope.message = "Aconteceu um problema" + data;
    });
  };

  $scope.apagarContato = function(contatos){
      $scope.contatos = contatos.filter(function(contato){
         if(!contato.selecionado) return contato;
      });
  };

  $scope.isContatoSelecionado = function(contatos){
      return contatos.some(function(contato){
        return contato.selecionado;
      });
  };
});
