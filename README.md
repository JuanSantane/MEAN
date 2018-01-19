# MEAN Project

requirements:
----------------------
   - docker installed. if you don't have it, you can install using this official page.
   - docker-compose installed. if you don't have it. use this article to do it. https://docs.docker.com/compose/install/

How to use it
----------------------
1) Download the git project: 
    * go to temporal folder to start the project with  --> `cd /tmp/`
    * Download the project with --> `git clone https://github.com/JuanSantane/MEAN.git`
    * go into project folder with --> `cd MEAN`

  Note: if you want to do all in one command line use this  -->  
  `cd /tmp/ && git clone https://github.com/JuanSantane/MEAN.git && cd MEAN`

2) Run project
   - run  `cd /tmp/MEAN/deployment/compose/ && docker-compose up`

3) Edit the project
   - If you want to write some code in the angular project. you need node_modules folder.
    *  `cd MEAN/frontEnd/angularProject && npm install`


Optional
---------------------
1) explore node server rutes witha modern browser  using "localhost:1223"
2) you can use mongo-client like mongo-compass to access at mongoDB using "localhost:1219"


