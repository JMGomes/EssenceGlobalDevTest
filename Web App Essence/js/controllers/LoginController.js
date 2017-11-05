'use strict'

app.controller("LoginController", function($scope,$http,$location,$rootScope,Data,LoginService) {

	
$scope.username="andre";
$scope.password="1234";
	
	//expect(inputs.isDisplayed()).toBeFalsy();

	$scope.entrar = function() {

		$scope.checked=true;
		
		LoginService.Login($scope.username,$scope.password)
		.then(function(response) {			
			$scope.todos = "resposta chegou";
			if(response.data['successLoginEmployee']=="1"){
			console.log(response.data);
				$scope.teste="sucesso";
				Data.setLogado("true");
				Data.setUsername($scope.username);
				Data.setPassword($scope.password);
				Data.setInfo(response.data['loginEmployee']['0']);
				$scope.descricao=response.data['loginEmployee']['0']['descricao'];
				$scope.email=response.data['loginEmployee']['0']['email'];
				$scope.nFuncionario=response.data['loginEmployee']['0']['numeroFuncionario'];
				$scope.nickname=response.data['loginEmployee']['0']['nickname'];
				$scope.fk_cod_pessoa=response.data['loginEmployee']['0']['fk_cod_pessoa'];
				console.log(response.data);
				console.log(response.data['loginEmployee']['0']);
				console.log($scope.nickname);
				$location.path('/painel');
				console.log($scope.nickname);
				var coiso = Data.getUsername();
				console.log(coiso);
				Data.setLogado("true");
			}else{
				alert("login fail");
				$scope.checked=false;
				$scope.password="";
			}
			}, function(response) {
				alert("falhou o pedido")
});
		
	}

});


