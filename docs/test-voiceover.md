# Test manuel VoiceOver (macOS + Safari)

Les tests automatiques (axe-core, jsx-a11y, Lighthouse) détectent environ un tiers des problèmes d'accessibilité. Ce parcours couvre le reste : ce qu'entend réellement une personne aveugle. Compter 15 minutes.

## Préparation

1. `npm run build && npm start`, puis ouvrir http://localhost:3000 dans **Safari** (VoiceOver est conçu pour Safari).
2. Activer VoiceOver : **Cmd + F5**. Le désactiver : même raccourci.
3. Raccourcis utiles (VO = **Ctrl + Option**) :
   - **Tab / Maj + Tab** : élément interactif suivant / précédent
   - **VO + flèche droite / gauche** : élément suivant / précédent (lecture)
   - **VO + U** : rotor (liste des titres, liens, repères, champs)
   - **VO + Cmd + H** : titre suivant
   - **VO + A** : tout lire depuis la position courante

## Parcours et résultat attendu

Cocher chaque ligne, noter dans « Constaté » ce qui est réellement entendu en cas d'écart.

| #   | Action                                 | Attendu                                                                                                             | OK  | Constaté |
| --- | -------------------------------------- | ------------------------------------------------------------------------------------------------------------------- | --- | -------- |
| 1   | Charger l'accueil                      | « The GhibliList » annoncé comme titre de la page                                                                   |     |          |
| 2   | Tab une fois                           | « Skip to main content, lien » ; le lien apparaît en haut à gauche                                                  |     |          |
| 3   | Entrée, puis Tab                       | Le focus arrive sur « Search a film, champ de recherche », suivi de l'aide « English, Japanese or romanised title » |     |          |
| 4   | VO + U, rubrique Repères               | Bannière, navigation « Links », recherche, principal, deux navigations du pied de page, informations de contenu     |     |          |
| 5   | VO + U, rubrique Titres                | Un seul titre de niveau 1 « Studio Ghibli films », puis un niveau 2 par film                                        |     |          |
| 6   | Taper « totoro » dans la recherche     | « 1 film shown. » annoncé sans déplacer le focus                                                                    |     |          |
| 7   | Taper « zzz »                          | « No film matches “zzz”. » annoncé                                                                                  |     |          |
| 8   | Effacer, Tab jusqu'à la première carte | « Castle in the Sky, Tenkū no shiro Rapyuta, 1986, lien » : le titre n'est lu qu'une fois                           |     |          |
| 9   | Entrée sur une carte                   | Changement de page annoncé ; titre « Castle in the Sky · The GhibliList »                                           |     |          |
| 10  | VO + Cmd + H sur la fiche              | Niveau 1 = titre du film, niveau 2 « Synopsis »                                                                     |     |          |
| 11  | Lire la bannière (VO + flèche droite)  | Titre japonais prononcé avec une voix japonaise, puis le titre romanisé                                             |     |          |
| 12  | Lire les détails                       | Paires « Director, Hayao Miyazaki », « Score, 95/100 »… ; aucune image annoncée                                     |     |          |
| 13  | Tab jusqu'à « Back to the list »       | « Back to the list, lien » (la flèche n'est pas lue)                                                                |     |          |
| 14  | Tab sur les icônes GitHub / LinkedIn   | « GitHub (opens in a new tab), lien »                                                                               |     |          |
| 15  | Ouvrir /films/inconnu                  | Page 404 annoncée                                                                                                   |     |          |

## Compléments rapides (sans VoiceOver)

- **Zoom 200 %** (Cmd + +, quatre fois) : rien ne se chevauche, pas de défilement horizontal.
- **Réglages > Accessibilité > Affichage > Réduire les animations** : les cartes ne bougent plus au survol.
- **Navigation au clavier dans Safari** : activer « Appuyer sur Tab pour mettre en évidence chaque élément » (Réglages Safari > Avancés), sinon Tab saute les liens.

## Résultat

- Date du test : 27 novembre 2026
- macOS / Safari : macOS 27.2.1, Safari 27.2
- Écarts constatés et corrections : aucun, les 15 étapes sont conformes.
