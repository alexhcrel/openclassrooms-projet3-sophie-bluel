//OUVERTURE DE LA GALERIE DE LA MODALE
const modal1 = document.querySelector("#modal1")
const modal2 = document.querySelector("#modal2")
const ajout = document.querySelector(".ajout")
ajout.addEventListener("click", function(){
    //modal1.style = "display:none"
    modal2.style = "display:flex"
})

//DEFINISSION DES ACTIONS POUR RETURN & CLOSE
document.querySelector(".js-modal-return").addEventListener("click", function () {
    modal1.style="display:flex"
    modal2.style = "display:none"
})
document.querySelector(".js-modal-close2").addEventListener("click", function () {
    modal2.style="display:none"
})

//RECUPERATION DES CATEGORIES & DU TOKEN VIA LE LOCALHOST
const categories = await fetch("http://localhost:5678/api/categories")
const cat = await categories.json();
const adminToken = sessionStorage.getItem('adminToken')

//CREATION DE LA FONCTION POUR AJOUTER LES FIGURES
const formulaire = document.querySelector("#formulaire_ajout_figure")


let inputFile = document.querySelector("#ajout_image")
inputFile.classList.add("fileInput");
inputFile.setAttribute("accept",".png, .jpg, .jpeg");
inputFile.type= "file";

async function ajoutFigure () {

    // RECUPERATION DES DONNEES DE L'IMAGE    

    // récupération du title
    const titleValue = document.querySelector("#title").value
    let categoryValue = document.querySelector("#category").value;
    //récupération de l'url de l'image
    let inputFile = document.querySelector("#ajout_image")
    const file = inputFile.files[0]

    if (titleValue && file) {
        } else {alert("Formulaire incomplet")
    }

    //transformation de la valeur en number
    function roughScale(x, base) {
        const parsed = parseInt(x, base);
        if (isNaN(parsed)) {
            return 0
        } else {
            return parsed;
        }     
    }
    let categoryValueInt = roughScale(categoryValue, 10)

    //CREATION DU FORMDATA
    let formData = new FormData();
    formData.append('title', titleValue)
    formData.append('image', file)
    formData.append('category', categoryValueInt)

    if (formData) {
        await fetch('http://localhost:5678/api/works', {
            method: 'POST',
            headers: {
                'Authorization':`Bearer ${adminToken}`,
                'accept': 'application/json',
            },
            body: formData
        })
    }
}

formulaire.addEventListener("submit", function(event) {
    event.preventDefault()
    ajoutFigure()
}) 

/*
CODE DEVELOPPE MAIS FINALEMENT INUTILE

  let binaryString
        const reader = new FileReader();
        reader.readAsBinaryString(file);
        reader.onload = function() {
            // Convertissez le Blob en une chaîne de caractères
            binaryString = reader.result;
           console.log(binaryString)
            // Utilisez la chaîne de caractères au format binaire
            // par exemple, envoyez-la à un serveur via une requête XHR
          };

    //const result = await read(file);
   
*/