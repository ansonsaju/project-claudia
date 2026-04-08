/**
 * Claudia Interactive CLI
 * Terminal-Native Gauntlet Experience
 * Directed by Anson (@ansonsaju)
 */
const chalk = require('chalk');
const ora = require('ora');
const inquirer = require('inquirer');
const ClaudiaEngine = require('./claudia-engine');
const llmProvider = require('./llm-provider');

async function runCLI() {
    process.stdout.write('\x1Bc'); // Clear terminal
    console.log(chalk.cyan.bold('\n🛡️  PROJECT CLAUDIA: VANGUARD CLI v1.0'));
    console.log(chalk.dim('Directed by Anson (@ansonsaju)\n'));

    const answers = await inquirer.prompt([
        {
            type: 'input',
            name: 'requirements',
            message: '📝 Define your security requirements:',
            default: 'Implement a secure login function with bcrypt password hashing.'
        }
    ]);

    const providers = {
        builder: llmProvider.getAgentProvider('builder'),
        hacker: llmProvider.getAgentProvider('hacker'),
        judge: llmProvider.getAgentProvider('judge')
    };

    const engine = new ClaudiaEngine(providers);
    
    const spinner = ora('Launching Adversarial Gauntlet...').start();
    
    try {
        const result = await engine.verify(answers.requirements);
        spinner.stop();

        if (result.status === 'certified') {
            console.log(chalk.green.bold('\n✅ CERTIFICATION SUCCESSFUL'));
            console.log(chalk.white(`Duel ID: ${result.id}`));
            console.log(chalk.dim('\n--- GENERATED SECURE DIFF ---'));
            console.log(chalk.cyan(result.diff));
        } else {
            console.log(chalk.red.bold('\n❌ VERIFICATION FAILED'));
            console.log(chalk.yellow(`Reason: ${result.reason || 'Circuit Breaker Triggered'}`));
        }
    } catch (err) {
        spinner.fail('Gauntlet Aborted: ' + err.message);
    }
}

if (require.main === module) {
    runCLI();
}

module.exports = runCLI;
