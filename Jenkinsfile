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
        // Stage 2: Installation des dépendances
        // ============================================
        stage('Install Dependencies') {
            steps {
                echo '📦 Installation des dépendances npm...'
                bat 'npm --version'
                bat 'node --version'
                bat 'npm install'
            }
        }
        
        // ============================================
        // Stage 3: Linting (Analyse statique)
        // ============================================
        stage('Lint') {
            steps {
                echo '🔍 Analyse statique du code...'
                bat 'npm run lint'
            }
        }
        
        // ============================================
        // Stage 4: Exécution des tests
        // ============================================
        stage('Test') {
            steps {
                echo '🧪 Exécution des tests unitaires...'
                bat 'npm test'
            }
            post {
                always {
                    // Publication des rapports de test JUnit
                    junit allowEmptyResults: true, testResults: 'reports/junit.xml'
                }
            }
        }
        
        // ============================================
        // Stage 5: Build (Création de l'artifact)
        // ============================================
        stage('Build') {
            steps {
                echo '🏗️ Construction de l\'application...'
                bat '''
                    if not exist dist mkdir dist
                    xcopy /E /Y src\\* dist\\
                    echo Build version: %BUILD_NUMBER% > dist\\version.txt
                '''
            }
            post {
                success {
                    // Archiver l'artifact
                    archiveArtifacts artifacts: 'dist/**/*', fingerprint: true
                }
            }
        }
        
        // ============================================
        // Stage 6: Déploiement
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
