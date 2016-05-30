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

> Afin de suivre ce processus, assurez vous que vous avez `node.js` et `npm` d'installés.

Nous allons créer un nouveau projet racine que l'on va appeler ici ReactStarter. Ouvrez un terminal et créer le début de notre structure de dossiers:

    $ mkdir ReactStarter && cd $_
    $ mkdir -p src/{components,containers,styles,utils,views}\
        && touch webpack.config.js
