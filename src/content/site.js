export const domainPageDefault = {
  title: {
    fr: 'Domaine des Fournelles',
    en: 'Domaine des Fournelles',
  },
  paragraphs: {
    p1: {
      fr: "En 1947, François Bernillon s'installe commme viticulteur sur les hauteurs du Mont Brouilly. En 1973, son fils Alain reprend l'exploitation et fait prospérer l'entreprise. Depuis 2015, le Domaine a été repris par sa fille et son gendre, Mariannick et Guillaume qui représente ainsi la 3eme génération de viticulteur. La propriété s'étend aujourd'hui sur 7 Hectares sur la commune de Saint-Lager. Notre domaine produit deux crus du Beaujolais : Brouilly et Côte de Brouilly.",
      en: 'In 1947, François Bernillon set up as a wine producer on the heights of the Mont Brouilly. In 1973, his son Alain took over the business and grew business. Since 2015, the Domaine has been taken over by his daughter and son-in-law, Mariannick and Guillaume, who thus represent the 3rd generation of wine producers. The property now extends over 7 Hectares in the municipality of Saint-Lager. Our estate produces two Beaujolais crus: Brouilly and Côte de Brouilly.',
    },
    p2: {
      fr: "Notre vignoble bien exposé à flanc de coteaux est situé sur le versant sud-est de la célèbre Montagne de Brouilly. Le plus grand soin est apporté tant à la culture qu'à la vinification. Nos crus sont élaborés à partir d'un cépage unique de Gamay noir à jus blanc. Les vendanges sont exclusivement manuelles et la récolte est triée méticuleusement.",
      en: "Our well-exposed hillside vineyard is located on the south-eastern slope of the famous Montagne de Brouilly. The greatest care is taken both in the cultivation and in the vinification. Our wines are made from a single grape variety of 'Gamay noir à jus blanc'. The harvest is exclusively manual and is meticulously sorted.",
    },
    p3: {
      fr: "Toute la saveur, l'originalité et la qualité des vins du domaine sont issues du savoir-faire d'une production élaborée dans les respect du terroir alliée aux connaissances scientifiques oenologiques, aux techniques de productions et de transformation les plus modernes.",
      en: "All the flavor, originality and quality of the estate's wines come from the know-how of a production developed with respect for the terroir combined with scientific oenological knowledge, the most modern production and processing techniques.",
    },
  },
};

export const getDomainParagraphEntries = (paragraphs = {}) => (
  Object.entries(paragraphs)
    .sort(([keyA], [keyB]) => {
      const orderA = Number(String(keyA).replace(/\D/g, '')) || 0;
      const orderB = Number(String(keyB).replace(/\D/g, '')) || 0;
      return orderA - orderB;
    })
);

export const contactPageDefault = {
  left: {
    pageTitle: {
      fr: 'Contact',
      en: 'Contact',
    },
    estateTitle: {
      fr: 'Domaine des Fournelles',
      en: 'Domaine des Fournelles',
    },
    owners: {
      fr: 'Guillaume et Mariannick Dumontet.',
      en: 'Guillaume and Mariannick Dumontet.',
    },
    addressLine1: {
      fr: '137 Montée de Godefoyr,',
      en: '137 Montée de Godefoyr,',
    },
    addressLine2: {
      fr: '69220 Saint-Lager,',
      en: '69220 Saint-Lager,',
    },
    addressLine3: {
      fr: 'France',
      en: 'France',
    },
    phoneGuillaume: '+33 6 79 17 27 53',
    phoneMariannick: '+33 6 71 01 11 66',
    email: 'domainedesfournelles@outlook.fr',
  },
  form: {
    info1: {
      fr: 'Envoyez nous un message',
      en: 'Send us a message',
    },
    thanks: {
      fr: 'Merci pour votre message.',
      en: 'Thank you for your message',
    },
    fname: {
      fr: 'Prénom',
      en: 'First Name',
    },
    lname: {
      fr: 'Nom',
      en: 'Last Name',
    },
    tel: {
      fr: 'Numéro de téléphone',
      en: 'Phone number',
    },
    email: {
      fr: 'Adresse E-mail',
      en: 'Email Address',
    },
    message: {
      fr: 'Votre message.',
      en: 'Your message',
    },
    button: {
      fr: 'envoyer',
      en: 'send',
    },
  },
};

export const siteContentDefaults = {
  domain_page: domainPageDefault,
  contact_page: contactPageDefault,
};
