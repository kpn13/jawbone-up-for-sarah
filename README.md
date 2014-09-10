jawbone-up-for-sarah
====================

SARAH's plugin for jawbone up

Documentation plugin Jawbone for SARAH

Pr&eacute;-requis


Pour utiliser le plugin, il vous faut r&eacute;cup&eacute;rer certaines infos qui vous sont personnelles sur le site de Jawbone.

Inscription sur le site de Jawbone
Commencez par aller vous inscrire sur le site de Jawbone : https://jawbone.com/up/developer/.
Il vous faut ensuite cr&eacute;er une application sur ce m&ecirc;me site (avec des infos plus ou moins bidon).
N'oubliez pas de remplir le champ "OAuth redirect URLs", c'est n&eacute;cessaire pour r&eacute;cup&eacute;rer un token d'authentification.
Une fois la cr&eacute;ation de votre app termin&eacute;e, notez les infos suivantes : Client Id et App Secret ( = client secret).

R&eacute;cuperer l'access token
Acc&eacute;der &agrave; l'adresse suivante via votre navigateur : https://jawbone.com/auth/oauth2/auth?response_type=code&client_id=xxx&scope=basic_read%20extended_read%20friends_read%20move_read%20sleep_read&redirect_uri=https://test
Attention pensez &agrave; remplacer dans l'url ci-dessus le client_id par le votre et le redirect_uri par l'adresse que vous avez mis dans le champ "OAuth redirect URLs".
Si tout va bien, vous devez voir une page qui vous demande d'autoriser l'application &agrave; acc&egrave;der &agrave; vos donn&eacute;es. Acceptez et vous allez &ecirc;tre redirig&eacute; vers la page que vous avez indiqu&eacute;e dans le champ "OAuth redirect URLs".
Notez le param&egrave;tre "code" qui est dans l'url.
Ensuite saisissez l'url suivante : https://jawbone.com/auth/oauth2/token?client_id=xxx&client_secret=yyy&grant_type=authorization_code&code=zzz.
Pensez &agrave; remplacer les xxx, yyy et zzz par vos valeurs.
Cette page doit vous affichez du Json. Copiez la valeur du access_token. Pour info, il est valable 1 an.

Param&egrave;trer le plugin
Copier les valeurs access_token et client_secret dans le fichier jawboneup.prop.


Instructions

Actuellement, le plugin permet de lire uniquement les donn&eacute;es concernant les "pas". Je n'ai pas encore impl&eacute;ment&eacute; les parties "sommeil", "humeur", "nourritures", etc...

SARAH combien de pas j'ai fait aujourd'hui  
SARAH combien j'ai fait de pas aujourd'hui  
SARAH quelle distance j'ai parcourue aujourd'hui
SARAH combien de kilom&egrave;tre j'ai fait aujourd'hui
SARAH combien de kilom&egrave;tre j'ai parcouru aujourd'hui
SARAH quand j'ai &eacute;t&eacute; le plus actif aujourd'hui
SARAH quand j'ai fait le plus de pas aujourd'hui
SARAH quand mon objectif sera aujourd'hui		
