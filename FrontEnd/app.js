let modal = null

//OUVERTURE DE LA MODALE AU CLICK DU BOUTON MODIFIER
const openModal = function(e) {
    e.preventDefault()
    const target = document.querySelector('#modal1')
    target.style.display = null
    target.setAttribute('aria-hidden', false)
    target.setAttribute('aria-modal', true)
    modal = target
    modal.addEventListener('click', closeModal)
    modal.querySelector('.js-modal-close').addEventListener('click', closeModal)
    modal.querySelector('.js-modal-stop').addEventListener('click', stopPropagation)
}

//OUVERTURE DE LA MODALE AU CLICK SUR LA CROIX
const closeModal = function (e) {
    console.log("close")
    if (modal === null) return
    e.preventDefault()
    modal.style.display = 'none'
    modal.setAttribute('aria-hidden', 'true')
    modal.removeAttribute('aria-modal')
    modal.removeEventListener('click', closeModal)
    modal.querySelector('.js-modal-close').removeEventListener('click', closeModal)
    modal.querySelector('.js-modal-stop').removeEventListener('click', stopPropagation)
    modal = null
}

const stopPropagation = function (e) {
e.stopPropagation()
}

// Récupération de l'élément du DOM qui accueillera le bouton

//Alimentation de la modale
let reponse = await fetch("http://localhost:5678/api/works");
let projets = await reponse.json();

function genererProjetsModal(projets) {
    for (let i = 0 ; i < projets.length; i++) {
        const projet = projets[i];
     
        // Récupération de l'élément du DOM qui accueillera figures
        const galleryModal = document.querySelector(".gallery_modal");

        // Création d’une balise dédiée au projet
        const figure = document.createElement("figure");
        figure.id = "fig" + projet.id
        figure.className = "figures"
        galleryModal.appendChild(figure);
                
        // Création des balises 
        const image = document.createElement("img");
        image.src = projet.imageUrl;
        figure.appendChild(image)

        const figcaption = document.createElement("figcaption");
        figcaption.innerText = "editer";
        figure.appendChild(figcaption);
        
        const suppression = document.createElement("button");
        suppression.className = "boutonSuppression"
        suppression.id = projet.id
        suppression.type = "submit" 
        suppression.addEventListener('click', async function() {
            const id = projet.id
            await fetch(`http://localhost:5678/api/works/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${sessionStorage.adminToken}`,
            }})
            // .then(document.querySelector(".gallery_modal").innerHTML="")
            .then(document.querySelector(".gallery_modal").removeChild(document.querySelector("#fig" + id)))
            .catch(err => console.log(err))
        })


        figure.appendChild(suppression);

        const iconSuppression = document.createElement("i");
        iconSuppression.className = "fa-solid fa-trash-can"
        //iconSuppression.src = "assets/icons/trash-can-solid.svg"
        suppression.appendChild(iconSuppression)
        
        //problème à voir avec le bouton deplacement
        function genererBoutonDeplacement() {
            const boutonDeplacement = document.createElement("button");
            boutonDeplacement.className = "boutonDeplacement"
            //boutonDeplacement.id = i +1
            //boutonDeplacement.style = "display:none"
            
            figure.appendChild(boutonDeplacement);
            /*figure.addEventListener("mouseover", function() {
                if(boutonDeplacement.id === figure.id) {
                boutonDeplacement.style = "display:block"
                }
            })
               */
            const iconDeplacement = document.createElement("i");
            iconDeplacement.className = "fa-solid fa-arrows-up-down-left-right"
            boutonDeplacement.appendChild(iconDeplacement)
        }
        genererBoutonDeplacement()
    }
 
} 

// premier affichage de la page
document.querySelector(".js-modal").addEventListener('click', openModal, genererProjetsModal(projets))
/*
let boutonSuppression = document.querySelectorAll(".boutonSuppression")
for(let i in projets) {
    //boutonSuppression[i].id = projets[i].id
    //boutonSuppression.type = "submit" 
    // boutonSuppression[i].addEventListener('click', async function() {
    //     const id = boutonSuppression[i].id
    //     await fetch(`http://localhost:5678/api/works/${id}`, {
    //         method: "DELETE",
    //         headers: {
    //             "Content-Type": "application/json",
    //             "Authorization": `Bearer ${sessionStorage.adminToken}`,
    //     }})
    //     // .then(document.querySelector(".gallery_modal").innerHTML="")
        
    //     .catch(err => console.log(err))
    // })
}



   */
    



    

