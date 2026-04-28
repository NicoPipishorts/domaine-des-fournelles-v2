import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { hasSupabaseConfig, supabaseClient, wineBucketName } from '../../supabase/client';
import logo from '../../assets/images/PageLogo-B.png';
import { contactPageDefault, domainPageDefault } from '../../content/site';
import './styles.scss';

const emptyCredentials = {
  email: '',
  password: '',
};

const adminSections = [
  { id: 'products', label: 'Produits', description: 'Catalogue vins', enabled: true },
  { id: 'domain', label: 'Domaine', description: 'Présentation du domaine', enabled: true },
  { id: 'contact', label: 'Contact', description: 'Coordonnées et formulaire', enabled: true },
];

const profileFields = [
  { label: 'Clé bouteille', path: 'bottle' },
  { label: 'Région', path: 'region' },
  { label: 'Appellation', path: 'appel' },
  { label: 'Cépage', path: 'cepage' },
  { label: 'Conditionnement', path: 'conditionnement' },
  { label: 'Prix', path: 'price', placeholder: 'Ex. 14,50 €' },
  { label: 'Garde', path: 'garde' },
  { label: 'Température de service', path: 'temp' },
];

const characterFields = [
  { label: 'Fruité', path: 'caract.fruite' },
  { label: 'Minéral', path: 'caract.mineral' },
  { label: 'Épice', path: 'caract.epice' },
  { label: 'Puissance', path: 'caract.puissance' },
  { label: 'Floral', path: 'caract.floral' },
  { label: 'Boisé', path: 'caract.boise' },
  { label: 'Acidité', path: 'caract.acidite' },
];

const localizedFieldsBySection = {
  products: ['wineName', 'desc', 'assoc'],
  domain: ['title', 'paragraphs'],
  contact: ['left'],
};

const serialize = (value) => JSON.stringify(value);

const parseJsonResponse = async (response) => {
  const text = await response.text();

  try {
    return text ? JSON.parse(text) : {};
  } catch (_error) {
    return {
      error: "L'API d'administration n'est pas disponible. En local, lancez `npx vercel dev` au lieu de `vite`.",
    };
  }
};

const isSessionExpired = (session) => {
  if (!session?.expires_at) {
    return false;
  }

  return Date.now() >= session.expires_at * 1000;
};

const getPublicImageUrl = (path) => {
  if (!path || !supabaseClient) {
    return '';
  }

  const { data } = supabaseClient.storage.from(wineBucketName).getPublicUrl(path);
  return data?.publicUrl || '';
};

const getFieldValue = (source, fieldPath) => fieldPath.split('.').reduce((value, key) => value?.[key], source);

const Field = ({
  label,
  value,
  onChange,
  placeholder,
  type = 'text',
  min,
  max,
}) => (
  <label className="admin-page__field">
    <span className="admin-page__field-label">{label}</span>
    <input
      className="admin-page__input"
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      min={min}
      max={max}
    />
  </label>
);

const TextareaField = ({ label, value, onChange, rows = 6 }) => (
  <label className="admin-page__field">
    <span className="admin-page__field-label">{label}</span>
    <textarea
      className="admin-page__textarea"
      value={value}
      onChange={onChange}
      rows={rows}
    />
  </label>
);

const PanelSection = ({ title, description, aside, children }) => (
  <section className="admin-page__panel-section">
    <div className="admin-page__section-header">
      <div>
        <h3 className="admin-page__section-title">{title}</h3>
        {description ? <p className="admin-page__section-description">{description}</p> : null}
      </div>
      {aside}
    </div>
    {children}
  </section>
);

const ImageUploadCard = ({
  title,
  description,
  imageUrl,
  alt,
  onChange,
  footer,
}) => (
  <div className="admin-page__media-card">
    <div className="admin-page__media-header">
      <h4>{title}</h4>
      {description ? <p>{description}</p> : null}
    </div>
    <div className="admin-page__media-preview">
      {imageUrl ? (
        <img src={imageUrl} alt={alt} />
      ) : (
        <div className="admin-page__media-empty">Aucune image uploadée</div>
      )}
    </div>
    <label className="admin-page__upload-button">
      <span>Choisir une image</span>
      <input type="file" accept="image/*" onChange={onChange} />
    </label>
    {footer ? <p className="admin-page__media-help">{footer}</p> : null}
  </div>
);

const LogoutIcon = () => (
  <svg
    className="admin-page__nav-button-icon"
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    aria-hidden="true"
  >
    <path
      d="M14 7L19 12L14 17"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M19 12H9"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M11 5H7C5.89543 5 5 5.89543 5 7V17C5 18.1046 5.89543 19 7 19H11"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ProductListItem = ({ wine, active, onSelect }) => (
  <button
    type="button"
    onClick={onSelect}
    className={`admin-page__product-item${active ? ' admin-page__product-item--active' : ''}`}
  >
    <strong>{wine.wineName.fr}</strong>
  </button>
);

const SiteContentFieldGroup = ({ title, children }) => (
  <div className="admin-page__site-group">
    <h4>{title}</h4>
    <div className="admin-page__fields-grid admin-page__fields-grid--two">
      {children}
    </div>
  </div>
);

const ConfirmModal = ({
  open,
  title,
  description,
  onCancel,
  onDiscard,
  onSaveAndContinue,
  saving,
}) => {
  if (!open) {
    return null;
  }

  return (
    <div className="admin-page__modal-overlay" role="presentation">
      <div className="admin-page__modal" role="dialog" aria-modal="true" aria-labelledby="admin-unsaved-title">
        <div className="admin-page__modal-head">
          <p className="admin-page__eyebrow">Modifications non enregistrées</p>
          <h3 id="admin-unsaved-title">{title}</h3>
          <p>{description}</p>
        </div>
        <div className="admin-page__modal-actions">
          <button type="button" className="admin-page__secondary-button" onClick={onCancel}>
            Rester sur cette vue
          </button>
          <button type="button" className="admin-page__ghost-neutral-button" onClick={onDiscard}>
            Ignorer les modifications
          </button>
          <button type="button" className="admin-page__primary-button" onClick={onSaveAndContinue} disabled={saving}>
            {saving ? 'Enregistrement…' : 'Enregistrer puis continuer'}
          </button>
        </div>
      </div>
    </div>
  );
};

const AdminPage = () => {
  const [credentials, setCredentials] = useState(emptyCredentials);
  const [session, setSession] = useState(null);
  const [activeSection, setActiveSection] = useState('products');
  const [wines, setWines] = useState([]);
  const [originalWines, setOriginalWines] = useState([]);
  const [siteContent, setSiteContent] = useState({
    domain_page: domainPageDefault,
    contact_page: contactPageDefault,
  });
  const [originalSiteContent, setOriginalSiteContent] = useState({
    domain_page: domainPageDefault,
    contact_page: contactPageDefault,
  });
  const [activeLocaleBySection, setActiveLocaleBySection] = useState({
    products: 'fr',
    domain: 'fr',
    contact: 'fr',
  });
  const [selectedBottle, setSelectedBottle] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [initializing, setInitializing] = useState(false);
  const [uploadingImage, setUploadingImage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [pendingNavigation, setPendingNavigation] = useState(null);

  const sectionPresentation = {
    products: {
      title: 'Gestion du contenu',
      copy: 'Modifiez les fiches produit, les textes bilingues et les visuels de la page Vins.',
    },
    domain: {
      title: 'Gestion de la page Domaine',
      copy: 'Mettez à jour les contenus éditoriaux bilingues affichés sur la page Domaine.',
    },
    contact: {
      title: 'Gestion de la page Contact',
      copy: 'Ajustez les coordonnées et les contenus éditoriaux utilisés sur la page Contact.',
    },
  };

  const resetAdminState = useCallback((nextErrorMessage = '') => {
    setSession(null);
    setWines([]);
    setOriginalWines([]);
    setSelectedBottle('');
    setSiteContent({
      domain_page: domainPageDefault,
      contact_page: contactPageDefault,
    });
    setOriginalSiteContent({
      domain_page: domainPageDefault,
      contact_page: contactPageDefault,
    });
    setPendingNavigation(null);
    setSuccessMessage('');
    setErrorMessage(nextErrorMessage);
    setLoading(false);
    setSaving(false);
    setInitializing(false);
    setUploadingImage('');
  }, []);

  const handleSessionExpired = useCallback(async (message = 'Votre session a expiré. Reconnectez-vous.') => {
    if (supabaseClient) {
      try {
        await supabaseClient.auth.signOut({ scope: 'local' });
      } catch (_error) {
        // Ignore local sign-out failures and still reset the UI state.
      }
    }

    resetAdminState(message);
  }, [resetAdminState]);

  const adminFetch = useCallback(async (input, init = {}) => {
    if (!session?.access_token) {
      return {
        response: null,
        payload: { error: 'Votre session a expiré. Reconnectez-vous.' },
        unauthorized: true,
      };
    }

    const headers = {
      ...(init.headers || {}),
      Authorization: `Bearer ${session.access_token}`,
    };

    const response = await fetch(input, {
      ...init,
      headers,
    });

    const payload = await parseJsonResponse(response);

    if (response.status === 401) {
      await handleSessionExpired(payload.error || 'Votre session a expiré. Reconnectez-vous.');
      return { response, payload, unauthorized: true };
    }

    return { response, payload, unauthorized: false };
  }, [handleSessionExpired, session?.access_token]);

  useEffect(() => {
    if (!supabaseClient) {
      setLoading(false);
      return undefined;
    }

    let active = true;

    supabaseClient.auth.getSession().then(async ({ data }) => {
      if (!active) {
        return;
      }

      const nextSession = data.session || null;

      if (isSessionExpired(nextSession)) {
        await handleSessionExpired();
        return;
      }

      setSession(nextSession);
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabaseClient.auth.onAuthStateChange(async (_event, nextSession) => {
      if (!active) {
        return;
      }

      if (!nextSession) {
        resetAdminState('');
        return;
      }

      if (isSessionExpired(nextSession)) {
        await handleSessionExpired();
        return;
      }

      setSession(nextSession || null);
    });

    return () => {
      active = false;
      subscription.unsubscribe();
    };
  }, [handleSessionExpired, resetAdminState]);

  useEffect(() => {
    if (!session?.access_token) {
      return;
    }

    const loadWines = async () => {
      setLoading(true);
      setErrorMessage('');

      const { response, payload, unauthorized } = await adminFetch('/api/admin/wines');

      if (unauthorized || !response) {
        return;
      }

      if (!response.ok) {
        setErrorMessage(payload.error || 'Impossible de charger les vins.');
        setLoading(false);
        return;
      }

      setWines(payload.wines || []);
      setOriginalWines(structuredClone(payload.wines || []));
      setSelectedBottle((currentBottle) => currentBottle || payload.wines?.[0]?.bottle || '');
      setLoading(false);
    };

    loadWines().catch((error) => {
      setErrorMessage(error.message || 'Impossible de charger les vins.');
      setLoading(false);
    });
  }, [adminFetch, session]);

  useEffect(() => {
    if (!session?.access_token) {
      return;
    }

    const loadSiteContent = async () => {
      const { response, payload, unauthorized } = await adminFetch('/api/admin/site');

      if (unauthorized || !response) {
        return;
      }

      if (!response.ok) {
        setErrorMessage(payload.error || 'Impossible de charger les contenus du site.');
        return;
      }

      setSiteContent(payload.content || {});
      setOriginalSiteContent(structuredClone(payload.content || {}));
    };

    loadSiteContent().catch((error) => {
      setErrorMessage(error.message || 'Impossible de charger les contenus du site.');
    });
  }, [adminFetch, session]);

  const selectedWine = useMemo(
    () => wines.find((wine) => wine.bottle === selectedBottle) || null,
    [wines, selectedBottle],
  );

  const originalSelectedWine = useMemo(
    () => originalWines.find((wine) => wine.bottle === selectedBottle) || null,
    [originalWines, selectedBottle],
  );

  const activeSiteContent = activeSection === 'domain'
    ? siteContent.domain_page
    : activeSection === 'contact'
      ? siteContent.contact_page
      : null;

  const originalActiveSiteContent = activeSection === 'domain'
    ? originalSiteContent.domain_page
    : activeSection === 'contact'
      ? originalSiteContent.contact_page
      : null;

  const activeLocale = activeLocaleBySection[activeSection] || 'fr';
  const currentSectionPresentation = sectionPresentation[activeSection] || sectionPresentation.products;

  const productDirty = Boolean(selectedWine && originalSelectedWine && serialize(selectedWine) !== serialize(originalSelectedWine));
  const siteDirty = Boolean(activeSiteContent && originalActiveSiteContent && serialize(activeSiteContent) !== serialize(originalActiveSiteContent));
  const hasUnsavedChanges = activeSection === 'products' ? productDirty : siteDirty;

  const getLocaleDirty = (sectionId, locale) => {
    if (sectionId === 'products') {
      if (!selectedWine || !originalSelectedWine) {
        return false;
      }

      const current = {
        wineName: selectedWine.wineName?.[locale] || '',
        desc: selectedWine.desc?.[locale] || '',
        assoc: selectedWine.assoc?.[locale] || '',
      };
      const original = {
        wineName: originalSelectedWine.wineName?.[locale] || '',
        desc: originalSelectedWine.desc?.[locale] || '',
        assoc: originalSelectedWine.assoc?.[locale] || '',
      };

      return serialize(current) !== serialize(original);
    }

    if (sectionId === 'domain') {
      const current = siteContent.domain_page;
      const original = originalSiteContent.domain_page;

      return serialize({
        title: current?.title?.[locale] || '',
        p1: current?.paragraphs?.p1?.[locale] || '',
        p2: current?.paragraphs?.p2?.[locale] || '',
        p3: current?.paragraphs?.p3?.[locale] || '',
      }) !== serialize({
        title: original?.title?.[locale] || '',
        p1: original?.paragraphs?.p1?.[locale] || '',
        p2: original?.paragraphs?.p2?.[locale] || '',
        p3: original?.paragraphs?.p3?.[locale] || '',
      });
    }

    if (sectionId === 'contact') {
      const current = siteContent.contact_page;
      const original = originalSiteContent.contact_page;

      return serialize({
        pageTitle: current?.left?.pageTitle?.[locale] || '',
        estateTitle: current?.left?.estateTitle?.[locale] || '',
        owners: current?.left?.owners?.[locale] || '',
        addressLine1: current?.left?.addressLine1?.[locale] || '',
        addressLine2: current?.left?.addressLine2?.[locale] || '',
        addressLine3: current?.left?.addressLine3?.[locale] || '',
      }) !== serialize({
        pageTitle: original?.left?.pageTitle?.[locale] || '',
        estateTitle: original?.left?.estateTitle?.[locale] || '',
        owners: original?.left?.owners?.[locale] || '',
        addressLine1: original?.left?.addressLine1?.[locale] || '',
        addressLine2: original?.left?.addressLine2?.[locale] || '',
        addressLine3: original?.left?.addressLine3?.[locale] || '',
      });
    }

    return false;
  };

  const contactSharedDirty = serialize({
    phoneGuillaume: siteContent.contact_page?.left?.phoneGuillaume || '',
    phoneMariannick: siteContent.contact_page?.left?.phoneMariannick || '',
    email: siteContent.contact_page?.left?.email || '',
  }) !== serialize({
    phoneGuillaume: originalSiteContent.contact_page?.left?.phoneGuillaume || '',
    phoneMariannick: originalSiteContent.contact_page?.left?.phoneMariannick || '',
    email: originalSiteContent.contact_page?.left?.email || '',
  });

  const updateWineField = (fieldPath, value) => {
    setWines((currentWines) => currentWines.map((wine) => {
      if (wine.bottle !== selectedBottle) {
        return wine;
      }

      const nextWine = structuredClone(wine);
      const pathSegments = fieldPath.split('.');
      let currentTarget = nextWine;

      for (let index = 0; index < pathSegments.length - 1; index += 1) {
        currentTarget = currentTarget[pathSegments[index]];
      }

      currentTarget[pathSegments[pathSegments.length - 1]] = value;
      return nextWine;
    }));
  };

  const updateSiteField = (contentKey, fieldPath, value) => {
    setSiteContent((current) => {
      const nextSection = structuredClone(current[contentKey]);
      const pathSegments = fieldPath.split('.');
      let currentTarget = nextSection;

      for (let index = 0; index < pathSegments.length - 1; index += 1) {
        currentTarget = currentTarget[pathSegments[index]];
      }

      currentTarget[pathSegments[pathSegments.length - 1]] = value;

      return {
        ...current,
        [contentKey]: nextSection,
      };
    });
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    if (!supabaseClient) {
      return;
    }

    setErrorMessage('');

    const { error } = await supabaseClient.auth.signInWithPassword(credentials);

    if (error) {
      setErrorMessage(error.message);
      return;
    }

    setCredentials(emptyCredentials);
  };

  const handleLogout = async () => {
    if (!supabaseClient) {
      return;
    }

    await supabaseClient.auth.signOut();
    resetAdminState('');
  };

  const saveCurrentProduct = async () => {
    if (!selectedWine || !session?.access_token) {
      return false;
    }

    setSaving(true);
    setErrorMessage('');
    setSuccessMessage('');

    const { response, payload, unauthorized } = await adminFetch('/api/admin/wines', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ wine: selectedWine }),
    });

    if (unauthorized || !response) {
      setSaving(false);
      return false;
    }

    if (!response.ok) {
      setErrorMessage(payload.error || "Impossible d'enregistrer ce vin.");
      setSaving(false);
      return false;
    }

    setWines((currentWines) => currentWines.map((wine) => (
      wine.bottle === payload.wine?.bottle ? payload.wine : wine
    )));
    setOriginalWines((currentWines) => currentWines.map((wine) => (
      wine.bottle === payload.wine?.bottle ? structuredClone(payload.wine) : wine
    )));
    setSuccessMessage(`${selectedWine.wineName.fr} a bien été enregistré.`);
    setSaving(false);
    return true;
  };

  const handleSave = async (event) => {
    event.preventDefault();
    await saveCurrentProduct();
  };

  const handleInitializeProducts = async () => {
    if (!session?.access_token) {
      return;
    }

    setInitializing(true);
    setErrorMessage('');
    setSuccessMessage('');

    const { response, payload, unauthorized } = await adminFetch('/api/admin/wines', {
      method: 'POST',
    });

    if (unauthorized || !response) {
      setInitializing(false);
      return;
    }

    if (!response.ok) {
      setErrorMessage(payload.error || "Impossible d'initialiser les produits.");
      setInitializing(false);
      return;
    }

    setWines(payload.wines || []);
    setOriginalWines(structuredClone(payload.wines || []));
    setSelectedBottle(payload.wines?.[0]?.bottle || '');
    setSuccessMessage('Les produits ont bien été importés depuis les fichiers locaux.');
    setInitializing(false);
  };

  const saveCurrentSiteContent = async () => {
    if (!session?.access_token || !activeSiteContent) {
      return false;
    }

    setSaving(true);
    setErrorMessage('');
    setSuccessMessage('');

    const contentKey = activeSection === 'domain' ? 'domain_page' : 'contact_page';

    const { response, payload, unauthorized } = await adminFetch('/api/admin/site', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contentKey,
        contentValue: activeSiteContent,
      }),
    });

    if (unauthorized || !response) {
      setSaving(false);
      return false;
    }

    if (!response.ok) {
      setErrorMessage(payload.error || "Impossible d'enregistrer ce contenu.");
      setSaving(false);
      return false;
    }

    setSiteContent((current) => ({
      ...current,
      [payload.saved.key]: payload.saved.value,
    }));
    setOriginalSiteContent((current) => ({
      ...current,
      [payload.saved.key]: structuredClone(payload.saved.value),
    }));
    setSuccessMessage(activeSection === 'domain' ? 'Contenu Domaine enregistré.' : 'Contenu Contact enregistré.');
    setSaving(false);
    return true;
  };

  const handleSaveSiteContent = async (event) => {
    event.preventDefault();
    await saveCurrentSiteContent();
  };

  const revertCurrentChanges = () => {
    if (activeSection === 'products' && originalSelectedWine) {
      setWines((currentWines) => currentWines.map((wine) => (
        wine.bottle === originalSelectedWine.bottle ? structuredClone(originalSelectedWine) : wine
      )));
      return;
    }

    if (activeSection === 'domain') {
      setSiteContent((current) => ({
        ...current,
        domain_page: structuredClone(originalSiteContent.domain_page),
      }));
      return;
    }

    if (activeSection === 'contact') {
      setSiteContent((current) => ({
        ...current,
        contact_page: structuredClone(originalSiteContent.contact_page),
      }));
    }
  };

  const executeNavigation = (navigation) => {
    if (!navigation) {
      return;
    }

    if (navigation.type === 'section') {
      setActiveSection(navigation.value);
      return;
    }

    if (navigation.type === 'product') {
      setSelectedBottle(navigation.value);
    }
  };

  const requestNavigation = (navigation) => {
    const isSameSection = navigation.type === 'section' && navigation.value === activeSection;
    const isSameProduct = navigation.type === 'product' && navigation.value === selectedBottle;

    if (isSameSection || isSameProduct) {
      return;
    }

    if (hasUnsavedChanges) {
      setPendingNavigation(navigation);
      return;
    }

    executeNavigation(navigation);
  };

  const handleDiscardAndContinue = () => {
    revertCurrentChanges();
    const navigation = pendingNavigation;
    setPendingNavigation(null);
    executeNavigation(navigation);
  };

  const handleSaveAndContinue = async () => {
    const saved = activeSection === 'products'
      ? await saveCurrentProduct()
      : await saveCurrentSiteContent();

    if (!saved) {
      return;
    }

    const navigation = pendingNavigation;
    setPendingNavigation(null);
    executeNavigation(navigation);
  };

  const handleImageUpload = async (field, file) => {
    if (!file || !selectedWine || !session?.access_token) {
      return;
    }

    setUploadingImage(field);
    setErrorMessage('');
    setSuccessMessage('');

    const formData = new FormData();
    formData.append('bottle', selectedWine.bottle);
    formData.append('kind', field);
    formData.append('wine', JSON.stringify(selectedWine));
    formData.append('file', file);

    const { response, payload, unauthorized } = await adminFetch('/api/admin/upload', {
      method: 'POST',
      body: formData,
    });

    if (unauthorized || !response) {
      setUploadingImage('');
      return;
    }

    if (!response.ok) {
      setErrorMessage(payload.error || "Impossible d'enregistrer l'image.");
      setUploadingImage('');
      return;
    }

    const savedWine = payload.wine;
    const normalizedWine = {
      ...savedWine,
      bottleImageUrl: getPublicImageUrl(savedWine.bottleImagePath),
      titleImageUrl: getPublicImageUrl(savedWine.titleImagePath),
    };

    setWines((currentWines) => currentWines.map((wine) => (
      wine.bottle === selectedWine.bottle ? normalizedWine : wine
    )));
    setOriginalWines((currentWines) => currentWines.map((wine) => (
      wine.bottle === selectedWine.bottle ? structuredClone(normalizedWine) : wine
    )));

    setSuccessMessage(field === 'bottle' ? 'Image de bouteille enregistrée.' : 'Image de titre enregistrée.');
    setUploadingImage('');
  };

  if (!hasSupabaseConfig) {
    return (
      <main className="admin-page admin-page--setup">
        <div className="admin-page__setup-card">
          <h1>Configuration de l'administration requise</h1>
          <p>Ajoutez ces variables d&apos;environnement avant d&apos;utiliser l&apos;administration personnalisée :</p>
          <ul>
            <li>VITE_SUPABASE_URL</li>
            <li>VITE_SUPABASE_PUBLISHABLE_KEY</li>
          </ul>
        </div>
      </main>
    );
  }

  if (!session) {
    return (
      <main className="admin-page admin-page--login">
        <form className="admin-page__login-card" onSubmit={handleLogin}>
          <div className="admin-page__login-brand">
            <img src={logo} alt="Domaine des Fournelles" />
            <div>
              <h1>Administration</h1>
              <p>Accédez à l&apos;espace d&apos;édition du domaine.</p>
            </div>
          </div>

          <div className="admin-page__login-fields">
            <Field
              label="E-mail"
              value={credentials.email}
              onChange={(event) => setCredentials((current) => ({ ...current, email: event.target.value }))}
              type="email"
            />
            <Field
              label="Mot de passe"
              value={credentials.password}
              onChange={(event) => setCredentials((current) => ({ ...current, password: event.target.value }))}
              type="password"
            />
          </div>

          {errorMessage ? <p className="admin-page__banner admin-page__banner--error">{errorMessage}</p> : null}

          <button type="submit" className="admin-page__primary-button admin-page__primary-button--block">
            Se connecter
          </button>
        </form>
      </main>
    );
  }

  return (
    <main className="admin-page">
      <div className="admin-page__shell">
        <nav className="admin-page__section-nav" aria-label="Sections de l'administration">
          <div className="admin-page__section-nav-track">
            <div className="admin-page__tabs-surface">
              <div className="admin-page__tabs">
                {adminSections.map((section) => (
                  <button
                    key={section.id}
                    type="button"
                    onClick={() => section.enabled && requestNavigation({ type: 'section', value: section.id })}
                    className={`admin-page__tab${activeSection === section.id ? ' admin-page__tab--active' : ''}`}
                    title={section.description}
                    disabled={!section.enabled}
                    aria-pressed={activeSection === section.id}
                  >
                    {section.label}
                  </button>
                ))}
              </div>
            </div>

            <button type="button" onClick={handleLogout} className="admin-page__nav-button">
              <LogoutIcon />
              <span>Se déconnecter</span>
            </button>
          </div>
        </nav>

        <header className="admin-page__header">
          <div className="admin-page__header-main">
            <p className="admin-page__eyebrow">Administration</p>
            <h1>{currentSectionPresentation.title}</h1>
            <p className="admin-page__header-copy">
              {currentSectionPresentation.copy}
            </p>
          </div>
        </header>

        {(hasUnsavedChanges || saving || uploadingImage) ? (
          <div className="admin-page__status-row">
            {hasUnsavedChanges ? <span className="admin-page__status-chip admin-page__status-chip--dirty">Modifications non enregistrées</span> : null}
            {saving ? <span className="admin-page__status-chip">Enregistrement…</span> : null}
            {uploadingImage ? (
              <span className="admin-page__status-chip">Upload {uploadingImage === 'bottle' ? 'bouteille' : 'titre'}…</span>
            ) : null}
          </div>
        ) : null}

        {errorMessage ? <p className="admin-page__banner admin-page__banner--error">{errorMessage}</p> : null}
        {successMessage ? <p className="admin-page__banner admin-page__banner--success">{successMessage}</p> : null}

        {loading ? <div className="admin-page__loading">Chargement des vins…</div> : null}

        {!loading && activeSection === 'products' && wines.length ? (
          <div className="admin-page__workspace">
            <aside className="admin-page__sidebar">
              <div className="admin-page__sidebar-head">
                <div>
                  <p className="admin-page__sidebar-label">Produits</p>
                  <h2>{wines.length} références</h2>
                </div>
              </div>

              <div className="admin-page__product-list">
                {wines.map((wine) => (
                  <ProductListItem
                    key={wine.bottle}
                    wine={wine}
                    active={wine.bottle === selectedBottle}
                    onSelect={() => requestNavigation({ type: 'product', value: wine.bottle })}
                  />
                ))}
              </div>
            </aside>

            {selectedWine ? (
              <form className="admin-page__editor" onSubmit={handleSave}>
                <div className="admin-page__editor-head">
                  <div>
                    <p className="admin-page__editor-label">{selectedWine.appel}</p>
                    <h2>{selectedWine.wineName.fr}</h2>
                    <p>{selectedWine.region}</p>
                  </div>
                  <button type="submit" disabled={saving || !productDirty} className="admin-page__primary-button">
                    {saving ? 'Enregistrement…' : productDirty ? 'Enregistrer' : 'À jour'}
                  </button>
                </div>

                <div className="admin-page__locale-bar">
                  <div className="admin-page__locale-tabs">
                    {['fr', 'en'].map((locale) => (
                      <button
                        key={locale}
                        type="button"
                        className={`admin-page__locale-tab${activeLocale === locale ? ' admin-page__locale-tab--active' : ''}`}
                        onClick={() => setActiveLocaleBySection((current) => ({ ...current, products: locale }))}
                      >
                        {locale.toUpperCase()}
                        {getLocaleDirty('products', locale) ? <span className="admin-page__locale-dot" /> : null}
                      </button>
                    ))}
                  </div>
                  <p className="admin-page__locale-help">Les champs localisés affichent uniquement la langue sélectionnée.</p>
                </div>

                <PanelSection
                  title="Fiche produit"
                  description="Informations visibles dans la fiche technique du vin."
                >
                  <div className="admin-page__fields-grid admin-page__fields-grid--two">
                    {profileFields.map((field) => (
                      <Field
                        key={field.path}
                        label={field.label}
                        value={getFieldValue(selectedWine, field.path) || ''}
                        onChange={(event) => updateWineField(field.path, event.target.value)}
                        placeholder={field.placeholder}
                      />
                    ))}
                  </div>
                </PanelSection>

                <PanelSection
                  title={`Contenu ${activeLocale.toUpperCase()}`}
                  description="Nom commercial, description et accords dans la langue sélectionnée."
                >
                  <div className="admin-page__fields-grid">
                    <Field
                      label={`Nom du vin ${activeLocale.toUpperCase()}`}
                      value={selectedWine.wineName[activeLocale]}
                      onChange={(event) => updateWineField(`wineName.${activeLocale}`, event.target.value)}
                    />
                    <TextareaField
                      label={`Description ${activeLocale.toUpperCase()}`}
                      value={selectedWine.desc[activeLocale]}
                      onChange={(event) => updateWineField(`desc.${activeLocale}`, event.target.value)}
                    />
                    <TextareaField
                      label={`Accords mets et vins ${activeLocale.toUpperCase()}`}
                      value={selectedWine.assoc[activeLocale]}
                      onChange={(event) => updateWineField(`assoc.${activeLocale}`, event.target.value)}
                      rows={5}
                    />
                  </div>
                </PanelSection>

                <PanelSection
                  title="Visuels"
                  description="Images affichées dans la page vin. Les assets locaux restent utilisés tant qu’aucun upload n’est défini."
                  aside={<span className="admin-page__section-chip">Bucket {wineBucketName}</span>}
                >
                  <div className="admin-page__media-grid">
                    <ImageUploadCard
                      title="Image bouteille"
                      description="Visuel principal du flacon."
                      imageUrl={selectedWine.bottleImagePath ? getPublicImageUrl(selectedWine.bottleImagePath) : ''}
                      alt={`Bouteille ${selectedWine.wineName.fr}`}
                      onChange={(event) => handleImageUpload('bottle', event.target.files?.[0])}
                      footer="Format conseillé : PNG détouré ou image verticale sur fond transparent."
                    />
                    <ImageUploadCard
                      title="Image titre"
                      description="Visuel du titre stylisé utilisé dans la page produit."
                      imageUrl={selectedWine.titleImagePath ? getPublicImageUrl(selectedWine.titleImagePath) : ''}
                      alt={`Titre ${selectedWine.wineName.fr}`}
                      onChange={(event) => handleImageUpload('title', event.target.files?.[0])}
                      footer="Format conseillé : PNG transparent avec marge suffisante."
                    />
                  </div>
                </PanelSection>

                <PanelSection
                  title="Profil aromatique"
                  description="Notes de 0 à 4 utilisées pour le radar simplifié du vin."
                >
                  <div className="admin-page__fields-grid admin-page__fields-grid--metrics">
                    {characterFields.map((field) => (
                      <Field
                        key={field.path}
                        label={field.label}
                        type="number"
                        min="0"
                        max="4"
                        value={getFieldValue(selectedWine, field.path)}
                        onChange={(event) => updateWineField(field.path, Number(event.target.value))}
                      />
                    ))}
                  </div>
                </PanelSection>
              </form>
            ) : null}
          </div>
        ) : null}

        {!loading && activeSection === 'products' && !wines.length ? (
          <div className="admin-page__empty">
            <div>
              <p className="admin-page__eyebrow">Catalogue vide</p>
              <h2>Aucun produit disponible</h2>
              <p>
                Aucun vin n&apos;a été trouvé dans Supabase. Vérifiez d&apos;abord que la table
              <code>wines</code>
              existe bien, puis importez les produits depuis les fichiers locaux.
            </p>
            </div>
            <div className="admin-page__empty-actions">
              <button
                type="button"
                onClick={handleInitializeProducts}
                disabled={initializing}
                className="admin-page__primary-button"
              >
                {initializing ? 'Import en cours…' : 'Créer les produits depuis les fichiers locaux'}
              </button>
            </div>
          </div>
        ) : null}

        {!loading && activeSection === 'domain' ? (
          <form className="admin-page__content-editor" onSubmit={handleSaveSiteContent}>
            <div className="admin-page__editor-head">
              <div>
                <p className="admin-page__editor-label">Contenu éditorial</p>
                <h2>Page Domaine</h2>
                <p>Textes de présentation bilingues affichés sur la page domaine.</p>
              </div>
              <button type="submit" disabled={saving || !siteDirty} className="admin-page__primary-button">
                {saving ? 'Enregistrement…' : siteDirty ? 'Enregistrer' : 'À jour'}
              </button>
            </div>

            <div className="admin-page__locale-bar">
              <div className="admin-page__locale-tabs">
                {['fr', 'en'].map((locale) => (
                  <button
                    key={locale}
                    type="button"
                    className={`admin-page__locale-tab${activeLocale === locale ? ' admin-page__locale-tab--active' : ''}`}
                    onClick={() => setActiveLocaleBySection((current) => ({ ...current, domain: locale }))}
                  >
                    {locale.toUpperCase()}
                    {getLocaleDirty('domain', locale) ? <span className="admin-page__locale-dot" /> : null}
                  </button>
                ))}
              </div>
              <p className="admin-page__locale-help">Une seule langue est éditée à la fois pour une lecture plus nette.</p>
            </div>

            <PanelSection
              title={`Contenu ${activeLocale.toUpperCase()}`}
              description="Titre principal et paragraphes du récit de domaine."
            >
              <div className="admin-page__fields-grid">
                <Field
                  label={`Titre ${activeLocale.toUpperCase()}`}
                  value={siteContent.domain_page.title[activeLocale]}
                  onChange={(event) => updateSiteField('domain_page', `title.${activeLocale}`, event.target.value)}
                />
                <TextareaField
                  label="Paragraphe 1"
                  value={siteContent.domain_page.paragraphs.p1[activeLocale]}
                  onChange={(event) => updateSiteField('domain_page', `paragraphs.p1.${activeLocale}`, event.target.value)}
                />
                <TextareaField
                  label="Paragraphe 2"
                  value={siteContent.domain_page.paragraphs.p2[activeLocale]}
                  onChange={(event) => updateSiteField('domain_page', `paragraphs.p2.${activeLocale}`, event.target.value)}
                />
                <TextareaField
                  label="Paragraphe 3"
                  value={siteContent.domain_page.paragraphs.p3[activeLocale]}
                  onChange={(event) => updateSiteField('domain_page', `paragraphs.p3.${activeLocale}`, event.target.value)}
                />
              </div>
            </PanelSection>
          </form>
        ) : null}

        {!loading && activeSection === 'contact' ? (
          <form className="admin-page__content-editor" onSubmit={handleSaveSiteContent}>
            <div className="admin-page__editor-head">
              <div>
                <p className="admin-page__editor-label">Contenu éditorial</p>
                <h2>Page Contact</h2>
                <p>Coordonnées statiques affichées sur la page contact.</p>
              </div>
              <button type="submit" disabled={saving || !siteDirty} className="admin-page__primary-button">
                {saving ? 'Enregistrement…' : siteDirty ? 'Enregistrer' : 'À jour'}
              </button>
            </div>

            <div className="admin-page__locale-bar">
              <div className="admin-page__locale-tabs">
                {['fr', 'en'].map((locale) => (
                  <button
                    key={locale}
                    type="button"
                    className={`admin-page__locale-tab${activeLocale === locale ? ' admin-page__locale-tab--active' : ''}`}
                    onClick={() => setActiveLocaleBySection((current) => ({ ...current, contact: locale }))}
                  >
                    {locale.toUpperCase()}
                    {getLocaleDirty('contact', locale) ? <span className="admin-page__locale-dot" /> : null}
                  </button>
                ))}
              </div>
              <div className="admin-page__locale-bar-meta">
                {contactSharedDirty ? <span className="admin-page__status-chip admin-page__status-chip--dirty">Coordonnées partagées modifiées</span> : null}
                <p className="admin-page__locale-help">Les champs partagés restent visibles en dessous.</p>
              </div>
            </div>

            <PanelSection
              title="Colonne coordonnées"
              description="Bloc d’informations statiques affiché à gauche."
            >
              <SiteContentFieldGroup title={`Texte ${activeLocale.toUpperCase()}`}>
                <Field
                  label={`Titre page ${activeLocale.toUpperCase()}`}
                  value={siteContent.contact_page.left.pageTitle[activeLocale]}
                  onChange={(event) => updateSiteField('contact_page', `left.pageTitle.${activeLocale}`, event.target.value)}
                />
                <Field
                  label={`Nom du domaine ${activeLocale.toUpperCase()}`}
                  value={siteContent.contact_page.left.estateTitle[activeLocale]}
                  onChange={(event) => updateSiteField('contact_page', `left.estateTitle.${activeLocale}`, event.target.value)}
                />
                <TextareaField
                  label={`Propriétaires ${activeLocale.toUpperCase()}`}
                  value={siteContent.contact_page.left.owners[activeLocale]}
                  onChange={(event) => updateSiteField('contact_page', `left.owners.${activeLocale}`, event.target.value)}
                  rows={3}
                />
                <Field
                  label="Ligne 1"
                  value={siteContent.contact_page.left.addressLine1[activeLocale]}
                  onChange={(event) => updateSiteField('contact_page', `left.addressLine1.${activeLocale}`, event.target.value)}
                />
                <Field
                  label="Ligne 2"
                  value={siteContent.contact_page.left.addressLine2[activeLocale]}
                  onChange={(event) => updateSiteField('contact_page', `left.addressLine2.${activeLocale}`, event.target.value)}
                />
                <Field
                  label="Ligne 3"
                  value={siteContent.contact_page.left.addressLine3[activeLocale]}
                  onChange={(event) => updateSiteField('contact_page', `left.addressLine3.${activeLocale}`, event.target.value)}
                />
              </SiteContentFieldGroup>

              <div className="admin-page__fields-grid admin-page__fields-grid--two">
                <Field
                  label="Téléphone Guillaume"
                  value={siteContent.contact_page.left.phoneGuillaume}
                  onChange={(event) => updateSiteField('contact_page', 'left.phoneGuillaume', event.target.value)}
                />
                <Field
                  label="Téléphone Mariannick"
                  value={siteContent.contact_page.left.phoneMariannick}
                  onChange={(event) => updateSiteField('contact_page', 'left.phoneMariannick', event.target.value)}
                />
                <Field
                  label="Adresse e-mail"
                  value={siteContent.contact_page.left.email}
                  onChange={(event) => updateSiteField('contact_page', 'left.email', event.target.value)}
                />
              </div>
            </PanelSection>
          </form>
        ) : null}
        <ConfirmModal
          open={Boolean(pendingNavigation)}
          title="Quitter cette vue ?"
          description="Vous avez des modifications non enregistrées. Vous pouvez les sauvegarder avant de continuer, ou les abandonner."
          onCancel={() => setPendingNavigation(null)}
          onDiscard={handleDiscardAndContinue}
          onSaveAndContinue={handleSaveAndContinue}
          saving={saving}
        />
      </div>
    </main>
  );
};

export default AdminPage;
