import {addCollaborators, clone, createBranch, createNewRepository, commit, addFiles, push} from "./gitOperations";

const fs = require('fs');
const path = require('path');
const process = require('process');

export function createFoldersInDirectory(projectDirectory : string) : void {
    fs.mkdir(path.join(projectDirectory, 'src'), function () {});
    fs.writeFile(projectDirectory +'/src/ReadMeSrc.txt', "This folder should contain code written by a programmer", function () {});

    fs.mkdir(path.join(projectDirectory, 'content'), function () {});
    fs.writeFile(projectDirectory + '/content/ReadMeContent.txt', "This folder should contain code written by a publisher", function () {});
}


export async function createProject(accessToken: string,
                                    repoName: string,
                                    projectDirectory: string,
                                    collaborators : string[],
                                    description?: string) {
    let responseData = await createNewRepository(accessToken, repoName, description);
    clone(projectDirectory, responseData.data.clone_url, accessToken);
    createFoldersInDirectory(projectDirectory);
    addFiles(projectDirectory);
    commit(projectDirectory, responseData.data.owner.login, "project initiating");
    createBranch(projectDirectory, "redaktor", accessToken);
    push(projectDirectory, accessToken);
    addCollaborators(accessToken, responseData.data.owner.login, responseData.data.name, collaborators);
    //TODO: place for adding collaborators in configuration file, collaborators : string[] will have to be changed to the type containing name and role

    //TODO: git add, git commit, git push here <----
}