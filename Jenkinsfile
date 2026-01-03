// Jenkinsfile - Pipeline CI/CD pour le projet Calculatrice
// Mini Projet CI/CD avec Jenkins

pipeline {
    agent any
    
    // Variables d'environnement
    environment {
        NODE_VERSION = '18'
        APP_NAME = 'calculatrice-cicd'
        DEPLOY_PATH = '/var/www/html/calculatrice'
    }
    
    // Outils requis
    tools {
        nodejs 'NodeJS'  // Configuré dans Jenkins > Global Tool Configuration
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
                checkout scm
                
                script {
                    // Afficher les informations du commit
                    if (isUnix()) {
                        sh 'git log -1 --oneline || true'
                    } else {
                        bat 'git log -1 --oneline || echo "Git info not available"'
                    }
                }
            }
        }
        
        // ============================================
        // Stage 2: Installation des dépendances
        // ============================================
        stage('Install Dependencies') {
            steps {
                echo '📦 Installation des dépendances npm...'
                script {
                    if (isUnix()) {
                        sh 'npm ci || npm install'
                    } else {
                        bat 'npm ci || npm install'
                    }
                }
            }
        }
        
        // ============================================
        // Stage 3: Linting (Analyse statique)
        // ============================================
        stage('Lint') {
            steps {
                echo '🔍 Analyse statique du code...'
                script {
                    if (isUnix()) {
                        sh 'npm run lint || true'
                    } else {
                        bat 'npm run lint || echo "Lint completed"'
                    }
                }
            }
        }
        
        // ============================================
        // Stage 4: Exécution des tests
        // ============================================
        stage('Test') {
            steps {
                echo '🧪 Exécution des tests unitaires...'
                script {
                    if (isUnix()) {
                        sh 'npm run test:ci'
                    } else {
                        bat 'npm run test:ci'
                    }
                }
            }
            post {
                always {
                    // Publication des rapports de test
                    junit allowEmptyResults: true, testResults: 'reports/junit.xml'
                    
                    // Publication de la couverture de code
                    publishHTML(target: [
                        allowMissing: true,
                        alwaysLinkToLastBuild: true,
                        keepAll: true,
                        reportDir: 'coverage/lcov-report',
                        reportFiles: 'index.html',
                        reportName: 'Coverage Report'
                    ])
                }
            }
        }
        
        // ============================================
        // Stage 5: Build (Création de l'artifact)
        // ============================================
        stage('Build') {
            steps {
                echo '🏗️ Construction de l\'application...'
                script {
                    if (isUnix()) {
                        sh '''
                            mkdir -p dist
                            cp -r src/* dist/
                            echo "Build version: ${BUILD_NUMBER}" > dist/version.txt
                            echo "Build date: $(date)" >> dist/version.txt
                        '''
                    } else {
                        bat '''
                            if not exist dist mkdir dist
                            xcopy /E /Y src\\* dist\\
                            echo Build version: %BUILD_NUMBER% > dist\\version.txt
                        '''
                    }
                }
            }
            post {
                success {
                    // Archiver l'artifact
                    archiveArtifacts artifacts: 'dist/**/*', fingerprint: true
                }
            }
        }
        
        // ============================================
        // Stage 6: Déploiement (via Ansible)
        // ============================================
        stage('Deploy') {
            when {
                branch 'main'  // Déployer uniquement sur la branche main
            }
            steps {
                echo '🚀 Déploiement de l\'application...'
                script {
                    if (isUnix()) {
                        sh '''
                            echo "Exécution du playbook Ansible..."
                            # Décommenter la ligne suivante si Ansible est installé
                            # ansible-playbook -i ansible/inventory/hosts ansible/playbooks/deploy.yml
                            echo "Déploiement simulé avec succès!"
                        '''
                    } else {
                        bat '''
                            echo Deploiement simule avec succes!
                            echo Note: Pour un deploiement reel, configurez Ansible sur un serveur Linux
                        '''
                    }
                }
            }
        }
    }
    
    // ============================================
    // Actions post-pipeline
    // ============================================
    post {
        success {
            echo '✅ Pipeline exécuté avec succès!'
            // Notification optionnelle
            // slackSend(color: 'good', message: "Build ${env.BUILD_NUMBER} réussi!")
        }
        failure {
            echo '❌ Le pipeline a échoué.'
            // Notification optionnelle
            // slackSend(color: 'danger', message: "Build ${env.BUILD_NUMBER} échoué!")
        }
        always {
            echo '🧹 Nettoyage...'
            cleanWs(cleanWhenNotBuilt: false,
                    deleteDirs: true,
                    disableDeferredWipeout: true,
                    notFailBuild: true)
        }
    }
}
