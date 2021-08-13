#!groovy

final String RED = '#ff6666'
final String GREEN = '#07ff00'

String PIPELINE_ENV

SLACK_CHANNEL = 'bat-bot' /* Slack channel to be used */

pipeline {
    agent {
        dockerfile true
    }


    parameters {
        string(name: 'PIPELINE_USER', defaultValue: 'E2euser', description: 'Username')
        choice(name: 'PIPELINE_ENV', choices: ['upper', 'lower', 'qax', 'stgx', 'prod', 'eu1', 'all', 'devx'], description: 'Env to run')
        choice(name: 'PIPELINE_SUITE', choices: ['oldUI', 'all', 'newUI'], description: 'Suite to run')
    
    }

    /* https://jenkins.io/doc/book/pipeline/syntax/ cron documentation */
    triggers {
        cron('H H * * *')
    }

    environment {
        BAT_AUTOMATION_PASSWORD = credentials('DEVX_BAT_AUTOMATION_PASSWORD')
        SLACK_WEBHOOK = credentials('slack-webhook')
        BROWSER = "chrome"
        SUITE = "${params.PIPELINE_SUITE}"
    }

    stages {

        stage('Initialize') {
            steps {
                script {
                    sh "node -v"
                    sh "npm -v"
                    if (params.PIPELINE_ENV == null)
                        PIPELINE_ENV = "upper"
                    else
                        PIPELINE_ENV = params.PIPELINE_ENV
                    sh "export BROWSERSTACK_DISPLAY_RESOLUTION=2880x1800"
                    sh "Xvfb :1 -screen 0 2880x1800x24 &"
                    sh "sleep 3"
                    sh "export DISPLAY=:1"
                    sh "DISPLAY=:1"
                    sh "rm -rf node_modules"
                    sh "npm i"
                    sh "echo PIPELINE_ENV = ${PIPELINE_ENV}"
                    sh "echo PIPELINE_SUITE = ${env.PIPELINE_SUITE}"
                    sh "echo SUITE = ${env.SUITE}"

                }
            }
        }

        stage("UI sanity - tests - E2E - DEVX") {
            when {
                expression { (PIPELINE_ENV == 'devx' || PIPELINE_ENV == 'all' || PIPELINE_ENV == 'lower')}
            }
            steps {
                script {
                    environment = 'devx'

                    // /* Install Bat latest version */
                    // sh "curl -o- 'https://s3.amazonaws.com/bat-wrapper/install.sh' | bash"
                    // /* devx*/
                    // sh "./cleanMonitorsAndLocations.sh -u=${PIPELINE_USER} -p=${BAT_AUTOMATION_PASSWORD} -e=devx -o=e0726bc4-def9-408b-accc-412ba313aac8"
                }

                catchError(buildResult: 'FAILURE', stageResult: 'FAILURE') {
                /* CatchError documentation: https://jenkins.io/doc/pipeline/steps/workflow-basic-steps/*/ 
                /* -e option is to skip-test https://devexpress.github.io/testcafe/documentation/using-testcafe/command-line-interface.html#-e---skip-js-errors */
                sh "DISPLAY=:1 ENV=${environment} npm run test"
                }
            }
            post {
                success {
                    slackSend(
                            token: SLACK_WEBHOOK,
                            channel: SLACK_CHANNEL,
                            color: GREEN,
                            message: "*Api-Functional-Monitoring-Testcafe* ${env.BRANCH_NAME} - Build #${env.BUILD_NUMBER} - SUCCESS! - <${env.BUILD_URL}|Check build> - Env: ${environment}"
                    )
                }

                failure {
                    slackSend(
                            token: SLACK_WEBHOOK,
                            channel: SLACK_CHANNEL,
                            color: RED,
                            message: "*Api-Functional-Monitoring-Testcafe* ${env.BRANCH_NAME} - Build #${env.BUILD_NUMBER} - FAILURE! - <${env.BUILD_URL}|Check build> - Env: ${environment}"
                    )
                }
            }
        }
        stage("UI sanity - tests - E2E - QAX") {
            when {
                   expression { (PIPELINE_ENV == 'qax' || PIPELINE_ENV == 'all' || PIPELINE_ENV == 'lower')}
            }
            steps {
                script{
                    environment = 'qax'
                    // /* Install Bat latest version */
                    // sh "curl -o- 'https://s3.amazonaws.com/bat-wrapper/install.sh' | bash"
                    // /*qax*/
                    // sh "./cleanMonitorsAndLocations.sh -u=${PIPELINE_USER} -p=${BAT_AUTOMATION_PASSWORD} -e=qax -o=dc63f131-5b16-4aa0-bfd2-565291daef4d"
                }
                catchError(buildResult: 'FAILURE', stageResult: 'FAILURE') {
                /* CatchError documentation: https://jenkins.io/doc/pipeline/steps/workflow-basic-steps/*/ 
                /* -e option is to skip-test https://devexpress.github.io/testcafe/documentation/using-testcafe/command-line-interface.html#-e---skip-js-errors */
                sh "DISPLAY=:1 ENV=${environment} npm run test"
                }

            }
            post {
                success {
                    slackSend(
                            token: SLACK_WEBHOOK,
                            channel: SLACK_CHANNEL,
                            color: GREEN,
                            message: "*Api-Functional-Monitoring-Testcafe* ${env.BRANCH_NAME} - Build #${env.BUILD_NUMBER} - SUCCESS! - <${env.BUILD_URL}|Check build> - Env: ${environment}"
                    )
                }

                failure {
                    slackSend(
                            token: SLACK_WEBHOOK,
                            channel: SLACK_CHANNEL,
                            color: RED,
                            message: "*Api-Functional-Monitoring-Testcafe* ${env.BRANCH_NAME} - Build #${env.BUILD_NUMBER} - FAILURE! - <${env.BUILD_URL}|Check build> - Env: ${environment}"
                    )
                }
            }
        }
        stage("UI sanity - tests - E2E - STGX") {
            when {
                expression { (PIPELINE_ENV == 'stgx' || PIPELINE_ENV == 'all' || PIPELINE_ENV == 'upper') && env.BRANCH_NAME == "high"}
            }
            steps {
                script{
                    environment = 'stgx'
                    //  /* Install Bat latest version */
                    // sh "curl -o- 'https://s3.amazonaws.com/bat-wrapper/install.sh' | bash"
                    // /*stgx*/
                    // sh "./cleanMonitorsAndLocations.sh -u=${PIPELINE_USER} -p=${BAT_AUTOMATION_PASSWORD} -e=stgx -o=37733252-7171-41b9-b1ff-2ffb3b4aaec9"
                }
                catchError(buildResult: 'FAILURE', stageResult: 'FAILURE') {
                /* CatchError documentation: https://jenkins.io/doc/pipeline/steps/workflow-basic-steps/*/ 
                /* -e option is to skip-test https://devexpress.github.io/testcafe/documentation/using-testcafe/command-line-interface.html#-e---skip-js-errors */
                sh "DISPLAY=:1 ENV=${environment} npm run test"
                }

            }
            post {
                success {
                    slackSend(
                            token: SLACK_WEBHOOK,
                            channel: SLACK_CHANNEL,
                            color: GREEN,
                            message: "*Api-Functional-Monitoring-Testcafe* ${env.BRANCH_NAME} - Build #${env.BUILD_NUMBER} - SUCCESS! - <${env.BUILD_URL}|Check build> - Env: ${environment}"
                    )
                }

                failure {
                    slackSend(
                            token: SLACK_WEBHOOK,
                            channel: SLACK_CHANNEL,
                            color: RED,
                            message: "*Api-Functional-Monitoring-Testcafe* ${env.BRANCH_NAME} - Build #${env.BUILD_NUMBER} - FAILURE! - <${env.BUILD_URL}|Check build> - Env: ${environment}"
                    )
                }
            }
        }
        stage("UI sanity - tests - E2E - PROD") {
            when {
                expression { (PIPELINE_ENV == 'prod' || PIPELINE_ENV == 'all' || PIPELINE_ENV == 'upper') && env.BRANCH_NAME == "high"}
            }
            steps {
                script{
                    environment = 'prod'

                    // /* Install Bat latest version */
                    // sh "curl -o- 'https://s3.amazonaws.com/bat-wrapper/install.sh' | bash"
                    // /*prod*/
                    // sh "./cleanMonitorsAndLocations.sh -u=${PIPELINE_USER} -p=${BAT_AUTOMATION_PASSWORD} -e=prod -o=06ec7b96-8ee1-4a82-bfcd-15e971cc8868"
                }

                catchError(buildResult: 'FAILURE', stageResult: 'FAILURE') {
                /* CatchError documentation: https://jenkins.io/doc/pipeline/steps/workflow-basic-steps/*/ 
                /* -e option is to skip-test https://devexpress.github.io/testcafe/documentation/using-testcafe/command-line-interface.html#-e---skip-js-errors */
                sh "DISPLAY=:1 ENV=${environment} npm run test"
                }
            }
            post {
                success {
                    slackSend(
                            token: SLACK_WEBHOOK,
                            channel: SLACK_CHANNEL,
                            color: GREEN,
                            message: "*Api-Functional-Monitoring-Testcafe* ${env.BRANCH_NAME} - Build #${env.BUILD_NUMBER} - SUCCESS! - <${env.BUILD_URL}|Check build> - Env: ${environment}"
                    )
                }

                failure {
                    slackSend(
                            token: SLACK_WEBHOOK,
                            channel: SLACK_CHANNEL,
                            color: RED,
                            message: "*Api-Functional-Monitoring-Testcafe* ${env.BRANCH_NAME} - Build #${env.BUILD_NUMBER} - FAILURE! - <${env.BUILD_URL}|Check build> - Env: ${environment}"
                    )
                }
            }
        }
        stage("UI sanity - tests - E2E - EU1") {
            when {
                expression { (PIPELINE_ENV == 'eu1' || PIPELINE_ENV == 'all' || PIPELINE_ENV == 'upper') && env.BRANCH_NAME == "high"}
            }
            steps {
                script{
                    environment = 'eu1'

                    //  /* Install Bat latest version */
                    // sh "curl -o- 'https://s3.amazonaws.com/bat-wrapper/install.sh' | bash"
                    // /*eu1*/
                    // sh "./cleanMonitorsAndLocations.sh -u=${PIPELINE_USER} -p=${BAT_AUTOMATION_PASSWORD} -e=eu1 -o=473e0ca3-98c1-4dc7-88ca-578e41fbfecb"
                }
               
                
                catchError(buildResult: 'FAILURE', stageResult: 'FAILURE') {
                /* CatchError documentation: https://jenkins.io/doc/pipeline/steps/workflow-basic-steps/*/ 
                /* -e option is to skip-test https://devexpress.github.io/testcafe/documentation/using-testcafe/command-line-interface.html#-e---skip-js-errors */
                 sh "DISPLAY=:1 ENV=${environment} npm run test"
                }
            }
            post {
                success {
                    slackSend(
                            token: SLACK_WEBHOOK,
                            channel: SLACK_CHANNEL,
                            color: GREEN,
                            message: "*Api-Functional-Monitoring-Testcafe* ${env.BRANCH_NAME} - Build #${env.BUILD_NUMBER} - SUCCESS! - <${env.BUILD_URL}|Check build> - Env: ${environment}"
                    )
                }

                failure {
                    slackSend(
                            token: SLACK_WEBHOOK,
                            channel: SLACK_CHANNEL,
                            color: RED,
                            message: "*Api-Functional-Monitoring-Testcafe* ${env.BRANCH_NAME} - Build #${env.BUILD_NUMBER} - FAILURE! - <${env.BUILD_URL}|Check build> - Env: ${environment}"
                    )
                }
            }
        }
    }
}
