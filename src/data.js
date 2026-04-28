import { winesByBottle } from './content/wines/index.js';

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  navBar: {
    domaine: {
      fr: "domaine",
      en: "domaine",
    },
    wines: {
      fr: "nos vins",
      en: "our wines",
    },
    store: {
      fr: "boutique",
      en: "wine shop",
    },
    news: {
      fr: "nos actualités",
      en: "our news",
    },
    contact: {
      fr: "contact",
      en: "contact",
    }
  },
  domainePage: {
    p1: {
      fr: "En 1947, François Bernillon s'installe commme viticulteur sur les hauteurs du Mont Brouilly. En 1973, son fils Alain reprend l'exploitation et fait prospérer l'entreprise. Depuis 2015, le Domaine a été repris par sa fille et son gendre, Mariannick et Guillaume qui représente ainsi la 3eme génération de viticulteur. La propriété s'étend aujourd'hui sur 7 Hectares sur la commune de Saint-Lager. Notre domaine produit deux crus du Beaujolais : Brouilly et Côte de Brouilly.",
      en: "In 1947, François Bernillon set up as a wine producer on the heights of the Mont Brouilly. In 1973, his son Alain took over the business and grew business. Since 2015, the Domaine has been taken over by his daughter and son-in-law, Mariannick and Guillaume, who thus represent the 3rd generation of wine producers. The property now extends over 7 Hectares in the municipality of Saint-Lager. Our estate produces two Beaujolais crus: Brouilly and Côte de Brouilly.",
    },
    p2: {
      fr: "Notre vignoble bien exposé à flanc de coteaux est situé sur le versant sud-est de la célèbre Montagne de Brouilly. Le plus grand soin est apporté tant à la culture qu'à la vinification. Nos crus sont élaborés à partir d'un cépage unique de Gamay noir à jus blanc. Les vendanges sont exclusivement manuelles et la récolte est triée méticuleusement.",
      en: "Our well-exposed hillside vineyard is located on the south-eastern slope of the famous Montagne de Brouilly. The greatest care is taken both in the cultivation and in the vinification. Our wines are made from a single grape variety of 'Gamay noir à jus blanc'. The harvest is exclusively manual and is meticulously sorted."
    },
    p3: {
      fr: "Toute la saveur, l'originalité et la qualité des vins du domaine sont issues du savoir-faire d'une production élaborée dans les respect du terroir alliée aux connaissances scientifiques oenologiques, aux techniques de productions et de transformation les plus modernes.",
      en: "All the flavor, originality and quality of the estate's wines come from the know-how of a production developed with respect for the terroir combined with scientific oenological knowledge, the most modern production and processing techniques."
    }
  },
  winesPage: {
    comment: {
      fr: "commentaire de dégustation",
      en: "tasting comments",
    },
    accord: {
      fr: "accord mets et vins",
      en: "food and wine pairing",
    },
    info: {
      title: {
        fr: "Information sur le vin",
        en: "Information about the wine",
      },
      domaine: {
        fr: "Domaine",
        en: "Domaine",
      },
      region: {
        fr: "Région",
        en: "Region",
      },
      appell: {
        fr: "Appellation",
        en: "Appellation",
      },
      cepage: {
        fr: "Cépage",
        en: "Vine Stock",
      },
      condition: {
        fr: "Conditionnement",
        en: "Conditioning",
      },
      temp: {
        fr: "Température de Servie",
        en: "Best Served At",
      },
      garde: {
        fr: "Garde",
        en: "Aging",
      },
      details: {
        fr: "CARACTERISQUE DU VIN",
        en: "WINE CHARACTERISTICS",
      },
      fruite: {
        fr: "Fruité",
        en: "Fruit",
      },
      mineral: {
        fr: "Minéral",
        en: "Mineral",
      },
      epice: {
        fr: "épice",
        en: "spices",
      } ,
      puissance: {
        fr: "puissance",
        en: "body",
      },
      floral: {
        fr: "floral",
        en: "flower",
      },
      boise: {
        fr: "boisé",
        en: "aok",
      } ,
      acidite: {
        fr: "acidité",
        en: "acidity",
      },
    },
    Elixir: winesByBottle.Elixir,
    Godefroy: winesByBottle.Godefroy,
    Brouilly: winesByBottle.Brouilly,
    CDB: winesByBottle.CDB,
    Passion: winesByBottle.Passion,
    BeaujolaisVillage : {
      region : "Beaujolais",
      appel : "Beaujolais Village",
      cepage : "Gamay ",
      conditionnement : "0.75 cL",
      desc : {
        fr: "Ce Beaujolais Villages élaboré traditionnellement vous surprendra par sa rondeur, son fruité et sa gourmandise. De légères notes de fruits rouges comme la cerise ou la groseille viendront égayer vos papilles. Dégustez le entre amis avec un barbecue ou une plancha et vous serez comblé!",
        en: "This traditionally produced Beaujolais Villages will surprise you with its fruitiness, delicacy and rounded flavor. Slight notes of red fruits such as cherry or redcurrant will brighten up your taste buds. Enjoy it with friends at a barbecue or around a plancha and you will be delighted!f",
      },
      caract : {
        fruite: 4,
        mineral: 0,
        epice: 1, 
        puissance: 3,
        floral: 2,
        boise: 0, 
        acidite: 2,
      },
      garde: "1 à 3 ans (à boire jeune)",
      temp: "12 - 14°C",
      assoc : {
        fr: "Charcuteries et viandes salées, hors d’oeuvre chauds et tartes salées, légumes, âtes et riz, soupes et potages, terrines et pâtés, viandes rouges grillées et rôties",
        en: "Cold meats and salted meats, hot appetizers and savory pies, vegetables, pasta and rice, soups and soups, terrines and pâtés, grilled and roasted red meats",
      },
    },
    SansArtifice: winesByBottle.SansArtifice,
  },
  contactPage: {
    info1: {
      fr: "Envoyez nous un message",
      en: "Send us a message",
    },
    thanks: {
      fr: "Merci pour votre message.",
      en: "Thank you for your message",
    },
    fname: {
      fr: "Prénom",
      en: "First Name",
    },
    lname: {
      fr: "Nom",
      en: "Last Name",
    },
    tel: {
      fr: "Numéro de téléphone",
      en: "Phone number",
    },
    email: {
      fr: "Adresse E-mail",
      en: "Email Address",
    },
    message: {
      fr: "Votre message.",
      en: "Your message",
    },
    button: {
      fr: "envoyer",
      en: "send",
    },
  },
};
