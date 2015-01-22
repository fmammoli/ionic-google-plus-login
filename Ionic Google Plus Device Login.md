# Google Plus Login no Android usando Ionic
Essa eh a parte 3, comece pela parte 1 e depois a parte 2.

Nesse tutorial vamos adicionar o login nativo do google plus no nosso projeto. O login nativo eh a forma padrao de fazer social login em aplicacoes do android.

Para isso vamos precisar instalar um plugin do cordova e configurar o nosso cliente de login para andorid. Vamos la.

Montando um projeto Android. Para criar a estrutura do projeto vamos usar a ionic-cli.
```sh
$ ionic platform add android
```
Isso vai baixar o `Cordova para Android` e montar o projeto android dentro da pasta platforms.

Agora podemos buildar nosso projeto para `Android`.
```sh
$ ionic build android
```

Agora vamos instalar o plugin para usar a interface nativa do google plus, vamos intalar o plugin [Cordova-Plugin-Googleplus](https://github.com/EddyVerbruggen/cordova-plugin-googleplus).
```
$ ionic plugin add nl.x-services.plugins.googleplus
$ ionic prepare
```
Isso vai baixar, installar e configurar o plugin para o nosso projeto.

Agora vamos adaptar o nosso controller para que ele verifique se estamos no ambiente do `Cordova` ou no `Browser` e execute a acao devida.

```
$scope.googlePlusLogin = function () {
    if (ionic.Platform.isWebView()){
      // Usando o plugin do cordova para fazer login
      window.plugin.googleplus.login({
        'iOSApiKey':'YOUR_KEY_HERE'
      },
      function (user) {
        $scope.user = user;
      },
      function (err) {
        console.log('Erro: '+err);
      });
    } else {
      // Usando a lib do angular para fazer login
      GooglePlus.login().then(function (res) {
        GooglePlus.getUser().then(function (user) {
          $scope.user = user;
        });
      }, function (err) {
        console.log(err)
      });  
    }
  }
```

`ionic.Platform.isWebView` vai checar se estamos rodando em uma webview e se temos acessos aos plugins. Caso estejamos num abiente `Cordova` vamos executar o login do plugin. Para fazer o login no iOS precisamos passar a chava no `YOUR_KEY_HERE`, para o android nao precisa. 

Agora que temos o codigo, vamos voltar ao [Google API Console](console.developers.google.com) e adicionar uma permissao para devices android.

Entre no nosso projeto e clique em **Credenciais** em **API e Autenticacoes** no menu. Na parte **OAuth** clique em **Criar novo id do Cliente**.

No **Tipo de Aplicativo** escolha **Aplicativo Instalado** e no **Tipo de Aplicativo Instalado** escolha **Android**.

Colo o nome do pacote, o nome do pacote pode ser econtrado no arquivo `config.xml` logo no comeco do arquivo: 
```xml
<widget id="com.ionicframework.sociallogin371525" version="0.0.1" xmlns="http://www.w3.org/ns/widgets" xmlns:cdv="http://cordova.apache.org/ns/1.0">
```
Neste caso o nosso pacote eh o valor do attributo id, ou seja `com.ionicframework.sociallogin371525`. Vamos colocar esse valor no **Nome do Pacote**.

Para obtermos a **IMPRESSÃO DIGITAL PARA CERTIFICAÇÃO DE ASSINATURA (SHA1)** precisaremos rodar o `keytool` no terminal.
```
$ keytool -exportcert -alias androiddebugkey -keystore path-to-debug-or-production-keystore -list -v
```
O Path para o debug keystore eh normalmente `~/.android/debug.keystore` e senha eh normalmente `android`.

Ao rodar isso no terminal vai aprecer um monte de coisa, copies o valor do `SHA1: XX:XX:XX:XX...`  e cole no campo  **IMPRESSÃO DIGITAL PARA CERTIFICAÇÃO DE ASSINATURA (SHA1)**.

Agora clique em salvar e pronto, configuramos o login do google plus para o Android. 

*Vale observar que o o app so vai fazer o login se buildarmos por esse computador, pq cada computador tem uma key de desenvolvimento diferente. Entao se for desenvolver em mais de um pc, voce precisa adicionar mais chaves na **IMPRESSÃO DIGITAL PARA CERTIFICAÇÃO DE ASSINATURA (SHA1)**. *

Para o iOS, copie o campo **ID DO CLIENTE** e cole no `YOUR_KEY_HERE`.

Pronto, agora voce pode rodar no android:
```
$ ionic run android
```

E fazer o login clicando no botton Google Plus Login.
*Vale lembrar que voce precisa ter o app do google plus intalado no device, eu acho.*

### Logout

Temos q fazer o logout tbm, para isso eh so usarmos a funcao `disconnect` e verificar se estamos no `Browser` ou na `WebView`.
```js
$scope.logout = function () {
    if (ionic.Platform.isWebView()){
      window.plugins.googleplus.disconnect(function (msg) {
        $scope.user = null;
      })  
    } else {
      gapi.auth.signOut(); 
      $scope.user = null;
    }
  }
```

Sem duvida, o melhor seria montar uma `Factory` que encapsulasse essa logica do login e oferecesse uma API unificada para o login tanto na web quando no device, mas aqui eh so um exemplo.

No proximo, vamos fazer login com o facebook na web.

















