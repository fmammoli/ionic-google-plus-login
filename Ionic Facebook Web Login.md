# Ionic Facebook Web Login

Agora vamos fazer o login web para o facebook.
Usando o projeto anterior, vamos definir a funcao de login para o facebook e mostrar alguns dados do usuario na tela.

Para simplificar vamos usar a lib [angular-facebook](https://github.com/Ciul/angular-facebook)
. Vamos instalar a lib:
```sh
$ bower install angular-facebook --save
```
Adicione o `script` no `index.html`: 
```html
<script src="lib/angular-facebook/lib/angular-facebook.js" type="text/javascript"></script>
```
E adicione o modulo como dependencia do nosso modulo principal:
```
angular.module('starter', ['ionic','facebook'])
```
Agora vamos configurar a API no [Portal do Desenvolvedor do Facebook](https://developers.facebook.com/).

No menu superior clique em **myApps** e depois em **Add a new App**, escolha **SITE** no menu que vai abrir e coloque um nome para a sua aplicacao, eu achei de SocialLoginTutorial. Escolha uma categoria, eu escolhi **Diversao** e depois confirme.

Podemos pular direto para o **App Configuration** e colocar no nos campos a url `http://localhost:8100`.

Entre na dashboard do nosso novo projeto e copie o **AppID**, vamos usa-lo depois. Entre na opcao **Settings** e preencha o **Contact Email** e depois em **Advanced** e em **Valid OAuth redirect URIs** coloque a url `http://localhost:8100` e salve as alteracoes.

Entre na opcao **Status and Review** e ative o seu app clicando no toggle button.

Voltando ao codigo, no `app.js` vamos configurar o provider do service.
```js
.config(['FacebookProvider',function(FacebookProvider) {
  FacebookProvider.init('YOUR_APP_ID');
}])
```
Coloque o `APP_ID` que voce copiou no `YOUR_APP_ID`.

Agora vamos colocar o codigo para fazer login, no `LoginCtrl` vamos adicionar o metodo de facebook login no `$scope`.
```js
.controller('LoginCtrl', function ($scope, Facebook) {
  $scope.facebookLogin = function () {
    Facebook.login(function (response) {
      Facebook.api('/me', function (me) {
        $scope.user = me;  
      });
    });
  }
})
```
A funcao `Facebook.login` faz o processo de login e retorna um token de acesso, para buscarmos os dados do usuario podemos usar `Facebook.api('/me')` que retornara os dados publicos do usuario no callback.

### Logout
Para o logout podemos usar a funcao `Facebook.logout()` da lib.
```sh
$scope.logout = function () {
    Facebook.logout();
  }
```

Pronto temos um login web do facebook funcionando.
