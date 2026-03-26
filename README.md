# Poker Simulator - TDD Exam

Projet de simulation de main de poker réalisé avec Vitest TypeScript.

## Approche TDD

Le développement a suivi un cycle strict :
1. **Red** : Écriture de tests pour chaque catégorie de main et règle de tie-break.
2. **Green** : Implémentation minimale pour faire passer les tests.
3. **Refactor** : Optimisation du code (détecteurs, utilitaires de tri) tout en restant "vert".

## Documentation

### 1. Hypothèses sur la validité des entrées
* **Absence de doublons** : Le système assume qu'il n'y a pas de cartes en double dans les entrées fournies (jeu de 52 cartes standard).
* **Cartes par joueur** : Chaque joueur possède exactement 2 cartes et partage 5 cartes avec le board.
* **Format** : Les cartes sont représentées par leur rang et leur couleur.

### 2. Ordre de tri du `chosen5`
Pour garantir le déterminisme des tests et respecter la logique de tie-break, le tableau `chosen5` (les 5 meilleures cartes retenues) est trié par **ordre d'importance** pour la catégorie concernée :
* **Straight / Straight Flush** : Ordre décroissant de la suite (ex: 5-4-3-2-A pour une "wheel").
* **Four of a Kind** : Les 4 cartes de même rang d'abord, suivies du kicker.
* **Full House** : Le brelan d'abord, puis la paire.
* **Two Pair** : Paire la plus haute, paire la plus basse, puis le kicker.
* **Three of a Kind / One Pair** : Le groupe identique d'abord, puis les kickers par ordre décroissant.
* **Flush / High Card** : Les 5 cartes par rang décroissant.

### 3. Règles de Tie-Break
En cas d'égalité de catégorie entre deux joueurs, le système compare les cartes du `chosen5` une par une selon l'ordre d'importance défini ci-dessus. Si toutes les valeurs sont identiques, un **split pot** est déclaré.

## Catégories de mains (de la plus forte à la plus faible)
1. Straight Flush (inclut la Royal Flush)
2. Four of a Kind
3. Full House
4. Flush
5. Straight
6. Three of a Kind
7. Two Pair
8. One Pair
9. High Card

## Installation et Tests
```bash
npm install

npm run test