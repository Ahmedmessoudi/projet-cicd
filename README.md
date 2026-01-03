# 🧮 Mini Projet CI/CD avec Jenkins

Une calculatrice web moderne avec un pipeline CI/CD complet utilisant Jenkins, Jest pour les tests, et Ansible pour le déploiement.

![Jenkins](https://img.shields.io/badge/Jenkins-D24939?style=for-the-badge&logo=jenkins&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Jest](https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=jest&logoColor=white)
![Ansible](https://img.shields.io/badge/Ansible-EE0000?style=for-the-badge&logo=ansible&logoColor=white)

## 📁 Structure du Projet

```
projet-cicd/
├── src/
│   ├── index.html      # Page principale (calculatrice)
│   ├── style.css       # Styles modernes
│   └── script.js       # Logique JavaScript
├── tests/
│   └── test.js         # Tests unitaires Jest
├── ansible/
│   ├── inventory/
│   │   └── hosts       # Inventaire des serveurs
│   ├── playbooks/
│   │   ├── deploy.yml  # Playbook de déploiement
│   │   └── templates/  # Templates Jinja2
│   └── roles/
│       └── webserver/  # Rôle serveur web
├── Jenkinsfile         # Pipeline CI/CD
├── package.json        # Configuration Node.js
└── README.md           # Ce fichier
```

## 🚀 Démarrage Rapide

### Prérequis

- **Node.js** v18 ou supérieur
- **npm** (inclus avec Node.js)
- **Jenkins** (pour le pipeline CI/CD)
- **Git**

### Installation

```bash
# Cloner le repository
git clone https://github.com/votre-username/projet-cicd.git
cd projet-cicd

# Installer les dépendances
npm install

# Exécuter les tests
npm test

# Ouvrir l'application
# Ouvrez src/index.html dans votre navigateur
```

## 🧪 Tests

Le projet utilise **Jest** pour les tests unitaires.

```bash
# Exécuter les tests
npm test

# Exécuter les tests avec couverture
npm run test -- --coverage
```

### Tests Inclus

- ✅ Addition (6 tests)
- ✅ Soustraction (4 tests)
- ✅ Multiplication (4 tests)
- ✅ Division (5 tests) - incluant division par zéro
- ✅ Pourcentage (4 tests)
- ✅ Validation des nombres (4 tests)

## 🔧 Configuration Jenkins

### 1. Installation de Jenkins

#### Windows
```powershell
# Télécharger Jenkins depuis https://www.jenkins.io/download/
# Exécuter l'installateur et suivre les instructions
```

#### Linux/Mac
```bash
# Avec Docker (recommandé)
docker run -p 8080:8080 -p 50000:50000 jenkins/jenkins:lts
```

### 2. Plugins Requis

Installez les plugins suivants via **Manage Jenkins > Plugins** :

- ✅ **NodeJS Plugin** - Pour exécuter npm
- ✅ **Git Plugin** - Pour le checkout
- ✅ **Pipeline** - Pour le Jenkinsfile
- ✅ **HTML Publisher** - Pour les rapports de couverture
- ✅ **JUnit Plugin** - Pour les rapports de tests

### 3. Configuration de Node.js

1. Aller dans **Manage Jenkins > Tools**
2. Ajouter une installation NodeJS
3. Nom : `NodeJS`
4. Version : `18.x`
5. Cocher "Install automatically"

### 4. Créer le Pipeline

1. **Nouveau Item** > Entrez un nom > **Pipeline**
2. Configurer la source :
   - **Pipeline script from SCM**
   - SCM : **Git**
   - URL : Votre repository Git
   - Branch : `*/main`
3. Script Path : `Jenkinsfile`
4. **Sauvegarder**

### 5. Exécuter le Pipeline

Cliquez sur **Build Now** pour lancer le pipeline !

## 📊 Stages du Pipeline

| Stage | Description |
|-------|-------------|
| 📥 **Checkout** | Récupération du code depuis Git |
| 📦 **Install** | Installation des dépendances npm |
| 🔍 **Lint** | Analyse statique du code |
| 🧪 **Test** | Exécution des tests Jest |
| 🏗️ **Build** | Création de l'artifact |
| 🚀 **Deploy** | Déploiement via Ansible |

## 🎭 Ansible

### Simulation Locale

```bash
# Vérifier la syntaxe du playbook
ansible-playbook ansible/playbooks/deploy.yml --syntax-check

# Exécuter en mode dry-run
ansible-playbook -i ansible/inventory/hosts ansible/playbooks/deploy.yml --check

# Déployer
ansible-playbook -i ansible/inventory/hosts ansible/playbooks/deploy.yml
```

## 📸 Captures d'écran

### Application
Pour visualiser l'application, ouvrez `src/index.html` dans votre navigateur.

### Pipeline Jenkins
Après configuration, votre pipeline affichera les stages suivants :

```
[Checkout] → [Install] → [Lint] → [Test] → [Build] → [Deploy]
```

## 📝 Scripts npm

| Commande | Description |
|----------|-------------|
| `npm test` | Exécute les tests avec couverture |
| `npm run test:ci` | Tests pour CI (format JUnit) |
| `npm run lint` | Analyse statique |
| `npm run build` | Crée l'artifact |

## 🤝 Contribution

1. Fork le projet
2. Créez une branche (`git checkout -b feature/nouvelle-fonction`)
3. Commit (`git commit -m 'Ajout nouvelle fonction'`)
4. Push (`git push origin feature/nouvelle-fonction`)
5. Ouvrez une Pull Request

## 📄 Licence

Ce projet est sous licence MIT.

---

**Projet réalisé dans le cadre du cours CI/CD** 🎓
