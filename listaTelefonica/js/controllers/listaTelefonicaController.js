angular.module("listaTelefonica").controller("listaTelefonicaController", function ($scope, $http){
  $scope.titulo = "Lista Telefonica";
  $scope.contatos = [];

  $scope.operadoras = [];

  var carregarContatos = function(){
      $http.get("http://localhost:3412/contatos").success(function (data){
         console.log(data);
         $scope.contatos = data;
      });
  };

  var carregarOperadoras = function(){
     $http.get("http://localhost:3412/operadoras").success( function (data){
       console.log(data);
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
    // contato.serial = serialGenerator.generate();
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

  carregarContatos();
  carregarOperadoras();
});
