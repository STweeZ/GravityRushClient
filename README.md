# TachesFront

## Installation de material

Nous allons utiliser la librairie [material](https://v8.material.angular.io/). pour cela nous allons utiliser la commande suivante :

```
  ng add @angular/material
```

### Problème de version du paquetage
Il faut utiliser la bonne version du paquetage. Si par exemple vous utilisez la version 7 d'angular, il faut utiliser la version 7.x de material.

Pour connaître le numéro de la bonne version, il faut utiliser la commande 

```bash
npm show @angular/material versions
```

et repérer la dernière version en relation avec la version d'angular. A l'heure ou ces lignes sont écrites, il faut utiliser la version `7.3.7` pour angular 7.

Pour angular 7 on utilisera la commande : 

```
  ng add @angular/material@7.3.7
```

## Installation du paquetage flex-layout

Le paquetage flex-layout permet d'utiliser des directives de placement des composants qui utilisent flex de CSS.

Comme dans le paquetage précédent, il faut utiliser la bonne version.

Pour angular 7 on utilisera la commande : 

```
  npm -i -s  @angular/flex-layout@7.0.0-beta.24
```

### Paquetages complémentaires

Pour faciliter la communication avec l'utilisateur et uploader des fichiers à l'aide d'un dragAndDrop, nous allons ajouter 
deux nouveaux paquetages :

```
  npm i -s  ngx-toastr
  npm i -s ngx-material-file-input
```


## Les défis de cette application

Accès au back-end de l'application `taches-api-passport`. On veut pouvoir :

-   créer un nouveau utilisateur
-   se connecter
-   afficher la liste des personnes
-   afficher une personne
-   modifier une personne
-   supprimer une personne

Cela implique de savoir :

-   faire un accès distant à un serveur
-   gérer la connexion avec le serveur (identification)
-   créer des formulaires 
-   uploader une image (avatar)
