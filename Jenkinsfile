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
        NODE_HOME = '/usr/local'
        PATH = "${NODE_HOME}/bin:${env.PATH}"
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
        // Stage 2: Installation de Node.js
        // ============================================
        stage('Setup Node.js') {
            steps {
                echo '🔧 Installation de Node.js...'
                sh '''
                    # Vérifier si Node.js est déjà installé
                    if ! command -v node &> /dev/null; then
                        echo "Installation de Node.js..."
                        curl -fsSL https://deb.nodesource.com/setup_18.x | bash - || true
                        apt-get install -y nodejs || true
                        
                        # Alternative: Installation via nvm si apt ne fonctionne pas
                        if ! command -v node &> /dev/null; then
                            echo "Tentative avec installation manuelle..."
                            curl -fsSL https://nodejs.org/dist/v18.19.0/node-v18.19.0-linux-x64.tar.xz -o node.tar.xz
                            tar -xf node.tar.xz
                            export PATH=$PWD/node-v18.19.0-linux-x64/bin:$PATH
                            echo "Node installé: $(node --version)"
                        fi
                    else
                        echo "Node.js déjà installé: $(node --version)"
                    fi
                    
                    node --version || echo "Node.js non disponible"
                    npm --version || echo "npm non disponible"
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
                    # Utiliser Node.js local si installé dans le workspace
                    if [ -d "node-v18.19.0-linux-x64" ]; then
                        export PATH=$PWD/node-v18.19.0-linux-x64/bin:$PATH
                    fi
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
                    if [ -d "node-v18.19.0-linux-x64" ]; then
                        export PATH=$PWD/node-v18.19.0-linux-x64/bin:$PATH
                    fi
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
                    if [ -d "node-v18.19.0-linux-x64" ]; then
                        export PATH=$PWD/node-v18.19.0-linux-x64/bin:$PATH
                    fi
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
