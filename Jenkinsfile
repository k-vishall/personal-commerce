pipeline {
    agent any

    environment {
        IMAGE_NAME = "av-ecommerce"
        CONTAINER_NAME = "ecommerce"
        PORT = "5181"
    }

    stages {
        stage('Checkout Code') {
            steps {
                git branch: 'main', url: 'https://github.com/k-vishall/personal-commerce.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh "sudo docker build -t $IMAGE_NAME ."
            }
        }

        stage('Deploy Container') {
            steps {
                sh """
                docker stop $CONTAINER_NAME || true
                docker rm $CONTAINER_NAME || true
                docker run -d -p $PORT:$PORT --name $CONTAINER_NAME $IMAGE_NAME
                """
            }
        }
    }

    post {
        success {
            echo "Deployment successful!"
        }
        failure {
            echo "Deployment failed!"
        }
    }
}
