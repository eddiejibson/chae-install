# chae-install
A simple script generator for the installation of packages along with various other tasks.
Understandably, setting up a server from scratch is a pain. install.chae.sh assists you with this. You can select the packages you wish to install along with a variety of other tasks and it will generate a one line command to do it for you. It can also handle various other tasks such as adding the correct PPAs, updating the system and downloading backups.

# Basic Commit Guide
We are more than welcoming of any pull requests. If you'd like to add a package or task that is not already implemented, then the `install.json` file is where you can add such.

# Running on your own server
Running your own instalation script generator is easy.
Firstly, pull the git repository:
`git pull https://github.com/eddiejibson/chae-install.git`
You now must configure such. The sample config file can be found with the file name `config.sample.json` - the easiest thing to do is rename it to `config.json` and edit it to your needs.
Next, the dependancies need to be installed:
`npm install`
Build the static index.html file:
`npm run build`
