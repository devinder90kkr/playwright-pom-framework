pipeline {
    agent any

    tools {
        nodejs "NodeJS18"
    }

    stages {

        stage('Checkout Code') {
            steps {
                git 'https://github.com/devinder90kkr/playwright-pom-framework.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Install Playwright Browsers') {
            steps {
                sh 'npx playwright install'
            }
        }

        stage('Run Playwright Tests') {
            steps {
                sh 'npx playwright test'
            }
        }

    }
}
