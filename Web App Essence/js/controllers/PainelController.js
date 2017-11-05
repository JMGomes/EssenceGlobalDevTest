'use strict'

app.controller("PainelController", function($scope,$http,$location,$rootScope,Data, $mdDialog,getAllUsersService,AlterarClienteService, AdicionarClienteService,RemoverClienteService) {

	$scope.allusers=[];
	$scope.showTreinos=false;
	$scope.clienteSelecionado = null;
	$scope.clienteNovo=false;
	$scope.descricao=Data.getInfo()['descricao'];
	$scope.email=Data.getInfo()['email'];
	$scope.fk_cod_pessoa=Data.getInfo()['fk_cod_pessoa'];
	$scope.numFuncionario=Data.getInfo()['numFuncionario'];
	$scope.nickname=Data.getInfo()['nickname'];
	$scope.treinador="";
	$scope.generos = ['M','F'];
	console.log(Data.getInfo());
	console.log(Data.getInfo()['numFuncionario']);
	$scope.filtro="";

	$scope.ActualizarListaDeUsers = function(){
		$scope.pedidoClientes=false;$scope.clienteSelecionado = null;
		getAllUsersService.getAllUsers('CEO',$scope.numFuncionario)
	.then(function(response) {
		console.log(response.data.getAllUsersOfEmployees);

		$scope.allusers=response.data.getAllUsersOfEmployees;
		$scope.treinadores = { treinadores:[],nclientes:[] };
		$scope.treinadores.treinadores.push("Todos");
		$scope.treinadores.nclientes.push(1);
		$scope.treinadores.treinadores.push("Sem Plano");
		$scope.treinadores.nclientes.push(0);
		$scope.semplano=0;


		
		for (var i = 0; i < response.data.getAllUsersOfEmployees.length; i++) {
			//$scope.allusers[i]['avatar']="img/avatar.png";
			var nickname = response.data.getAllUsersOfEmployees[i]['nickname']; 
			$scope.allusers[i]['foto']='img/avatar.png';
			if(nickname!=null){
				var indexOf = $scope.treinadores.treinadores.indexOf(nickname);
				if(indexOf==-1){
					$scope.treinadores.treinadores.push(nickname);
					$scope.treinadores.nclientes.push(1);
				}
				else{					
					$scope.treinadores.nclientes[indexOf]+=1;
					$scope.treinadores.nclientes[0]+=1;
				}
			}else{
				$scope.semplano+=1;
				$scope.treinadores.nclientes[1]=$scope.semplano;
				$scope.treinadores.nclientes[0]+=1;
			}
		}

		var pedidoIndex=0;
		var eu=-1;

// for ( pedidoIndex = 0; pedidoIndex < $scope.allusers.length; pedidoIndex++) {

// $http.get('https://s3.amazonaws.com/VirtualGYM/images/CorpoPerfeito/users/'+$scope.allusers[pedidoIndex]['numSocio']+'.jpg',{msg:pedidoIndex.toString()}).
//  	then(function(response) {
//  		console.log("sucesso");k
 		
//  		$scope.allusers[response.config.msg]['foto']='https://s3.amazonaws.com/VirtualGYM/images/CorpoPerfeito/users/'+$scope.allusers[response.config.msg]['numSocio']+'.jpg';
 		
 	
//  		//console.log(response.data);
//  		//console.log($scope.allusers[response.config.msg]['foto']);
//  		//console.log(response);
//  	}, function(response) {
//  		$scope.allusers[response.config.msg]['foto']='https://s3.amazonaws.com/VirtualGYM/images/CorpoPerfeito/users/'+$scope.allusers[response.config.msg]['numSocio']+'.jpg';
// //     // called asynchronously if an error occurs
// //     // or server returns response with an error status.
//  });

//  }

		

		console.log("da");
	console.log($scope.treinadores);
	console.log("$scope.treinadores");
	$scope.friend="inicio";
		$scope.pedidoClientes=true;


	}, function(response) {
    // called asynchronously if an error occurs
    // or server returns response with an error status.
}
);
	}

		$scope.ActualizarListaDeUsers();



	


// 	$http.get('https://s3.amazonaws.com/VirtualGYM/images/CorpoPerfeito/users/100000.jpg').
// 	then(function(response) {
// 		$scope.allusers[i]['foto']="img/avatar.png";
// 	}, function(response) {
// 		$scope.allusers[i]['foto']="img/avatar.png";

//     // called asynchronously if an error occurs
//     // or server returns response with an error status.
// });

// }

$scope.diasDaSemana =  [ 
	{ dia:'2ª',treino:false },
	{ dia:'3ª',treino:false },
	{ dia:'4ª',treino:false },
	{ dia:'5ª',treino:false }  ,
	{ dia:'6ª',treino:false }  ,
	{ dia:'Sabado',treino:false },  
	{ dia:'Domingo',treino:false }  
	];


	
	
var treinadorAnterior = "";
$scope.checkNovoTreinador = function(treinadorActual) {
		var res;
		if(treinadorAnterior==treinadorActual)
			res=false;
		else
			res=true;
		treinadorAnterior=treinadorActual;
		return res;
}

$scope.test = function(text) {
	if($scope.funcionarioIntel == true)
		$scope.funcionarioIntel = false;
	else
  		$scope.funcionarioIntel = true;

  	$scope.clienteSelecionado = null;

  }



$scope.guardaCliente = function(cliente) {
	$scope.clienteNovo=false;

	$scope.funcionarioIntel=false;

	$scope.clienteSelecionado = angular.copy(cliente);
	console.log($scope.clienteSelecionado);
	console.log(cliente);

	var diasdetreino = $scope.clienteSelecionado['frequencia_treino'].split(";");
	for (var i = 0; i < $scope.diasDaSemana.length; i++) {
		if(diasdetreino[i]=="1")
		$scope.diasDaSemana[i]['treino']=true;
		else
			$scope.diasDaSemana[i]['treino']=false;
	}

	if($scope.clienteSelecionado['isPT']=="1")
		$scope.clienteSelecionado['isPT']=true;
	else
		$scope.clienteSelecionado['isPT']=false;

	if($scope.clienteSelecionado['active']=="1")
		$scope.clienteSelecionado['active']=true;
	else
		$scope.clienteSelecionado['active']=false;

	if($scope.clienteSelecionado['dataIncricao']=="")
		$scope.clienteSelecionado['dataIncricao']=null;
	else{
		var aux = $scope.clienteSelecionado['dataIncricao'].split("-");
		$scope.clienteSelecionado['dataIncricao']= new Date(aux[0],aux[1]-1,aux[2]);
		
	}

	if($scope.clienteSelecionado['dataDeNascimento']=="")
		$scope.clienteSelecionado['dataDeNascimento']=null;
	else{
		var aux = $scope.clienteSelecionado['dataDeNascimento'].split("-");
		$scope.clienteSelecionado['dataDeNascimento']= new Date(aux[0],aux[1]-1,aux[2]);
	}

	Data.setClienteSelecionado($scope.clienteSelecionado);

	$scope.clienteSelecionadoInicial = angular.copy($scope.clienteSelecionado);
	$scope.diasDaSemanaInicial = angular.copy($scope.diasDaSemana);
}

$scope.checkAlteracoesCliente = function(){
	return ( angular.equals($scope.clienteSelecionadoInicial,$scope.clienteSelecionado) && angular.equals($scope.diasDaSemanaInicial,$scope.diasDaSemana) );
}

$scope.actualizarCliente = function(){

	var seg,ter,qua,quin,sex,sab,dom ="";
	if($scope.diasDaSemana[0]['treino']==true)
			seg="1";
	else	
			seg="0";

	if($scope.diasDaSemana[1]['treino']==true)
			ter="1";
	else	
			ter="0";

	if($scope.diasDaSemana[2]['treino']==true)
			qua="1";
	else	
			qua="0";

	if($scope.diasDaSemana[3]['treino']==true)
			quin="1";
	else	
			quin="0";

	if($scope.diasDaSemana[4]['treino']==true)
			sex="1";
	else	
			sex="0";

	if($scope.diasDaSemana[5]['treino']==true)
			sab="1";
	else	
			sab="0";

	if($scope.diasDaSemana[6]['treino']==true)
			dom="1";
	else	
			dom="0";

	var isPT="";
	if($scope.clienteSelecionado['isPT']==true)
		isPT="1";
	else
		isPT="0";

	var isActive="";
	if($scope.clienteSelecionado['active']==true)
		isActive="1";
	else
		isActive="0";

	var dataDeNascimento="";
	if($scope.clienteSelecionado['dataDeNascimento']==null)
		$scope.clienteSelecionado['dataDeNascimento']="";
	else{
		dataDeNascimento+= $scope.clienteSelecionado['dataDeNascimento'].getFullYear().toString();
		dataDeNascimento+= "-";
		if($scope.clienteSelecionado['dataDeNascimento'].getMonth()+1<10 )
			dataDeNascimento+= "0";
		dataDeNascimento+= ($scope.clienteSelecionado['dataDeNascimento'].getMonth()+1).toString();
		dataDeNascimento+= "-";
		if($scope.clienteSelecionado['dataDeNascimento'].getDate()<10 )
			dataDeNascimento+= "0";
		dataDeNascimento+= $scope.clienteSelecionado['dataDeNascimento'].getDate();
		}

	var dataIncricao="";
	if($scope.clienteSelecionado['dataIncricao']==null)
		$scope.clienteSelecionado['dataIncricao']="";
	else{
		dataIncricao+= $scope.clienteSelecionado['dataIncricao'].getFullYear().toString();
		dataIncricao+= "-";
		if($scope.clienteSelecionado['dataIncricao'].getMonth()+1<10 )
			dataIncricao+= "0";
		dataIncricao+= ($scope.clienteSelecionado['dataIncricao'].getMonth()+1).toString();
		dataIncricao+= "-";
		if($scope.clienteSelecionado['dataIncricao'].getDate()<10 )
			dataIncricao+= "0";
		dataIncricao+= $scope.clienteSelecionado['dataIncricao'].getDate();
	}

	// $http.post('http://www.onvirtualgym.com/OnVirtualGymCorpoPerfeito/apiUsers.php?method=insertClient',{
 //   "nome":"Joao Gomes",
 //   "dataDeNascimento":"2015-03-03",
 //   "sexo":"M",
 //   "foto":"",
 //   "bilheteIdentidade":"",
 //   "dataValidadeBI":"2015-07-24",
 //   "contribuinte":"",
 //   "estadoCivil":"",
 //   "numSocio":"1234567899",
 //   "dataIncricao":"2015-03-03",
 //   "profissao":"Estudante",
 //   "morada":"",
 //   "codigoPostalZip1":"",
 //   "codigoPostalZip2":"",
 //   "cidade":"Braga",
 //   "pais":"",
 //   "numeroTelefone":"",
 //   "numeroTelemovel":"917913150",
 //   "email":"",
 //   "facebook":"www.facebook.com",
 //   "twitter":"braga.casais@gmail.com",
 //   "seg":"1",
 //   "ter":"0",
 //   "qua":"0",
 //   "qui":"1",
 //   "sex":"0",
 //   "sab":"1",
 //   "dom":"0",
 //   "nickname":"André",
 //   "active":"1",
 //   "isPT":"1"
	// }).
	// then(function(response){
	// 	alert("ta tudo");
	// 	console.log(response);

	// },function(response){
	// 	alert("meps");
	// 	console.log(response);
	// });	
	
	var data = {
   "nome":$scope.clienteSelecionado['nome'],
   "dataDeNascimento":dataDeNascimento,
   "sexo":$scope.clienteSelecionado['sexo'], 
   "bilheteIdentidade":$scope.clienteSelecionado['bilheteIdentidade'], 
  "dataValidadeBI":$scope.clienteSelecionado['dataValidadeBI'], 
  "contribuinte":$scope.clienteSelecionado['contribuinte'], 
  "estadoCivil":$scope.clienteSelecionado['estadoCivil'], 
  "pais":$scope.clienteSelecionado['pais'], 
  "numeroTelefone":$scope.clienteSelecionado['numeroTelefone'], 
   "numSocio":$scope.clienteSelecionado['numSocio'],
   "dataInscricao":dataIncricao,
   "profissao":$scope.clienteSelecionado['profissao'],
   "morada":$scope.clienteSelecionado['morada'],
   "codigoPostalZip1":$scope.clienteSelecionado['codigoPostalZip1'],
   "codigoPostalZip2":$scope.clienteSelecionado['codigoPostalZip2'],
   "cidade":$scope.clienteSelecionado['cidade'],
   "numeroTelemovel":$scope.clienteSelecionado['numeroTelemovel'],
   "email":$scope.clienteSelecionado['email'],
   "facebook":$scope.clienteSelecionado['facebook'],
   "twitter":$scope.clienteSelecionado['twitter'],
   "seg":seg,
   "ter":ter,
   "qua":qua,
   "qui":quin,
   "sex":sex,
   "sab":sab,
   "dom":dom,
   "active":isActive,
   "isPT":isPT
	}

	AlterarClienteService.AlterarCliente(data,$scope.clienteSelecionadoInicial['numSocio'])
	.then(function(response){
		$scope.ActualizarListaDeUsers();
	},function(response){
		alert("meps");
		console.log(response);
	});	

}


$scope.undoCliente = function(){
	$scope.clienteSelecionado=angular.copy($scope.clienteSelecionadoInicial);
	$scope.diasDaSemana = angular.copy($scope.diasDaSemanaInicial);
	Data.setClienteSelecionado($scope.clienteSelecionado);
}

$scope.novoCliente = function(){
	$scope.clienteSelecionado=[];
	Data.setClienteSelecionado($scope.clienteSelecionado);
	$scope.clienteSelecionado['nome']='Novo Cliente';
	$scope.clienteSelecionado['isPT']=false;
	$scope.clienteSelecionado['active']=true;
	$scope.clienteSelecionado['sexo']="M";
	$scope.clienteSelecionado['numSocio']="00000";  
	$scope.clienteSelecionado['foto']="img/avatar.png";  
	$scope.funcionarioIntel=false;
	$scope.clienteNovo=true;
}

$scope.novoClientePedido = function(){
	var seg,ter,qua,quin,sex,sab,dom ="";
	if($scope.diasDaSemana[0]['treino']==true)
			seg="1";
	else	
			seg="0";

	if($scope.diasDaSemana[1]['treino']==true)
			ter="1";
	else	
			ter="0";

	if($scope.diasDaSemana[2]['treino']==true)
			qua="1";
	else	
			qua="0";

	if($scope.diasDaSemana[3]['treino']==true)
			quin="1";
	else	
			quin="0";

	if($scope.diasDaSemana[4]['treino']==true)
			sex="1";
	else	
			sex="0";

	if($scope.diasDaSemana[5]['treino']==true)
			sab="1";
	else	
			sab="0";

	if($scope.diasDaSemana[6]['treino']==true)
			dom="1";
	else	
			dom="0";

	var isPT="";
	if($scope.clienteSelecionado['isPT']==true)
		isPT="1";
	else
		isPT="0";

	var isActive="";
	if($scope.clienteSelecionado['active']==true)
		isActive="1";
	else
		isActive="0";

	var dataDeNascimento="";
	if($scope.clienteSelecionado['dataDeNascimento']==null)
		$scope.clienteSelecionado['dataDeNascimento']="";
	else{
		dataDeNascimento+= $scope.clienteSelecionado['dataDeNascimento'].getFullYear().toString();
		dataDeNascimento+= "-";
		if($scope.clienteSelecionado['dataDeNascimento'].getMonth()+1<10 )
			dataDeNascimento+= "0";
		dataDeNascimento+= ($scope.clienteSelecionado['dataDeNascimento'].getMonth()+1).toString();
		dataDeNascimento+= "-";
		if($scope.clienteSelecionado['dataDeNascimento'].getDate()<10 )
			dataDeNascimento+= "0";
		dataDeNascimento+= $scope.clienteSelecionado['dataDeNascimento'].getDate();
		}

	var dataIncricao="";
	if($scope.clienteSelecionado['dataIncricao']==null)
		$scope.clienteSelecionado['dataIncricao']="";
	else{
		dataIncricao+= $scope.clienteSelecionado['dataIncricao'].getFullYear().toString();
		dataIncricao+= "-";
		if($scope.clienteSelecionado['dataIncricao'].getMonth()+1<10 )
			dataIncricao+= "0";
		dataIncricao+= ($scope.clienteSelecionado['dataIncricao'].getMonth()+1).toString();
		dataIncricao+= "-";
		if($scope.clienteSelecionado['dataIncricao'].getDate()<10 )
			dataIncricao+= "0";
		dataIncricao+= $scope.clienteSelecionado['dataIncricao'].getDate();
	}

	var data = {
   "nome":$scope.clienteSelecionado['nome'],
   "dataDeNascimento":dataDeNascimento,
   "sexo":$scope.clienteSelecionado['sexo'], 
   "bilheteIdentidade":"",
   "numSocio":$scope.clienteSelecionado['numSocio'],
   "dataInscricao":dataIncricao,
   "profissao":$scope.clienteSelecionado['profissao'],
   "morada":$scope.clienteSelecionado['morada'],
   "codigoPostalZip1":$scope.clienteSelecionado['codigoPostalZip1'],
   "codigoPostalZip2":$scope.clienteSelecionado['codigoPostalZip2'],
   "cidade":$scope.clienteSelecionado['cidade'],
   "numeroTelemovel":$scope.clienteSelecionado['numeroTelemovel'],
   "email":$scope.clienteSelecionado['email'],
   "facebook":$scope.clienteSelecionado['facebook'],
   "twitter":$scope.clienteSelecionado['twitter'],
   "seg":seg,
   "ter":ter,
   "qua":qua,
   "qui":quin,
   "sex":sex,
   "sab":sab,
   "dom":dom,
   "active":isActive,
   "isPT":isPT
	}

	AdicionarClienteService.AdicionarCliente(data)
	.then(function(response){
		$scope.ActualizarListaDeUsers();
	},function(response){
		alert("meps");
		console.log(response);
	});	

	
}

 $scope.showConfirm = function(ev) {
    // Appending dialog to document.body to cover sidenav in docs app
    var confirm = $mdDialog.confirm()
          .title('Deseja Remover '+$scope.clienteSelecionado['nome']+' da Base de Dados ?')
          .content('O Cliente será apagado definitivamente')
          .ariaLabel('Apagar Cliente')
          .targetEvent(ev)
          .ok('Apagar')
          .cancel('Cancelar');
    $mdDialog.show(confirm).then(function() {
      $scope.removerCliente();
    }, function() {
    });
  };

$scope.removerCliente = function(){
	RemoverClienteService.RemoverCliente($scope.clienteSelecionado['numSocio'])
	.then(function(response){
		$scope.ActualizarListaDeUsers();
	},function(response){
		alert("meps");
		console.log(response);
	});	
}


 $scope.showAdvanced = function(ev,string) {
 	if(string=='local'){
    $mdDialog.show({
      controller: 'LocalizacaoController',
      templateUrl: 'html/localizacao.html',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose:true
    })
    .then(function(answer) {
      $scope.status = 'You said the information was "' + answer + '".';
    }, function() {
      $scope.status = 'You cancelled the dialog.';
    });
	}
	else{
    $mdDialog.show({
      controller: 'LocalizacaoController',
      templateUrl: 'html/redesSociais.html',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose:true
    })
    .then(function(answer) {
      $scope.status = 'You said the information was "' + answer + '".';
    }, function() {
      $scope.status = 'You cancelled the dialog.';
    });
	}
  };
 
 $scope.produzTextoTreino = function(ev) {
    var res = [];
    var res2 = [];
    for (var i = 0; i < $scope.diasDaSemana.length; i++) {
    	if($scope.diasDaSemana[i]['treino']==true)
    		res.push($scope.diasDaSemana[i]['dia']);
    	else
    		res2.push($scope.diasDaSemana[i]['dia']);
    }
    if(res.length==$scope.diasDaSemana.length)
    	return "Todos os dias";
    if(res.length==0)
    	return "Nenhum Dia";
    if(res.length==1)
    	return ("Apenas "+res[0]);
    if(res.length==2)
    	return ("Apenas "+res[0]+ " e " + res[1]);
    if(res.length==6)
    	return ("Todos os dias excepto "+res2[0]);
    if(res.length==5)
    	return ("Todos os dias excepto "+res2[0]+" e " +res2[1]);
    else
    	return res.toString();
  };
});

