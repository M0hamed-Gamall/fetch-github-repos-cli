#!/usr/bin/env node

const axios = require('axios');
const fs = require('fs');
const readline = require('readline');


const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});


const getRepositories = async (username) => {
    const url = `https://api.github.com/users/${username}/repos`;
    try {
        const response = await axios.get(url);
        return response.data.map(repo => repo.name); 
    } catch (error) {
        console.error("Error fetching repositories:", error.message);
        process.exit(1); 
    }
};


const saveToFile = (username, repoNames) => {
    const fileName = `${username}.txt`;
    fs.writeFileSync(fileName, repoNames.join('\n'), 'utf8');
    console.log(`Repository names saved to ${fileName}`);
};


rl.question('Enter the GitHub username: ', async (username) => {
    const repos = await getRepositories(username);
    saveToFile(username, repos);
    rl.close();
});
