# ReactStarter
Based on this [article](https://www.fullstackreact.com/articles/react-tutorial-cloning-yelp/#a-word-on-dependencies)

Il s'agit ici d'un tuto pour mettre en place un environnement **React** avec **Webpack**.

On va voir ici comment:
* Mettre en place un projet React depuis le début.
* Créer des composants `React`.
* Faire du css modulaire avec `postcss`.
* Mettre en place un processus de test.
* Router différentes pages avec react-router.
* Afficher un newsfeed (basé sur l'api [eventful](http://eventful.com))


## Table des matières
* Installation de l'environnement.
 * Un mot sur les dépendances
 * Babel
 * webpack
 * React
 * Création du point d'entrée `app.js`
 * Démo: Basic app.js
 * postcss
 * Les modules CSS
 * Configuration des environnements multiples
* La gestion des routes
 * A venir...
* Affichage d'un newsfeed
 * A venir

## Installation de l'environnement

Une des parties les plus douloureuses de la construction d' une application React est la construction du boilerplate. Nous allons construire notre application en selectionnant quelques outils  utiles qui vont nous faciliter le developpement ainsi que le processus de la mise en production.

Dans ce post, nous allons tout installer directement, cela devrait donner une bonne idée sur la façon de démarrer un nouveau projet à partir de zéro.
Nous allons utiliser certaines fonctions JavaScript ES6, les modules inline css, les module de chargement asynchrone, effectuer des tests, et plus encore. Nous allons utiliser `webpack` pour sa facilité de mise en œuvre avec `babel` comme transpileur, ainsi que quelques autres fonctions pratiques qu'il fournit.

> Assurez vous que vous avez `node.js` et `npm` d'installés.

Nous allons créer un nouveau projet racine que l'on va appeler ici ReactStarter. Ouvrez un terminal et créer le début de notre structure de dossiers:

    $ mkdir ReactStarter && cd ReactStarter
    $ mkdir -p src/{components,containers,styles,utils,views}\
        && touch webpack.config.js

Dans le même répertoire, nous allons créer le projet racine en utilisant la commande d'initialisation npm. Une fois l'initialisation terminée, nous aurons un package.json dans le même répertoire, ce qui permettra de définir un processus reproductible pour la construction de l'application.

    npm init

Nous aurons besoin de quelques dépendances pour commencer.

## Un mot sur les dépendances

Avant de commencer à construire notre application, nous allons mettre en place la chaine de build.

## Babel

Babel est un transpileur JavaScript qui nous permet d'utiliser les fonctionnalité ES2015 dans nos developpements.

    npm install --save-dev babel-core babel-preset-es2015 babel-preset-réagir babel-preset-réaction-hmre babel-preset-stage-0

Nous avons ensuite besoin de configurer `babel` pour notre application. Ceci passe par l'édition d'un fichier appelé `.babelrc` à la racine du projet (même endroit que `package.json`).

    $ touch .babelrc

On va rajouter quelques préréglages afin d'utiliser babel avec React et pour pouvoir utiliser le rechargement à chaud des modules js

    {
      "presets": ["es2015", "stage-0", "react"]
    }

Babel nous permet de configurer différentes options pour différents environnements d'exploitation à l' aide de la clé `env` dans l'objet de configuration babel. Nous allons inclure le `babel-hmre` preset uniquement pour notre environnement de développement (donc l'environnement de prod n'aura pas le rechargement à chaud des modules js).   

    {
        "Presets" :  [ "es2015" , "stade-0" , "react" ] ,
        "env" :  {
            "développement" :  {
              "presets" :  [ "react-hmre" ]
            }
        }
    }
