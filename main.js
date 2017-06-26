window.onload = function () {
    document.getElementById("searchbtn").addEventListener("click", function(){
    document.getElementById('dataUser').innerHTML = "";
    document.getElementById('dataRepos').innerHTML = "";    
    userCall();
    reposCall();    
    }); 
}

function userCall() {
    function callUjson(callback) {
    var error = true;
    var uName = document.getElementById('name').value;
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", "https://api.github.com/users/" + uName, true);
    xmlhttp.overrideMimeType("application/json");    
    xmlhttp.onreadystatechange = function() {
        
           if (xmlhttp.readyState == 4 && xmlhttp.status == 200){
               callback (xmlhttp.responseText);
        }
           else if((xmlhttp.status != "200" && error)){
               error = false;
               var errorBloc = document.createElement('div');
                errorBloc.classList.add('error');
                var error_p = document.createElement('p');
                var errorMSG = "Does not exist";
                errorBloc.append(error_p);
                error_p.append(errorMSG);
                document.getElementById('dataUser').append(errorBloc);
                document.getElementById('dataUser').style.height = "100px";
           }
        };
    xmlhttp.send(null);
}

callUjson(function (response) {
    var user_JSON = JSON.parse(response);
    console.log(user_JSON);
    
    //GET PHOTO FROM JSON ID.
    var avatarFoto = document.createElement("div");
    avatarFoto.classList.add('avatarFoto');
    var photodiv = document.createElement("div");
    photodiv.classList.add('photo');
    photodiv.style.backgroundImage = "url('" + user_JSON.avatar_url + "')";
    avatarFoto.append(photodiv);
    document.getElementById("dataUser").append(avatarFoto);
    
    //GET ID NAME.
    var infoUser = document.createElement("div");
    infoUser.setAttribute('id', 'infoUser');
    var loginName = document.createElement("div");
    loginName.classList.add('loginName');
    var login = document.createElement("p");
    var idlogin = document.createElement("i");
    loginName.append(login);
    login.append(idlogin);
    idlogin.append("@" + user_JSON.login);
    document.getElementById("dataUser").append(infoUser);
    document.getElementById("infoUser").append(loginName);
    
    var fullName = document.createElement("div");
    fullName.classList.add('fullName');
    var username = user_JSON.name;
    var h2name = document.createElement('h2');
    fullName.append(h2name);
    h2name.append(username);
    infoUser.append(fullName);
    //console.log("pepito");
    
    var bio = document.createElement("div");
    bio.classList.add("bio");
    var User_bio = user_JSON.bio;
    var bio_p = document.createElement("p");
    bio.append(bio_p);
    bio_p.append(User_bio);
    infoUser.append(bio);
    

    });
    
}

function reposCall() {
    function callRjson(callback) {
    var errormsg = true;
    var uName = document.getElementById('name').value;
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", "https://api.github.com/users/" + uName + "/repos", true);
    xmlhttp.overrideMimeType("application/json");    
    xmlhttp.onreadystatechange = function() {
       
           if (xmlhttp.readyState == 4 && xmlhttp.status == 200){
               callback (xmlhttp.responseText);
            }
    };
    xmlhttp.send();
}
    
    callRjson(function (response){
        var repo_JSON = JSON.parse(response);
        console.log(repo_JSON);  
        document.getElementById('name').value = "";

        //PUT REPOSITORIES IN HTML
        var head = document.createElement("h1");
        head.innerHTML = "Repositories";
        var dataRepos = document.getElementById("dataRepos");
        dataRepos.append(head);
        //PUT LINE DOWN TITLE
        var titleLine = document.createElement("div");
        titleLine.classList.add('titleLine');
        dataRepos.append(titleLine);
       
        //CREATE DIV FOR ALL REPOSITORIES
        var wholeRepos = document.createElement("div");
        wholeRepos.classList.add('wholeRepos');
       
        //PUT INSIDE EACH REPOSITORIES IN DIV'S
        repo_JSON.forEach(function (value, key) {
        var star = document.createElement("img");
        var fork = document.createElement("img");
        star.setAttribute("src", "img/star.jpg");
        fork.setAttribute("src", "img/fork.jpg");
        
            //MAKE A DIV FOR EACH TITLE REPO
        var repoName = document.createElement('div');
        repoName.classList.add('repoName')    
        repoName.append(repo_JSON[key].name);
        
            //MAKE DIVS FOR EACH IMAGE WITH STAR AND FORK   
            
        var itemDiv = document.createElement('div');
        itemDiv.classList.add('itemDiv');
        itemDiv.append(star);
        itemDiv.append(repo_JSON[key].stargazers_count);
        itemDiv.append(fork);
        itemDiv.append(repo_JSON[key].forks_count);
            
            //MAKE A DIV FOR EACH REPO TITLE AND ITEMS

        var repoUser = document.createElement('div');
        repoUser.classList.add('repoUser');
        repoUser.append(repoName,itemDiv);
        var repoUserLine = document.createElement('div');
        repoUserLine.classList.add('repoUserLine');
        var eachRepo = document.createElement('div');
        eachRepo.classList.add('eachRepo');
        eachRepo.append(repoUser);
        eachRepo.append(repoUserLine);
        wholeRepos.append(eachRepo);
        });
        dataRepos.append(wholeRepos);
    });
}