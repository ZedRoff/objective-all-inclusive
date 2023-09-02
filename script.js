












function lmao() {
  // Système de la navbar

let navIcon = document.getElementById("clicker");
let nav = document.getElementById("navbar");
let x = 0;
navIcon.addEventListener("click", () => {
  if (x == 0) {
  
    nav.style.display = "flex";
    x = 1;
  } else {
    nav.style.display = "none";
    x = 0;
  }
});

// Système d'effet typing
let original = "# Objective All Inclusive";
let xw = original.length;
let y = 0;
let texte = "";
setInterval(() => {
  if (y == xw) {
    texte = "";
    y = 0;
  } else {
    texte += original[y];
    document.getElementById("riche").textContent = texte;
    y++;
  }
}, 100);

// Déclaration des variables 
let ele = document.getElementById("textarea_w");
let ul = document.getElementById("ul");





document.addEventListener("keyup", () => {
  ul.innerHTML = "";
  let val = ele.value.split("\n");
  for (let i = 1; i <= val.length; i++) {
    let new_ctt = document.createElement("p");
    new_ctt.setAttribute("id", "li");
    new_ctt.innerHTML = i;
    ul.appendChild(new_ctt);
  }
});

document.getElementById("act2").addEventListener("click", () => {
  var copyText = document.getElementById("textarea_w");

  copyText.select();
  document.execCommand("copy");

  alert("Le texte a été copié dans votre presse-papier");
});
let error = document.getElementById("demo");
document.getElementById("ajouter_w").addEventListener("click", (e) => {
  e.preventDefault();
  let mot_non_inclusif = document.getElementById("mot_non_inclusif").value;
  let mot_inclusif = document.getElementById("mot_inclusif").value;
  axios
    .get(
      `/postword/${mot_non_inclusif}/${mot_inclusif}`
    )
    .then((res) => {
      let message = res.data.message;
      if (message == "not found") {
        error.textContent = "MOT CORRECTEMENT AJOUTER";
      } else if (message == "found") {
        error.textContent = "MOT DEJA RAJOUTER";
      } else {
        error.textContent =
          "ERREUR INCONNUE MERCI DE CONTACTER LE CREATEUR DU SITE";
      }
    });
});
let db1;
let db2;
axios.get("/getword").then((res) => {
  let message = res.data.message;
  db1 = res.data.message[0];
  db2 = res.data.message[1];
});

function fetch_exact(word) {
  if (word.length == 0) {
    elem4.textContent = "";
    return;
  }
  for (let i = 0; i < db1.length; i++) {
    if (typeof db1[i] == "object") {
      for (let j = 0; j < db1[i].length; j++) {
        if (db1[i][j] == word) {
          return db2[i];
        }
      }
    } else {
      if (db1[i] == word) {
        return db2[i];
      }
    }
  }
  return "";
}

function fetch(word, db_1, db_2) {
  if (word.length == 0) {
    elem4.textContent = "";
    return;
  }
  for (let i = 0; i < db1.length; i++) {
    if (typeof db1[i] == "object") {
      for (let j = 0; j < db1[i].length; j++) {
        if (db1[i][j].includes(word)) {
          return db2[i];
        }
      }
    } else {
      if (db1[i].includes(word)) {
        return db2[i];
      }
    }
  }
  return "";
}

let elem = document.getElementById("textarea_w");

let elem3 = document.getElementById("consider");
let elem4 = document.getElementById("cc");
elem3.addEventListener("click", () => {
  if (
    elem4.textContent.length == 0 ||
    elem4.textContent == "Aucune suggestion pour ce mot"
  )
    return;
  let getter = elem.value.split("\n");
  for(let i=0;i<getter.length;i++) {
    getter[i] = getter[i].split(" ")
  }
  
  getter[getter.length - 1][getter[getter.length - 1].length - 1] = elem4.textContent;
  elem.value = ""
 for (let i = 0; i < getter.length; i++) {
  elem.value = elem.value + getter[i].join(" ") + "\n";
      }
 
  elem4.innerHTML = "";
  elem.focus();
});
document.addEventListener("keyup", () => {
  elem.scrollTop = elem.scrollHeight;

  let elem2 = document.getElementById("cc");

  let value = elem.value.toLowerCase();

  let temp = value.split("\n");

  if (temp.length > 1) {
    value = temp[temp.length - 1].split(" ");
    value = value[value.length - 1];
  } else {
    value = value.split(" ");

    value = value[value.length - 1];
  }

  const filterer = fetch(value, db1, db2);
  if (typeof filterer == "undefined")
    return (document.getElementById("cc").textContent = "Rien n'a été trouvé");

  if (filterer.length == 0) {
    elem2.innerHTML = "Aucune suggestion pour ce mot";
  } else {
    elem2.textContent = filterer;
  }
});

document.getElementById("act").addEventListener("click", () => {
     document.getElementById("chr").textContent = "CORRECTEUR INCLUSIF"

  document.getElementById("sugg_trouver").innerHTML = "";
  let getter = elem.value.toLowerCase().split("\n");

  for (let i = 0; i < getter.length; i++) {
    getter[i] = getter[i].split(" ");
    for (let j = 0; j < getter[i].length; j++) {
      let re = getter[i][j].toLowerCase();

      if (getter[i][j].length == 0) {
        break;
      }
      let filterer = fetch_exact(re);

      if (typeof filterer == "undefined") {
        document.getElementById("sugg_trouver").textContent =
          "Rien n'a été trouvé";
        break;
      }
      if (filterer.length != 0) {
        let new_li = document.createElement("li");
        new_li.setAttribute("class", "new_ant");
        new_li.setAttribute("data-coords", i + ";" + j);
        new_li.setAttribute("data-corr", filterer);
        new_li.textContent =
          "Position : " + i + ";" + j + " " + re + " => " + filterer;
        document.getElementById("sugg_trouver").appendChild(new_li);
      }
    }
  }

  let els = document.getElementsByClassName("new_ant");

  for (let k = 0; k < els.length; k++) {
    let el = els[k];
    el.addEventListener("click", () => {
      let coords = el.getAttribute("data-coords").split(";");
      let getter = elem.value.toLowerCase().split("\n");

      for (let i = 0; i < getter.length; i++) {
        getter[i] = getter[i].split(" ");
        for (let j = 0; j < getter[i].length; j++) {
          getter[coords[0]][coords[1]] = el.getAttribute("data-corr");
          el.innerHTML = "";
          el.remove();
        }
      }
      elem.value = "";
      for (let i = 0; i < getter.length; i++) {
        elem.value = elem.value + getter[i].join(" ") + "\n";
      }
    });
  }
  
  
});

let elems = document.getElementsByClassName("formater");

let accueil = document.getElementById("accueil");
let presentation = document.getElementById("presentation");
let outil = document.getElementById("outil");
let ajouter = document.getElementById("ajouter");
let form = document.getElementById("formulaire");
for (let i = 0; i < elems.length; i++) {
  elems[i].addEventListener("click", () => {
    let consider = elems[i].getAttribute("id").toLowerCase();
document.body.scrollTop = 0
    if (consider == "accueil") {
      accueil.style.display = "flex";
      presentation.style.display = "none";
      outil.style.display = "none";
      ajouter.style.display = "none";
      form.style.display = "none";
    } else if (consider == "présentation") {
      accueil.style.display = "none";
      presentation.style.display = "flex";
      outil.style.display = "none";
      ajouter.style.display = "none";
      form.style.display = "none";
    } else if (consider == "outil") {
      accueil.style.display = "none";
      presentation.style.display = "none";
      outil.style.display = "flex";
      ajouter.style.display = "none";
      form.style.display = "none";
    } else if (consider == "ajouter") {
      accueil.style.display = "none";
      presentation.style.display = "none";
      outil.style.display = "none";
      ajouter.style.display = "flex";
      form.style.display = "none";
    } else if (consider == "formulaire") {
      accueil.style.display = "none";
      presentation.style.display = "none";
      outil.style.display = "none";
      ajouter.style.display = "none";
      form.style.display = "flex";
    }
  });
}


 let el_w = document.getElementById("act3");
   let el4 = document.getElementById("textarea_w")
  el_w.addEventListener("click", () => {
     
   if(el4.value.length == 0) return alert("Vous ne pouvez pas installer un fichier vide.")
   
   window.location = `/download/${el4.value}`
   })

 document.getElementById("act4").addEventListener("click", () => {
     let selectedFile = document.getElementById('file').files[0];

var reader = new FileReader();
reader.onload = function(event) { 
 
  elem.value = reader.result; 
  let q = reader.result.split("\n")

  elem.value = ""
  for(let i=0;i<q.length;i++) {
    elem.value = elem.value +  q[i].replace("\r", "") + "\n"
  }
  ul.innerHTML = "";
  let val = ele.value.split("\n");
  for (let i = 1; i <= val.length; i++) {
    let new_ctt = document.createElement("p");
    new_ctt.setAttribute("id", "li");
    new_ctt.innerHTML = i;
    ul.appendChild(new_ctt);
  }
};
 reader.readAsText(selectedFile)

  })
   

document.getElementById("act5").addEventListener("click", () => {
     document.getElementById("chr").textContent = "CORRECTEUR DE GRAMMAIRE"

 document.getElementById("sugg_trouver").innerHTML = "";
  let getter = elem.value.toLowerCase().split("\n");

  for (let i = 0; i < getter.length; i++) {
     axios.get(`/verif/${getter[i]}`).then(r => {
     for(let j=0;j<r.data.message.length;j++) {
   
   let s = r.data.message[j].replacements;
  
   let tab = []
   for(let k=0;k<s.length;k++) {
   
     tab.push(s[k].value)
   }
       tab = tab.map(r => r.toLowerCase())
      
             let new_li = document.createElement("li");
        new_li.setAttribute("class", "new_ant");
     console.log(tab, r.data.message[j].word)
        new_li.textContent = `${r.data.message[j].word} => ${tab.join(" | ")}`
        document.getElementById("sugg_trouver").appendChild(new_li);

        
 

 }

   })
      }
 
     
    
  
})
}
chrome.scripting.executeScript({
    target: {allFrames: true},
    function: lmao(),
});

