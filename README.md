# Laravel 10 & React js - management_stagiaire application


## Run Locally

Clone the project

```bash
    git clone https://github.com/KAsmae4/gestion.git project-name
```

Go to the project directory

```bash
  cd project-name
```

## Backend terminal Run Locally

```bash
  cd server
```
-   Copiez le fichier .env.example en tant que .env et éditez-y les identifiants de la base de données:
```bash
    cp .env.example .env
```
- Insérez la base de données : "btn" dans phpMyAdmin.
- Accédez au dossier 'Database' et copiez le contenu du fichier 'btn.sql', puis collez-le dans la base de données 'btn'.

```bash
    composer install
```

```bash
    php artisan key:generate
```

```bash
    php artisan artisan migrate:fresh --seed
```

```bash
    php artisan storage:link
```


## Frontend terminal Run Locally:

```bash
    npm install
```
```bash
    npm install exceljs
```

```bash
    npm run dev
```

## Important !!:
Il faut lancer le terminal du backend et celui du frontend en même temps.


### Login SuperAdmin

-   email = jabli.zakaria@gmail.com
-   password = 123456789




### Screenshots
Après avoir installé et lancé l'application, suivez les instructions suivantes:

Dans votre Gmail, cliquez sur "Gérer votre compte":

![preview img](/s1.png)

Chercher "Mots de passe des applications":

![preview img](/s2.png)

Après avoir inséré votre mot de passe, nommez l'application :

![preview img](/s3.png)

Copier le mot de passe :

![preview img](/s4.png)

Insérez le mot de passe et l'email dans le fichier .env :

![preview img](/s5.png)

MAIL_USERNAME = "jabli.zakaria@gmail.com"
MAIL_PASSWORD = 'COLLER LE MOT DE PASSE'
MAIL_FROM_NAME_ADDRESS = "jabli.zakaria@gmail.com"
