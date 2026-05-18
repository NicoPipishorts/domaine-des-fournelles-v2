import React, { useEffect, useMemo, useState } from 'react';

import NavBar from '../NavBar';
import './styles.scss';

import logo from '../../assets/images/PageLogo-B.png';
import { contactPageDefault } from '../../content/site';
import { localBottleImagesByBottle } from '../../content/wines/assets';
import { wines as fallbackWines } from '../../content/wines';
import { fetchSiteContent } from '../../supabase/site';
import { fetchPublicWines, hasSupabaseWineReadConfig } from '../../supabase/wines';

const CART_STORAGE_KEY = 'domaine-des-fournelles-boutique-cart';
const REQUEST_STORAGE_KEY = 'domaine-des-fournelles-boutique-request';
const CART_STEP_STORAGE_KEY = 'domaine-des-fournelles-boutique-step';

const emptyRequestForm = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  city: '',
  postalCode: '',
  country: '',
  notes: '',
};

const content = {
  fr: {
    eyebrow: 'Boutique',
    title: 'Préparez votre demande de commande',
    intro: "Ajoutez les cuvées souhaitées à votre panier. La demande est ensuite envoyée au domaine, qui vous répondra avec les délais et les frais de livraison selon votre localisation.",
    cartButton: 'Voir le panier',
    cartTitle: 'Votre sélection',
    cartSubtitle: 'Panier temporaire enregistré localement sur cet appareil.',
    stepSelection: 'Sélection',
    stepProcedure: 'Procédure',
    stepDetails: 'Coordonnées',
    step1Title: 'Vérifiez votre sélection',
    step1Intro: 'Ajustez les quantités avant de passer à la demande.',
    step2Title: 'Comment la demande est traitée',
    step2Intro: 'Aucun paiement en ligne. Le domaine valide ensuite la disponibilité, calcule les frais de livraison et vous répond directement avec un devis.',
    step2Bullet1: 'Vous envoyez une demande de commande, pas un paiement.',
    step2Bullet2: 'Le domaine confirme les quantités disponibles.',
    step2Bullet3: 'Vous recevez rapidement une réponse avec devis et délai.',
    step2Bullet4: 'Une copie de votre demande peut aussi vous être envoyée.',
    emptyCart: "Aucune bouteille sélectionnée pour l'instant.",
    clearCart: 'Vider le panier',
    requestTitle: 'Coordonnées pour la demande',
    requestSubtitle: "Ces informations permettent au domaine de vous recontacter avec la disponibilité et l'estimation de livraison.",
    addToCart: 'Ajouter au panier',
    inCart: 'Déjà dans le panier',
    quantity: 'Qté',
    bottleSize: 'Format',
    noPrice: 'Tarif sur demande',
    requestButton: 'Ouvrir l’e-mail de demande',
    copyButton: 'Copier le récapitulatif',
    copySuccess: 'Le récapitulatif a été copié.',
    mailNotice: 'Votre client e-mail va s’ouvrir avec la demande préremplie.',
    mailMissing: "Adresse e-mail du domaine indisponible pour l'instant.",
    backButton: 'Retour',
    continueButton: 'Continuer',
    pricePending: 'Prix communiqué au retour du domaine.',
    totalBottles: 'bouteilles',
    fieldFirstName: 'Prénom',
    fieldLastName: 'Nom',
    fieldEmail: 'E-mail',
    fieldPhone: 'Téléphone',
    fieldCity: 'Ville',
    fieldPostalCode: 'Code postal',
    fieldCountry: 'Pays',
    fieldNotes: 'Informations complémentaires',
    requestHint: 'Aucun paiement en ligne. Vous recevrez une confirmation manuelle du domaine.',
    productFallback: 'Visuel produit',
  },
  en: {
    eyebrow: 'Shop',
    title: 'Prepare your order request',
    intro: 'Add the wines you want to your cart. The estate will then reply with lead time and shipping costs based on your location.',
    cartButton: 'View cart',
    cartTitle: 'Your selection',
    cartSubtitle: 'Temporary cart stored locally on this device.',
    stepSelection: 'Selection',
    stepProcedure: 'Process',
    stepDetails: 'Details',
    step1Title: 'Review your selection',
    step1Intro: 'Adjust quantities before moving to the request.',
    step2Title: 'How the request works',
    step2Intro: 'No online payment. The estate then confirms availability, calculates shipping costs and replies directly with a quote.',
    step2Bullet1: 'You send an order request, not a payment.',
    step2Bullet2: 'The estate confirms available quantities.',
    step2Bullet3: 'You receive a reply with quote and lead time.',
    step2Bullet4: 'A copy of your request can also be sent to you.',
    emptyCart: 'No bottles selected yet.',
    clearCart: 'Clear cart',
    requestTitle: 'Contact details for the request',
    requestSubtitle: 'These details let the estate reply with availability and delivery estimate.',
    addToCart: 'Add to cart',
    inCart: 'Already in cart',
    quantity: 'Qty',
    bottleSize: 'Format',
    noPrice: 'Price on request',
    requestButton: 'Open request email',
    copyButton: 'Copy summary',
    copySuccess: 'Summary copied to clipboard.',
    mailNotice: 'Your email client will open with the request prefilled.',
    mailMissing: 'Estate email address is currently unavailable.',
    backButton: 'Back',
    continueButton: 'Continue',
    pricePending: 'Price confirmed by the estate after review.',
    totalBottles: 'bottles',
    fieldFirstName: 'First name',
    fieldLastName: 'Last name',
    fieldEmail: 'Email',
    fieldPhone: 'Phone',
    fieldCity: 'City',
    fieldPostalCode: 'Postal code',
    fieldCountry: 'Country',
    fieldNotes: 'Additional details',
    requestHint: 'No online payment. The estate will confirm the order manually.',
    productFallback: 'Product visual',
  },
};

const readLocalStorage = (key, fallback) => {
  if (typeof window === 'undefined') {
    return fallback;
  }

  try {
    const rawValue = window.localStorage.getItem(key);
    return rawValue ? JSON.parse(rawValue) : fallback;
  } catch (_error) {
    return fallback;
  }
};

const allowedSteps = ['selection', 'procedure', 'details'];

const persistLocalStorage = (key, value) => {
  if (typeof window === 'undefined') {
    return;
  }

  window.localStorage.setItem(key, JSON.stringify(value));
};

const clipText = (value, maxLength = 140) => {
  if (!value) {
    return '';
  }

  return value.length > maxLength ? `${value.slice(0, maxLength).trim()}…` : value;
};

const getLocalizedWineName = (wine, lang) => wine?.wineName?.[lang] || wine?.wineName?.fr || wine?.bottle || '';

const ProductCard = ({ copy, lang, wine, quantity, onAdd, onDecrease, onIncrease }) => {
  const localizedName = getLocalizedWineName(wine, lang);
  const localizedDescription = wine?.desc?.[lang] || wine?.desc?.fr || '';
  const productImageUrl = wine?.bottleImageUrl || localBottleImagesByBottle[wine?.bottle] || '';
  const hasImage = Boolean(productImageUrl);

  return (
    <article className="boutique__card">
      <div className="boutique__card-media">
        {hasImage ? (
          <img src={productImageUrl} alt={localizedName} />
        ) : (
          <div className="boutique__card-placeholder">
            <img src={logo} alt={copy.productFallback} />
          </div>
        )}
      </div>

      <div className="boutique__card-body">
        <div className="boutique__card-copy">
          <p className="boutique__card-appel">{wine.appel}</p>
          <h2>{localizedName}</h2>
          <p className="boutique__card-description">{clipText(localizedDescription)}</p>
        </div>

        <div className="boutique__card-meta">
          <div>
            <span>{copy.bottleSize}</span>
            <strong>{wine.conditionnement}</strong>
          </div>
          {wine.price ? (
            <div>
              <span>Prix</span>
              <strong>{wine.price}</strong>
            </div>
          ) : null}
        </div>

        <div className="boutique__card-actions">
          {quantity ? (
            <div className="boutique__quantity-control">
              <button type="button" onClick={onDecrease} aria-label={`Retirer ${localizedName}`}>
                -
              </button>
              <span>{copy.quantity} {quantity}</span>
              <button type="button" onClick={onIncrease} aria-label={`Ajouter ${localizedName}`}>
                +
              </button>
            </div>
          ) : (
            <button type="button" className="boutique__add-button" onClick={onAdd}>
              {copy.addToCart}
            </button>
          )}
        </div>
      </div>
    </article>
  );
};

const CartIcon = () => (
  <svg
    className="boutique__cart-icon"
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    aria-hidden="true"
  >
    <path
      d="M3 4H5L7.2 14.2C7.32 14.76 7.81 15.16 8.38 15.16H17.9C18.47 15.16 18.96 14.77 19.08 14.22L20.4 8.16H6.1"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M9.5 19.5C9.5 20.05 9.05 20.5 8.5 20.5C7.95 20.5 7.5 20.05 7.5 19.5C7.5 18.95 7.95 18.5 8.5 18.5C9.05 18.5 9.5 18.95 9.5 19.5Z"
      fill="currentColor"
    />
    <path
      d="M18.5 19.5C18.5 20.05 18.05 20.5 17.5 20.5C16.95 20.5 16.5 20.05 16.5 19.5C16.5 18.95 16.95 18.5 17.5 18.5C18.05 18.5 18.5 18.95 18.5 19.5Z"
      fill="currentColor"
    />
  </svg>
);

const CartItem = ({ copy, item, wine, lang, onDecrease, onIncrease, onRemove }) => (
  <li className="boutique__cart-item">
    <div className="boutique__cart-item-copy">
      <strong>{getLocalizedWineName(wine, lang)}</strong>
      <span>{wine?.price || copy.pricePending}</span>
    </div>
    <div className="boutique__cart-item-actions">
      <div className="boutique__quantity-control boutique__quantity-control--compact">
        <button type="button" onClick={onDecrease} aria-label={`Retirer ${getLocalizedWineName(wine, lang)}`}>
          -
        </button>
        <span>{item.quantity}</span>
        <button type="button" onClick={onIncrease} aria-label={`Ajouter ${getLocalizedWineName(wine, lang)}`}>
          +
        </button>
      </div>
      <button type="button" className="boutique__text-action" onClick={onRemove}>
        ×
      </button>
    </div>
  </li>
);

const BoutiquePage = ({ lang = 'fr' }) => {
  const copy = content[lang] || content.fr;
  const [wines, setWines] = useState(fallbackWines);
  const [cart, setCart] = useState(() => readLocalStorage(CART_STORAGE_KEY, []));
  const [requestForm, setRequestForm] = useState(() => readLocalStorage(REQUEST_STORAGE_KEY, emptyRequestForm));
  const [cartStep, setCartStep] = useState(() => {
    const storedStep = readLocalStorage(CART_STEP_STORAGE_KEY, 'selection');
    return allowedSteps.includes(storedStep) ? storedStep : 'selection';
  });
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [recipientEmail, setRecipientEmail] = useState(contactPageDefault.left.email);
  const [notice, setNotice] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    persistLocalStorage(CART_STORAGE_KEY, cart);
  }, [cart]);

  useEffect(() => {
    persistLocalStorage(REQUEST_STORAGE_KEY, requestForm);
  }, [requestForm]);

  useEffect(() => {
    persistLocalStorage(CART_STEP_STORAGE_KEY, cartStep);
  }, [cartStep]);

  useEffect(() => {
    let ignore = false;

    if (!hasSupabaseWineReadConfig) {
      return undefined;
    }

    fetchPublicWines()
      .then((response) => {
        if (!ignore && response?.length) {
          setWines(response);
        }
      })
      .catch(() => {});

    return () => {
      ignore = true;
    };
  }, []);

  useEffect(() => {
    let ignore = false;

    fetchSiteContent('contact_page')
      .then((data) => {
        if (!ignore) {
          setRecipientEmail(data?.left?.email || contactPageDefault.left.email);
        }
      })
      .catch(() => {});

    return () => {
      ignore = true;
    };
  }, []);

  const cartCount = useMemo(
    () => cart.reduce((total, item) => total + item.quantity, 0),
    [cart],
  );

  const winesByBottle = useMemo(
    () => wines.reduce((accumulator, wine) => {
      accumulator[wine.bottle] = wine;
      return accumulator;
    }, {}),
    [wines],
  );

  const cartDetailed = useMemo(
    () => cart
      .map((item) => ({
        ...item,
        wine: winesByBottle[item.bottle],
      }))
      .filter((item) => item.wine),
    [cart, winesByBottle],
  );

  const updateCart = (nextCart) => {
    setCart(nextCart.filter((item) => item.quantity > 0));
  };

  const changeQuantity = (bottle, delta) => {
    const existingItem = cart.find((item) => item.bottle === bottle);

    if (!existingItem && delta > 0) {
      updateCart([...cart, { bottle, quantity: 1 }]);
      return;
    }

    const nextCart = cart
      .map((item) => (
        item.bottle === bottle ? { ...item, quantity: item.quantity + delta } : item
      ));

    updateCart(nextCart);
  };

  const handleAddToCart = (bottle) => {
    changeQuantity(bottle, 1);
    setNotice('');
    setCartStep('selection');
    setIsCartOpen(true);
  };

  const handleRequestField = (field, value) => {
    setRequestForm((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const requestSummary = useMemo(() => {
    const summaryLines = cartDetailed.map(({ quantity, wine }) => {
      const wineName = getLocalizedWineName(wine, lang);
      return `- ${wineName} x ${quantity}${wine.price ? ` (${wine.price})` : ''}`;
    });

    const customerLines = [
      `${copy.fieldFirstName}: ${requestForm.firstName || '-'}`,
      `${copy.fieldLastName}: ${requestForm.lastName || '-'}`,
      `${copy.fieldEmail}: ${requestForm.email || '-'}`,
      `${copy.fieldPhone}: ${requestForm.phone || '-'}`,
      `${copy.fieldCity}: ${requestForm.city || '-'}`,
      `${copy.fieldPostalCode}: ${requestForm.postalCode || '-'}`,
      `${copy.fieldCountry}: ${requestForm.country || '-'}`,
    ];

    const notesLine = requestForm.notes ? `${copy.fieldNotes}: ${requestForm.notes}` : '';

    return [
      lang === 'fr' ? 'Demande de commande boutique' : 'Shop order request',
      '',
      ...customerLines,
      '',
      lang === 'fr' ? 'Sélection client :' : 'Customer selection:',
      ...summaryLines,
      '',
      notesLine,
    ].filter(Boolean).join('\n');
  }, [cartDetailed, copy, lang, requestForm]);

  const handleCopySummary = async () => {
    if (!navigator?.clipboard) {
      return;
    }

    await navigator.clipboard.writeText(requestSummary);
    setNotice(copy.copySuccess);
  };

  const handleRequestSubmit = (event) => {
    event.preventDefault();

    if (!recipientEmail) {
      setNotice(copy.mailMissing);
      return;
    }

    const subject = encodeURIComponent(
      lang === 'fr'
        ? `Demande de commande - ${requestForm.firstName} ${requestForm.lastName}`.trim()
        : `Order request - ${requestForm.firstName} ${requestForm.lastName}`.trim(),
    );

    const body = encodeURIComponent(requestSummary);
    const cc = requestForm.email ? `&cc=${encodeURIComponent(requestForm.email)}` : '';
    window.location.href = `mailto:${recipientEmail}?subject=${subject}${cc}&body=${body}`;
    setNotice(copy.mailNotice);
  };

  const steps = [
    { id: 'selection', label: copy.stepSelection },
    { id: 'procedure', label: copy.stepProcedure },
    { id: 'details', label: copy.stepDetails },
  ];

  const currentStepIndex = steps.findIndex((step) => step.id === cartStep);

  const goToStep = (nextStep) => {
    if (!allowedSteps.includes(nextStep)) {
      return;
    }

    if (!cartDetailed.length && nextStep !== 'selection') {
      return;
    }

    setCartStep(nextStep);
  };

  return (
    <>
      <NavBar lang={lang} />

      <div className="boutique__page">
        <header className="boutique__hero">
          <div className="boutique__hero-copy">
            <h1>{copy.title}</h1>
            <p>{copy.intro}</p>
          </div>

          <button type="button" className="boutique__cart-trigger" onClick={() => setIsCartOpen(true)}>
            <CartIcon />
            <strong>{cartCount}</strong>
          </button>
        </header>

        <section className="boutique__catalog">
          {wines.map((wine) => {
            const quantity = cart.find((item) => item.bottle === wine.bottle)?.quantity || 0;

            return (
              <ProductCard
                key={wine.bottle}
                copy={copy}
                lang={lang}
                wine={wine}
                quantity={quantity}
                onAdd={() => handleAddToCart(wine.bottle)}
                onDecrease={() => changeQuantity(wine.bottle, -1)}
                onIncrease={() => changeQuantity(wine.bottle, 1)}
              />
            );
          })}
        </section>
      </div>

      <div className={`boutique__cart-shell${isCartOpen ? ' boutique__cart-shell--open' : ''}`} aria-hidden={!isCartOpen}>
        <button type="button" className="boutique__cart-backdrop" onClick={() => setIsCartOpen(false)} />

        <aside className="boutique__cart-panel">
          <div className="boutique__cart-head">
            <div>
              <h2>{copy.cartTitle}</h2>
              <p>{copy.cartSubtitle}</p>
            </div>
            <button type="button" className="boutique__text-action" onClick={() => setIsCartOpen(false)}>
              ×
            </button>
          </div>
          <div className="boutique__stepper">
            {steps.map((step, index) => (
              <button
                key={step.id}
                type="button"
                className={`boutique__step${cartStep === step.id ? ' boutique__step--active' : ''}${index < currentStepIndex ? ' boutique__step--complete' : ''}`}
                onClick={() => goToStep(step.id)}
                disabled={!cartDetailed.length && step.id !== 'selection'}
              >
                <span>{index + 1}</span>
                <strong>{step.label}</strong>
              </button>
            ))}
          </div>

          {cartStep === 'selection' ? (
            <>
              <div className="boutique__cart-summary">
                <span>{cartCount} {copy.totalBottles}</span>
                <button type="button" className="boutique__secondary-action" onClick={() => updateCart([])} disabled={!cartCount}>
                  {copy.clearCart}
                </button>
              </div>

              <div className="boutique__step-panel">
                <div className="boutique__request-head">
                  <h3>{copy.step1Title}</h3>
                  <p>{copy.step1Intro}</p>
                </div>

                {cartDetailed.length ? (
                  <ul className="boutique__cart-list">
                    {cartDetailed.map(({ bottle, quantity, wine }) => (
                      <CartItem
                        key={bottle}
                        copy={copy}
                        item={{ bottle, quantity }}
                        wine={wine}
                        lang={lang}
                        onDecrease={() => changeQuantity(bottle, -1)}
                        onIncrease={() => changeQuantity(bottle, 1)}
                        onRemove={() => updateCart(cart.filter((item) => item.bottle !== bottle))}
                      />
                    ))}
                  </ul>
                ) : (
                  <div className="boutique__cart-empty">{copy.emptyCart}</div>
                )}

                <div className="boutique__request-actions">
                  <button type="button" className="boutique__primary-action" onClick={() => goToStep('procedure')} disabled={!cartDetailed.length}>
                    {copy.continueButton}
                  </button>
                </div>
              </div>
            </>
          ) : null}

          {cartStep === 'procedure' ? (
            <div className="boutique__step-panel">
              <div className="boutique__request-head">
                <h3>{copy.step2Title}</h3>
                <p>{copy.step2Intro}</p>
              </div>

              <ul className="boutique__procedure-list">
                <li>{copy.step2Bullet1}</li>
                <li>{copy.step2Bullet2}</li>
                <li>{copy.step2Bullet3}</li>
                <li>{copy.step2Bullet4}</li>
              </ul>

              <div className="boutique__request-actions">
                <button type="button" className="boutique__secondary-action" onClick={() => goToStep('selection')}>
                  {copy.backButton}
                </button>
                <button type="button" className="boutique__primary-action" onClick={() => goToStep('details')}>
                  {copy.continueButton}
                </button>
              </div>
            </div>
          ) : null}

          {cartStep === 'details' ? (
            <form className="boutique__request-form boutique__step-panel" onSubmit={handleRequestSubmit}>
              <div className="boutique__request-head">
                <h3>{copy.requestTitle}</h3>
                <p>{copy.requestSubtitle}</p>
              </div>

              <div className="boutique__request-grid boutique__request-grid--two">
                <label>
                  <span>{copy.fieldFirstName}</span>
                  <input value={requestForm.firstName} onChange={(event) => handleRequestField('firstName', event.target.value)} />
                </label>
                <label>
                  <span>{copy.fieldLastName}</span>
                  <input value={requestForm.lastName} onChange={(event) => handleRequestField('lastName', event.target.value)} />
                </label>
              </div>

              <div className="boutique__request-grid boutique__request-grid--two">
                <label>
                  <span>{copy.fieldEmail}</span>
                  <input type="email" value={requestForm.email} onChange={(event) => handleRequestField('email', event.target.value)} />
                </label>
                <label>
                  <span>{copy.fieldPhone}</span>
                  <input value={requestForm.phone} onChange={(event) => handleRequestField('phone', event.target.value)} />
                </label>
              </div>

              <div className="boutique__request-grid boutique__request-grid--three">
                <label>
                  <span>{copy.fieldCity}</span>
                  <input value={requestForm.city} onChange={(event) => handleRequestField('city', event.target.value)} />
                </label>
                <label>
                  <span>{copy.fieldPostalCode}</span>
                  <input value={requestForm.postalCode} onChange={(event) => handleRequestField('postalCode', event.target.value)} />
                </label>
                <label>
                  <span>{copy.fieldCountry}</span>
                  <input value={requestForm.country} onChange={(event) => handleRequestField('country', event.target.value)} />
                </label>
              </div>

              <label className="boutique__request-field boutique__request-field--full">
                <span>{copy.fieldNotes}</span>
                <textarea
                  rows="4"
                  value={requestForm.notes}
                  onChange={(event) => handleRequestField('notes', event.target.value)}
                />
              </label>

              <p className="boutique__request-hint">{copy.requestHint}</p>

              {notice ? <p className="boutique__notice">{notice}</p> : null}

              <div className="boutique__request-actions">
                <button type="button" className="boutique__secondary-action" onClick={() => goToStep('procedure')}>
                  {copy.backButton}
                </button>

                <button type="submit" className="boutique__primary-action" disabled={!cartDetailed.length}>
                  {copy.requestButton}
                </button>
              </div>
            </form>
          ) : null}
        </aside>
      </div>
    </>
  );
};

export default BoutiquePage;
