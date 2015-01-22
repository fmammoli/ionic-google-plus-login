# Social Login no Cordova com Ionic
## Google Plus Web Login
Vamos fazer um app híbirdo que tenha Social Login do Facebook e do Google Plus usando a stack, Cordova, Angular e Ionic.

Como o cordova é normalmente desenvolvido utilizando o Browser, que é uma ótima ambiente de desenvolvimento, é interessante que o Social Login funcione tanto no device, de forma nativa, e no browser.

Para isso precisamos desenvolver as duas formas de login e configurar as apis necessárias tanto no Google Developer Console quanto no Facebook Developer.

Considerando que o abiente ja esteja intalado.

Vamos começar criando um app Ionic vazio que vai conter a nossa aplicação.
Para criar o projeto vamos usar a CLI do Ionic que simplifica diversas operações:

``` sh
$ ionic start SocialLogin blank
```
O comando `ionic start`  usa dois argumento, o nome do projeto e o template que você quiser usar, existem vários templates, de side-menus, tabs e etc. Aqui iremos usar o `blank` que é o mais simples.

Esse comando irá baixar todas as dependências do projeto e criar um projeto com diversas pastas e arquivos.
Vamos trabalhar principalmente com arquivos na pasta `/www`.

Vamos começar colocando dois `buttons` na tela, um para o facebook e um para o google plus.
no arquivo `www/index.html` vamos adicionar os bottons dentro da tag `<ion-content>`.

```sh
<ion-content>
        <div class="text-center">
          <button class="button button-outline button-positive">Facebook</button>
          <button class="button button-outline button-assertive">Google Plus</button>
        </div>
      </ion-content>
```
Para que o click do botão execute alguma acao podemos usar o attribute `ng-click` do Angular nos buttons.

Button Facebook:
```sh
<button class="button button-outline button-positive" ng-click="facebookLogin()">Facebook</button>
```
Button Google Plus:
```sh
<button class="button button-outline button-assertive" ng-click="googlePlusLogin()">Google Plus</button>
```
Para que as functions definidas no ng-click sejam executadas temos que associa-las ao `$scope` de um controller.
Vamos entao criar um `controller` para lidar com o click dos buttons.

No arquivo `www/js/app.js` vamos criar um controller.
```js
.controller('LoginCtrl', function ($scope) {
  $scope.facebookLogin = function () {
    alert('Facebook Login');
  }
  $scope.googlePlusLogin = function () {
    alert('Google Plus Login');
  }
})
```
Para que o as functions no `ng-click` sejam direcionadas para o `LoginCtrl` temos que explicitar onde o controller será responsável. Podemos adicional o attribute `ng-controller="LoginCtrl"` na `<ion-content>`.

```
<ion-content ng-controller="LoginCtrl">
    
<\ion-content>
```
Isso fara com que tudo dentro da tag content seja controlado pelo `LoginCtrl`.

Ao Clicar em cada `button` um alert deve aparecer.

## Web Login 

Os social logins precisam ser configurados nos portais do desenvolvedor de cada provedor. Vamos comecar pelo Google Plus.

## Google Plus Login

Para simplificar o processo de login na web vamos usar a biblioteca `angular-google-plus`, ela encapsula o flow de requiscoes para que seja efetuado o login e oferece algumas funcoes uteis para pegar alguns dados do usuario. Vamos adicionar a biblioteca pelo `bower`, entao podemos executar o comando:
```sh
$ bower install angular-google-plus --save
```
ou
```sh
$ ionic add angular-google-plus
```
Cheque se a biblioteca foi adicionada no `index.html`, caso ela nao esteja listada adicione a tag `script` abaixo depois fechar o `body`. 
```
<script src="lib/angular-google-plus/dist/angular-google-plus.js" type="text/javascript"></script>
```
Caso aparece algum problema de versao, vale lembrar que estamos usando o `angular 1.3.6` entao e so escolher a opcao que diz que vai ser usado o `angular 1.3.6`.
A linha acima vai baixar a biblioteca e o `--save` vai adiciona-la no seu `bower.json`.

Podemos agora adicionar a nova biblioteca como dependencia do nosso modulo. Neste caso estamos apenas usando o modulo principal o  `starter`. Vamos entao no arquivo `www/js/app.js` e na na linha de definicao do modulo vamos adicionar a nossa nova lib.

```js
angular.module('starter', ['ionic', 'googleplus'])
```

Essa linha diz que o modulo `starter` depende dos modulos `ionic` `googleplus`.

Agora vamos configurar o modulo. Ainda no `app.js` vamos criar uma etapa de config conde vamos configurar as chaves de acesso ao servico do google plus.

```js
app.config(['GooglePlusProvider', function(GooglePlusProvider) {
     GooglePlusProvider.init({
        clientId: 'YOUR_CLIENT_ID',
        apiKey: 'YOUR_API_KEY'
     });
}])
```
Veja que precisamos de duas chaves para realizar o login, essas duas chaves sao definidas no [Google API console](https://console.developers.google.com/).

No portal devemos criar um novo projeto e setar as apis do google plus. Para isso, entre na opcao `projetos` do menu, depois no botao Criar Projeto. Ai eh so preencher os campos.
   
No nome do projeto coloque `SocialLogin` e no id do projeto `social-login-tutorial`, aceite os termos de uso e clique em Criar.
Depois de criado, entre na opcao APIs dentro de API e Autenticacao no menu.

Procure pela API do Google+ e ative-a, agora vamos criar nosso cliente de login. Entre na opcao **Credenciais** do menu. E  na parte de OAuth clique em **Criar um novo ID do cliente**.

No popup escolha a opcao **Aplicativo da Web** e clique em **Configurar Tela de Consentimento**. Coloque seu email e o nome que voce quiser, coloquei `Social Login Tutorial` e depois clique em salvar.

Agora vamos configurar os dominios autorizados a fazer o uso desse service. No campo **ORIGENS JAVASCRIPT AUTORIZADAS** vamos colocar o endereco que a nossa aplicacao vai rodar no browser, como o ionic-cli roda nossa aplicacao no `http://localhost:8100/` vamos colocar exatamente esse endereco.

No campo **URIS DE REDIRECIONAMENTO AUTORIZADOS** vamos clocar o mesmo endereco `http://localhost:8100/`, pois o nosso app nao usa nenhuma URI de redirecionamento. 

Agora clique em `Criar id do cliente`.
##Eh muito importante que a barra ao final seja colocada explicitamente no campos *ORIGENS JAVASCRIPT AUTORIZADAS* *URIS DE REDIRECIONAMENTO AUTORIZADOS* se voce nao colocar vai dar merda!!!!!!!!

Agora voce pode copiar o valor do campo **ID do Cliente** e colar no `YOUR_CLIENT_ID` e o campo **CHAVE SECRETA DO CLIENT** no `YOUR_API_KEY`.

Agora que temos as chaves configuradas podemos usar o servico do `angular-google-plus` para realizar nosso login. Para isso vamos injetar o `GooglePlus` no nosso controller e usar suas funcoes de login.

```js
.controller('LoginCtrl', function ($scope, GooglePlus) {
  $scope.facebookLogin = function () {
    alert('Facebook Login');
  }

  $scope.googlePlusLogin = function () {
    GooglePlus.login().then(function (res) {
      console.log(res)
    }, function (err) {
      console.log(err)
    });
  }
})
```
Rorde o app usando o ionic:
```sh
$ ionic server
```
Ao clicar no botao de login com o Gooogle Plus a janela de consenso vai abrir e ao aceitar voce vera no log do consle que recebemos um objeto de resposta que contem o token e diversas outras informacoes, porem nao tem nenhuma informacao do perfil do usuario. 

Para termos os dados do usuario precisamos busca-los explicitamente, a lib nos ajuda oferecendo uma funcao `GooglePlus.getUser()`, podemos usar essa funcao apos o sucesso do login e entao teremos acesso aos dados basicos do usuario.

```sh
.controller('LoginCtrl', function ($scope, GooglePlus) {
  $scope.facebookLogin = function () {
    alert('Facebook Login');
  }

  $scope.googlePlusLogin = function () {
    GooglePlus.login().then(function (res) {
      GooglePlus.getUser().then(function (user) {
        console.log(user);
      });
    }, function (err) {
      console.log(err)
    });
  }
})
```
Agora sim, se olharmos no console teremos um objeto que contem diversos dados sobre o usuario, incluindo nome, link. picture e etc. Podemos entao salvar esse usuario em uma variavel e mostrar esses dados no html. 
No controller: 
```js
$scope.googlePlusLogin = function () {
    GooglePlus.login().then(function (res) {
      GooglePlus.getUser().then(function (user) {
        $scope.user = user;
      });

    }, function (err) {
      console.log(err)
    })
  }
```
E no index.html
```html
<ion-content ng-controller="LoginCtrl">
        <div class="text-center">
          <button class="button button-outline button-positive" ng-click="facebookLogin()">Facebook</button>
          <button class="button button-outline button-assertive" ng-click="googlePlusLogin()">Google Plus</button>
        </div>
        {{user}}
      </ion-content>
```

## Logout
Vamos agora configurar o logout, pq nao adicanta nada criar login e nao criar logout.

Vamos comecar adicionando um `button` de logout
```html
<button class="button button-outline" ng-click="logout()">Logout</button>
```

E criar a funcao de logout no `controller`
```js
$scope.logout = function () {
    gapi.auth.signOut();
    $scope.user = null;
  }
```
Como a lib nao possui uma funcao de logout precisamos usar a api do gogole plus diretamente, `gapi.auth.signOut()` faz o logout de forma simple e o `$scope.user = null` apaga os dados do usuario.

Pronto!
### O proximo eh o login google plus no device!