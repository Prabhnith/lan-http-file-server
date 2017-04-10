
## http-lan-file-server


This is an Express server used to serve the files to the LAN users via HTTP.

### Why this project?

Our hostel LAN network has huge potential and there are many files that are share on LAN network but the problem is that there are many students that are using different operating systems like LINUX, MAC, WINDOWS etc which many a times doesn't allow sharing file to cross origin computers. 

On Linux, sometimes we have to install additional softwares like SAMBA but it doesn't always work. One Operating system can't detect what is shared on other device.

This problem is solved by this project as all operating system has browsers and they can make http request and can access the shared sources via URL locally without having any need to install additional softwares which doesn't always guarantee success.

### Screenshot


![screenshot of Lan Music server](https://github.com/Prabhnith/lan-http-file-server/raw/master/screenshot/lan-http-music-server.png "LAN MUSIC SERVER")


### Requirements
1. NodeJS 
2. NPM

### Instructions

1. clone the repo `git clone https://github.com/Prabhnith/lan-http-file-server.git`
2. cd lan-http-file-server
3. copy the files that you want to share in music/ currently music files (.mp3, .wav, .ogg)
3. npm install
4. node app
5. Goto the localhost:port, hostname:port and access files anywhere on local LAN

#### ToDo
- [ ] Add video support
- [ ] Other files support
- [ ] Make socket connection once for session
- [ ] Download with extension 
- [ ] show the hostname while starting server
- [ ] replace web dependencies with local server dependencies
- [ ] support to mobile devices via wifi
