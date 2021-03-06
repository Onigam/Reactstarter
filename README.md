# ReactStarter

Il s'agit ici d'un tuto pour mettre en place un environnement **React** **Redux** **Webpack**.

Le but du tuto est d'écrire de A à Z une application single page pouvant récupèrer la liste des évènements eventful 
pour une zone géographique donnée, l'application affichera sous forme de liste les événements contenu dans cette zone.

On va voir ici comment:
* Mettre en place un projet React depuis le début et mettre en place son environnement de dev avec babel et webpack.
* Créer des composants `React`.
* Router différentes pages avec react-router.
* Gèrer les données avec [Redux](http://redux.js.org/) 
* Faire du css modulaire avec `postcss`.
* Mettre en place un processus de test.
* Afficher un newsfeed (basé sur l'api [eventful](http://eventful.com))


## Table des matières
* Installation de l'environnement.
 * Un mot sur les dépendances
 * Babel
 * webpack
 * React
 * Création du point d'entrée `app.js`
 * Démo: Basic app.js
 * Mise en place de react-router
 * postcss
 * Les modules CSS
 * Configuration des environnements multiples
* La gestion des routes
 * A venir...
* Affichage d'un newsfeed
 * Récupèration des données eventfull.
 * Le style avec [material ui](http://www.material-ui.com/#/)

## Installation de l'environnement

Une des parties les plus douloureuses dans la construction d' une application React est la mise en place de l'environement. Nous allons construire notre application en selectionnant quelques outils  utiles qui vont nous faciliter le developpement ainsi que le processus de mise en production.

Ici nous allons tout installer directement, cela devrait donner une bonne idée sur la façon de démarrer un nouveau projet à partir de zéro.
Nous allons utiliser certaines fonctions JavaScript ES6, les modules inline css, les modules de chargement asynchrone, définir une stratégie de test et plus encore. Nous allons utiliser `webpack` pour sa facilité de mise en œuvre avec `babel` comme transpileur, ainsi que quelques autres fonctions pratiques qu'il fournit.

> Assurez vous que vous avez `node.js` et `npm` d'installés.

Nous allons créer un nouveau projet racine que l'on va appeler ici ReactStarter. Ouvrez un terminal et créer le début de notre structure de dossiers:

    $ mkdir ReactStarter && cd ReactStarter
    $ mkdir -p src/{components,containers,styles,utils,views}\
        && touch webpack.config.js

Dans le même répertoire, nous allons créer le projet racine en utilisant la commande d'initialisation npm. Une fois l'initialisation terminée, nous aurons un package.json dans le même répertoire ce qui permettra de définir un processus reproductible pour la construction de l'application.

    npm init

Nous aurons besoin de quelques dépendances pour commencer.

## Un mot sur les dépendances

Avant de commencer à construire notre application, nous allons mettre en place notre chaine de build avec webpack et babel.

## Babel

Babel est un transpileur JavaScript qui nous permet d'utiliser les fonctionnalité ES2015 dans nos developpements.

    npm install --save-dev babel-core babel-preset-es2015 babel-preset-react babel-preset-react-hmre babel-preset-stage-0

Nous avons ensuite besoin de configurer `babel` pour notre application. Ceci passe par l'édition d'un fichier appelé `.babelrc` à la racine du projet (même endroit que `package.json`).

    $ touch .babelrc

On va rajouter quelques préréglages afin d'utiliser babel avec React et pour pouvoir utiliser le rechargement à chaud des modules js

    {
      "presets": ["es2015", "stage-0", "react"]
    }

Babel nous permet de configurer différentes options pour différents environnements d'exploitation à l' aide de la clé `env` dans l'objet de configuration babel. Nous allons inclure le `babel-hmre` preset uniquement pour notre environnement de développement (donc l'environnement de prod n'aura pas le rechargement à chaud des modules js).

    {
        "presets" :  [ "es2015" , "stade-0" , "react" ] ,
        "env" :  {
            "development" :  {
              "presets" :  [ "react-hmre" ]
            }
        }
    }

## Webpack

La mise en place de webpack peut être un peu complexe, surtout si l'on n'a pas de modèle sur lequel s'appuyer, mais pas de panique nous allons construire notre configuration webpack avec l'aide d'un outil de démarrage webpack très pratique appelé [hjs-webpack](https://github.com/HenrikJoreteg/hjs-webpack).
hjs-webpack met en place des loaders pour les environnements de développement et de production avec du rechargement à chaud, de l'obfuscation, du support ES6, etc.

Commencons par installer les dépendances webpack et hjs-webpack:

    $ npm install --save-dev hjs-webpack webpack

Webpack est un peu inutile sans ses "loaders" et sans configuration, installons maintenant les loaders dont nous aurons besoin tels que le babel-loader, le loader de style css, le loader de fichier ainsi qu'un loader d'url (pour le chargement des  fonts cela est déjà gèré par hjs-webpack).

    $ npm install --save-dev babel-loader css-loader style-loader postcss-loader url-loader file-loader

Dans `webpack.config.js` on va configurer notre module webpack. Pour démarrer on va inclure ces modules:

    const webpack = require('webpack');
    const fs      = require('fs');
    const path    = require('path'),
          join    = path.join,
          resolve = path.resolve;

    const getConfig = require('hjs-webpack');

le module hjs-webpack exporte une unique fonction qui prend un seul argument, il s'agit
d'un objet de configuration simple qui sert à construire la configuration webpack.
Cet objet ne requière que deux clés:

* in - un unique fichier d'entrée. babel sera capable de resoudre l'arbre des dépende
* out - le chemin du répertoire où seront générés les fichiers.


    var config = getConfig({
      in: join(__dirname, 'src/app.js'),
      out: join(__dirname, 'dist')
    })

hjs-webpack contient une option appellée `clearBeforeBuild` dont l'on va se servir
et qui sert a supprimer tous les fichiers ayant été créé lors d'un précédent build
avant de démarrer le nouveau.

    var config = getConfig({
      in: join(__dirname, 'src/app.js'),
      out: join(__dirname, 'dist'),
      clearBeforeBuild: true
    })

On va ajouter quelques variables pour identifier le chemins des sources, des modules node et du repertoire de build.

    const root    = resolve(__dirname);
    const src     = join(root, 'src');
    const modules = join(root, 'node_modules');
    const dest    = join(root, 'dist');

    var config = getConfig({
      in: join(src, 'app.js'),
      out: dest,
      clearBeforeBuild: true
    })

hjs-webpack identifie les config d'environnements (dev et prod) en utilisant la valeur du premier paramètre de commande process.argv[1], mais il est aussi possible de définir une variable d'environnement et de s'en servir a la place.
On va utiliser la valeur `isDev` dans notre config, et on positionnera cette valeur en fonction
de la valeur de notre variable d'environnement `NODE_ENV`, on utilisera la valeur `developpement` pour l'environnement de dev:

    const NODE_ENV = process.env.NODE_ENV;
    const isDev = NODE_ENV === 'development';

    var config = getConfig({
      isDev: isDev,
      in: join(src, 'app.js'),
      out: dest,
      clearBeforeBuild: true
    })

Webpack attend que l'on export un objet de configuration du fichier webpack.config.js
On peut exporter notre config de la manière suivante:

    // ...
    var config = getConfig({
      // ...
    })

    module.exports = config;

Passons maintenant au chose sérieuse en commençant à build notre application.

## React

Tout d'abord installons les dépendances react

    $ npm install --save react react-dom

Intallons maintenant `react-router` qui va nous permettre de gèrer les différentes routes de notre application

    $ npm install --save react-router

## Le point d'entrée de notre application `app.js`

On ne peut commencer à construire notre application sans point d'entrée (que l'on a déjà spécifié dans notre config webpack plus haut). On reviendra plus tard sur ce point en définissant un conteneur d'application, mais commençons par tester notre process de build avec ce point d'entrée.

Créons d'abord `app.js`

    $ touch src/app.js

Dans ce fichier on va créer un conteneur React qui va contenir un simple composant affichant du texte. On inclus d'abord nos dépendance React puis on définit l'objet App:

    import React from 'react'
    import ReactDOM from 'react-dom'

    const App = React.createClass({
      render: function() {
        return (<div>Text text text</div>);
      }
    });

On a besoin ensuite de monter le composant `<App />`, il faut pour cela trouver un noeud DOM pour effectuer ce montage, `hjs-webpack` contient un index.html minimaliste et est capable d'en génèrer un custo (en utilisant la clé `html` dans l'objet de configuration), dans notre cas le index.html par défaut suffira. Le template par défaut contient un noeud `<div />` avec un id `root` qui peut servir pour le cas d'une SPA (Single Page Application). Récupèrons ce noeud d'id `root` pour y injecter notre composant React `<App />`:

    import React from 'react'
    import ReactDOM from 'react-dom'

    const App = React.createClass({
      render: function() {
        return (<div>React Starter</div>)
      }
    });

    const mountNode = document.querySelector('#root');
    ReactDOM.render(<App />, mountNode);

Une fois cela fait nous pouvons démarrer notre serveur et afficher notre application, hjs-webpack est installé par défaut dans le répertoire `node_modules`, on peut démarrer le serveur de la manière suivante:

    $ NODE_ENV=development ./node_modules/.bin/hjs-dev-server

il est en général préférable de définir explicitement l'environnement comme on le fait ici.
Pour simplifier le lancement du server mettons un raccourcie dans la liste de scripts npm:

    "scripts": {
      //...
      "start": "NODE_ENV=development ./node_modules/.bin/hjs-dev-server",
      "start-windows": "set NODE_ENV=development&&.\\node_modules\\.bin\\hjs-dev-server"
    },

On peu ensuite lancer le serveur de cette manière:

    $ npm start

  A noter que j'ai rajouté une commande `start-windows` spécialement pour les utilisateurs windows a ce moment la utilisé
  la commande `npm run-script start-windows` au lieu de `npm start`

  Si tous ce passe bien vous devriez avoir dans votre console:

    $ npm start

    > react-starter@1.0.0 start /Users/castr/Dev/ReactStarter
    > NODE_ENV=development ./node_modules/.bin/hjs-dev-server

    Listening at http://localhost:3000
