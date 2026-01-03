// Jenkinsfile - Pipeline CI/CD pour le projet Calculatrice
// Mini Projet CI/CD avec Jenkins
// GitHub: https://github.com/Ahmedmessoudi/projet-cicd.git

pipeline {
    agent any
    
    // Variables d'environnement
    environment {
        APP_NAME = 'calculatrice-cicd'
        GIT_REPO = 'https://github.com/Ahmedmessoudi/projet-cicd.git'
        GIT_BRANCH = 'main'
    }
    
    // Options du pipeline
    options {
        buildDiscarder(logRotator(numToKeepStr: '10'))
        timestamps()
        timeout(time: 30, unit: 'MINUTES')
        disableConcurrentBuilds()
    }
    
    stages {
        // ============================================
        // Stage 1: Checkout du code source
        // ============================================
        stage('Checkout') {
            steps {
                echo '📥 Récupération du code source...'
                git branch: "${GIT_BRANCH}",
                    credentialsId: 'git-credentials',
                    url: "${GIT_REPO}"
                echo 'Dépôt cloné avec succès !'
            }
        }
        
        // ============================================
        // Stage 2: Installation de Node.js (binaire portable)
        // ============================================
        stage('Setup Node.js') {
            steps {
                echo '🔧 Installation de Node.js...'
                sh '''
                    # Télécharger Node.js binaire (format tar.gz, pas besoin de xz)
                    if [ ! -d "node-v20.10.0-linux-x64" ]; then
                        echo "Téléchargement de Node.js 20..."
                        curl -fsSL https://nodejs.org/dist/v20.10.0/node-v20.10.0-linux-x64.tar.gz -o node.tar.gz
                        tar -xzf node.tar.gz
                        rm node.tar.gz
                    fi
                    
                    # Ajouter au PATH et vérifier
                    export PATH=$PWD/node-v20.10.0-linux-x64/bin:$PATH
                    echo "Node.js version: $(node --version)"
                    echo "npm version: $(npm --version)"
                '''
            }
        }
        
        // ============================================
        // Stage 3: Installation des dépendances
        // ============================================
        stage('Install Dependencies') {
            steps {
                echo '📦 Installation des dépendances npm...'
                sh '''
                    export PATH=$PWD/node-v20.10.0-linux-x64/bin:$PATH
                    npm install
                '''
            }
        }
        
        // ============================================
        // Stage 4: Linting (Analyse statique)
        // ============================================
        stage('Lint') {
            steps {
                echo '🔍 Analyse statique du code...'
                sh '''
                    export PATH=$PWD/node-v20.10.0-linux-x64/bin:$PATH
                    npm run lint
                '''
            }
        }
        
        // ============================================
        // Stage 5: Exécution des tests
        // ============================================
        stage('Test') {
            steps {
                echo '🧪 Exécution des tests unitaires...'
                sh '''
                    export PATH=$PWD/node-v20.10.0-linux-x64/bin:$PATH
                    npm test
                '''
            }
            post {
                always {
                    junit allowEmptyResults: true, testResults: 'reports/junit.xml'
                }
            }
        }
        
        // ============================================
        // Stage 6: Build (Création de l'artifact)
        // ============================================
        stage('Build') {
            steps {
                echo '🏗️ Construction de l\'application...'
                sh '''
                    mkdir -p dist
                    cp -r src/* dist/
                    echo "Build version: ${BUILD_NUMBER}" > dist/version.txt
                '''
            }
            post {
                success {
                    archiveArtifacts artifacts: 'dist/**/*', fingerprint: true
                }
            }
        }
        
        // ============================================
        // Stage 7: Déploiement
        // ============================================
        stage('Deploy') {
            steps {
                echo '🚀 Déploiement simulé avec succès!'
                echo 'Note: Configurez Ansible pour un vrai déploiement'
            }
        }
    }
    
    // ============================================
    // Actions post-pipeline
    // ============================================
    post {
        success {
            echo '✅ Pipeline exécuté avec succès!'
        }
        failure {
            echo '❌ Le pipeline a échoué.'
        }
        always {
            echo '🧹 Nettoyage terminé.'
        }
    }
}
