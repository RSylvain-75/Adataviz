const navigation = document.getElementById("navigation");

const titrePresentation = document.getElementById("titre_presentation");
const textePresentation = document.getElementById("texte_presentation");
const filtresRapides = document.getElementById("filtres_rapides");

const imageSlider = document.getElementById("image_slider");
const texteSlider = document.getElementById("texte_slider");
const boutonPrecedent = document.getElementById("slider_precedent");
const boutonSuivant = document.getElementById("slider_suivant");

const titreProchains = document.getElementById("titre_prochains");
const prochainsEvenements = document.getElementById("prochains_evenements");

const titreListeEvenements = document.getElementById("titre_liste_evenements");
const sectionEvenements = document.getElementById("liste_evenements");

const titreCarte = document.getElementById("titre_carte");
const texteCarte = document.getElementById("texte_carte");

const texteFooter = document.getElementById("texte_footer");

const labelRecherche = document.getElementById("label_recherche");
const labelCategorie = document.getElementById("label_categorie");
const selectCategorie = document.getElementById("categorie");

const selectPrix = document.getElementById("prix");
const labelPrix = document.getElementById("label_prix");
const boutonTri = document.getElementById("bouton_tri");


titrePresentation.textContent = "Découvrez les événements à Paris";
textePresentation.textContent = "Retrouver les expositions, concerts, festivals et activités organisés à Paris.";
titreProchains.textContent = "Prochains événements";
titreListeEvenements.textContent = "Tous les événements";
titreCarte.textContent = "Carte des événements";
texteCarte.textContent = "Localisation des événements.";
texteFooter.textContent = "© 2026 Paris Events";

labelRecherche.textContent = "Rechercher";
labelCategorie.textContent = "Catégorie";
labelPrix.textContent = "Prix";
boutonTri.textContent = "Filtrer";


const liensNavigation = [
{ texte: "Accueil", href: "index.html" },
{ texte: "Événements", href: "#liste_evenements" },
{ texte: "Carte", href: "#carte" },
];

liensNavigation.forEach((lien) => {
const elementLien = document.createElement("a");

  elementLien.classList.add("lien_navigation");
  elementLien.href = lien.href;
  elementLien.textContent = lien.texte;

  navigation.appendChild(elementLien);
});

const categoriesRapides = [
  "Expositions",
  "Concerts",
  "Festivals",
  "Visites",
  "Ateliers",
];

categoriesRapides.forEach((nomCategorie) => {

const filtreRapide = document.createElement("li");
  filtreRapide.classList.add("filtre_rapide")
  filtreRapide.textContent = nomCategorie;

  filtresRapides.appendChild(filtreRapide);
});

const optionCategories = [
  "Toutes",
  "Expositions",
  "Concerts",
  "Festivals",
  "Visites",
  "Ateliers",
];
optionCategories.forEach((nomCategorie) => {
const optionCategorie = document.createElement("option");
  optionCategorie.value = nomCategorie;
  optionCategorie.textContent = nomCategorie;

  selectCategorie.appendChild(optionCategorie);
});

const optionsPrix = [
  "Tous",
  "Gratuit",
  "Payant",
];

optionsPrix.forEach((prix) => {
  const optionPrix = document.createElement("option");
  optionPrix.value = prix;
  optionPrix.textContent = prix;

  selectPrix.appendChild(optionPrix);
});




const getData = async () => {
  try {
    const response = await fetch(
      "https://opendata.paris.fr/api/explore/v2.1/catalog/datasets/que-faire-a-paris-/records?limit=20"
    );

    const jsonData = await response.json();

    const evenementsAvecImage = jsonData.results.filter(
      (event) => event.cover_url
    );

    let indexSlider = 0;
    let intervalSlider;

    const afficherSlide = () => {
    const event = evenementsAvecImage[indexSlider];

      imageSlider.src = event.cover_url;
      imageSlider.alt = event.cover_alt || event.title || "Image de l'événement";

      texteSlider.textContent = event.title || "Événement sans titre";
    };

    const slideSuivante = () => {
      indexSlider++;

      if (indexSlider >= evenementsAvecImage.length) {
        indexSlider = 0;
      }
      afficherSlide();
    };

    const slidePrecedente = () => {
      indexSlider--;

      if (indexSlider < 0) {
        indexSlider = evenementsAvecImage.length - 1;
      }

      afficherSlide();
    };

    const demarrerSliderAutomatique = () => {
      intervalSlider = setInterval(() => {
        slideSuivante();
      }, 3000);
    };

    const reinitialiserSliderAutomatique = () => {
      clearInterval(intervalSlider);
      demarrerSliderAutomatique();
    };

    if (evenementsAvecImage.length > 0) {
      afficherSlide();
      demarrerSliderAutomatique();

      boutonSuivant.addEventListener("click", () => {
        slideSuivante();
        reinitialiserSliderAutomatique();
      });

      boutonPrecedent.addEventListener("click", () => {
        slidePrecedente();
        reinitialiserSliderAutomatique();
      });
    }

    jsonData.results.slice(0, 3).forEach((event) => {
      const prochainEvenement = document.createElement("li");

      prochainEvenement.classList.add("prochain_evenement");
      prochainEvenement.textContent =
        event.title || "Événement sans titre";

      prochainsEvenements.appendChild(prochainEvenement);
    });

    jsonData.results.forEach((event) => {
      const carte = document.createElement("article");
      const titre = document.createElement("h3");
      const resume = document.createElement("p");
      const date = document.createElement("p");
      const lieu = document.createElement("p");
      const prix = document.createElement("p");
      const footer = document.createElement("footer");
      const boutonDetail = document.createElement("a");
      const boutonReservation = document.createElement("a");

      carte.classList.add("carte_evenement");

      if (event.cover_url) {
        const image = document.createElement("img");

        image.classList.add("image_evenement");
        image.src = event.cover_url;
        image.alt = event.cover_alt || event.title || "Image de l'événement";

        carte.appendChild(image);
      }

      titre.classList.add("titre_evenement");
      titre.textContent = event.title || "Événement sans titre";

      resume.classList.add("resume_evenement");
      resume.textContent =
        event.lead_text || "Aucun résumé disponible";

      date.classList.add("date_evenement");

      let dateFormatee = "Date non communiquée";
          if (event.date_start) {
          dateFormatee = new Date(event.date_start).toLocaleString("fr-FR", {
          weekday: "long",
          day: "numeric",
          month: "long",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        });
      }
      date.textContent = `📅 ${dateFormatee}`;

      lieu.classList.add("lieu_evenement");
      lieu.textContent = `📍 ${event.address_name || "Lieu non communiqué"}`;

      prix.classList.add("prix_evenement");
      prix.textContent = `💰 ${event.price_type || "Non communiqué"}`;

      carte.appendChild(titre);
      carte.appendChild(resume);
      carte.appendChild(date);
      carte.appendChild(lieu);
      carte.appendChild(prix);

      if (event.tags && event.tags.length > 0) {
        const listeTags = document.createElement("ul");

        listeTags.classList.add("liste_tags");

        event.tags.forEach((tag) => {
          const item = document.createElement("li");

          item.classList.add("tag_evenement");
          item.textContent = tag;

          listeTags.appendChild(item);
        });

        carte.appendChild(listeTags);
      }

      footer.classList.add("boutons_evenement");

      boutonDetail.classList.add("bouton_detail");
      boutonDetail.href = event.url || "#";
      boutonDetail.textContent = "Voir le détail";

      boutonReservation.classList.add("bouton_reserver");
      boutonReservation.href = event.url || "#";
      boutonReservation.textContent = "Réserver";

      footer.appendChild(boutonDetail);
      footer.appendChild(boutonReservation);

      carte.appendChild(footer);

      sectionEvenements.appendChild(carte);
    });
  } catch (error) {
    console.error(error);
  }
};

getData();

const entete = document.getElementById("entete");
const listeEvenements = document.getElementById("liste_evenements");

window.addEventListener("scroll", () => {
  const position = listeEvenements.offsetTop - 120;

  if (window.scrollY >= position) {
    entete.classList.add("entete_cachee");
  } else {
    entete.classList.remove("entete_cachee");
  }
});