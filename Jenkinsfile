node {
   stage('Clone repository') {
       git credentialsId: 'github_access_token', url: 'https://github.com/Hyeongjun79/AMIGO.git'
   }
   stage('Build image') {
      backendImage = docker.build("jun9579/amigo-mallapi:latest" "./backend/mallapi")
      frontendImage = docker.build("jun9579/amigo-mall:latest" "./frontend/mall")
   }

   stage('Push image') {
     withDockerRegistry([ credentialsId: "docker-access", url: "" ]) {
     backendImage.push()
     frontendImage.push()
     }
   }
}
