# Ionic Cordova Facebook Login

Agora vamos crair o facebook login para o android.
Primeiro vamos setar as configuracoes no [Facebook Dev](https://developers.facebook.com).

 - Clique no **Getting Started** e escolha **Android**. 
 - Siga para a parte **Tell us about your Android project** e preecha os campos. Voce pode encontrar essas infos no `platforms/android/AndroidManifest.xml`
    - **Package Name**: com.ionicframework.sociallogin371525
    - **Default Activity Class Name**: com.ionicframework.sociallogin371525.CordovaApp

- Clique **Avancar**
- Rode o no terminal: 
 ```sh
$ keytool -exportcert -alias androiddebugkey -keystore ~/.android/debug.keystore | openssl sha1 -binary | openssl base64
```
    - A senha normalmente eh `android`
    - Copie o resultado e cole no campo **Development Key Hashes**
 
- Clique **Avancar** e volte para a **Dashboard** do projeto.

Agora vamos fazer a logica no nosso app. Para simplificar vamos usar o Plugin do Cordova [Facebook Login](https://github.com/Wizcorp/phonegap-facebook-plugin). Para instalar o plugin temos que ter em maos algumas infos do Facebook Dev. Precisamos ter o APP_ID e o APP_NAME.
```sh
$ ionic plugin add com.phonegap.plugins.facebookconnect --variable APP_ID="YOUR_APP_ID" --variable APP_NAME="YOUR_APP_NAME"
```

O comando ira instalar o plugin de login com facebook.

Agora rode o build 
```
$ ionic build android
```

Caso aconteca algum erro, va na pasta `platforms/android`, rode `ant clean`, volte a raiz do projeto e rode `ionic build android`.

Caso o erro persista, entre na pasta `platforms/android/com.phonegap.plugins.facebookconnect/bin/res` e delete a pasta `crunch`. Nao tem problema deletar ela nao deveria estar ai.

Agora vamos montar a logica de login:
```js
.controller('LoginCtrl', function ($scope, $ionicPlatform) {
  $scope.facebookLogin = function () {
    facebookConnectPlugin.login(["public_profile"],
      function (res) {
        facebookConnectPlugin.api('/me', ['public_profile'],
          function (user) {
            $scope.user = user;
          }
        );
    });
  }  
})
```
A funcao `$scope.facebookLogin` vai executar a funcao `login` e o callback de sucesso vai receber a chave para conectar na **Graph API**. Ao termos a chave buscamos os dados publicos do usuario usando a funcao `api` passando o `/me`. O callback de sucesso retorna os dados publicos do usuario e colocamos ele na variavel no `$scope` para mostrarmos na view.

## Logout
Vamos fazer a logica de logout. Para isso vamos usar a funcao `$scope.logout`
```js
$scope.logout = function () {
    facebookConnectPlugin.logout(function (res) {
      alert('Logged out!');
    });
}
```

Pronto, agora voce tem login e logut do facebook nativo no android!