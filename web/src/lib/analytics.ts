declare global {
	interface Window {
		dataLayer: unknown[];
		gtag?: (...args: unknown[]) => void;
	}
}

// Maps internal DOM section ids (e.g. "me") to the event vocabulary (e.g. "about").
export const SECTION_EVENT_NAMES: Record<string, string> = {
	hero: 'hero',
	me: 'about',
	projects: 'projects',
	skills: 'skills',
	fun: 'fun',
	writing: 'writing',
	contact: 'contact',
};

// Keep this literal in sync with the inline consent-default script in
// Layout.astro, which can't import it (is:inline scripts aren't bundled).
const CONSENT_STORAGE_KEY = 'ga-consent';
const CONSENT_TIMESTAMP_KEY = 'ga-consent-at';
const DENIED_CONSENT_TTL_MS = 7 * 24 * 60 * 60 * 1000;

export type ConsentChoice = 'granted' | 'denied';

// A "denied" choice expires after DENIED_CONSENT_TTL_MS and reverts to
// not_chosen (re-showing the banner); "granted" never expires.
export function getStoredConsent(): ConsentChoice | null {
	const value = localStorage.getItem(CONSENT_STORAGE_KEY);
	if (value !== 'granted' && value !== 'denied') return null;

	if (value === 'denied') {
		const storedAt = Number(localStorage.getItem(CONSENT_TIMESTAMP_KEY));
		if (!storedAt || Date.now() - storedAt > DENIED_CONSENT_TTL_MS) {
			localStorage.removeItem(CONSENT_STORAGE_KEY);
			localStorage.removeItem(CONSENT_TIMESTAMP_KEY);
			return null;
		}
	}

	return value;
}

export type ConsentState = ConsentChoice | 'not_chosen';

function getConsentState(): ConsentState {
	return getStoredConsent() ?? 'not_chosen';
}

// ad_storage/ad_user_data/ad_personalization stay permanently denied - no ads run here.
export function setStoredConsent(choice: ConsentChoice) {
	localStorage.setItem(CONSENT_STORAGE_KEY, choice);
	if (choice === 'denied') {
		localStorage.setItem(CONSENT_TIMESTAMP_KEY, String(Date.now()));
	} else {
		localStorage.removeItem(CONSENT_TIMESTAMP_KEY);
	}
	window.gtag?.('consent', 'update', { analytics_storage: choice });
}

// Queues js/config immediately (before any event can be tracked), decoupled
// from the actual gtag.js network download, which stays deferred to
// window "load" via loadGtagScript below - the dataLayer queue preserves
// this order regardless of when the real script finishes loading.
export function initGtagConfig(measurementId: string) {
	window.gtag?.('js', new Date());
	window.gtag?.('config', measurementId, {
		// Backstop for the same toggle in the GA4 property's Data Settings.
		allow_google_signals: false,
		allow_ad_personalization_signals: false,
	});
}

// Deferred to window "load" so the gtag.js download never competes with initial render.
export function loadGtagScript(measurementId: string) {
	if (document.getElementById('ga4-script')) return;

	const script = document.createElement('script');
	script.id = 'ga4-script';
	script.async = true;
	script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
	document.head.appendChild(script);
}

// Always sends - Consent Mode decides cookied vs. cookieless, not this helper.
// analytics_consent_state is set last so a caller can never override it.
export function trackEvent(name: string, params: Record<string, unknown> = {}) {
	if (typeof window.gtag !== 'function') return;
	window.gtag('event', name, { ...params, analytics_consent_state: getConsentState() });
}

// One delegated listener for every data-ga-event-tagged element site-wide.
export function initClickTracking() {
	document.addEventListener('click', (event) => {
		const trigger = (event.target as HTMLElement | null)?.closest<HTMLElement>('[data-ga-event]');
		if (!trigger?.dataset.gaEvent) return;

		let params: Record<string, unknown> = {};
		if (trigger.dataset.gaParams) {
			try {
				params = JSON.parse(trigger.dataset.gaParams);
			} catch {
				params = {};
			}
		}
		trackEvent(trigger.dataset.gaEvent, params);
	});
}
