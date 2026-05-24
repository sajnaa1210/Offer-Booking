import { Offer } from '../types';

const STORAGE_KEY = 'zenovo_saved_offer_ids';

function parseSavedIds(): number[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    const list = raw ? JSON.parse(raw) : [];
    return Array.isArray(list) ? list.filter((id) => typeof id === 'number') : [];
  } catch {
    return [];
  }
}

function writeSavedIds(ids: number[]) {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
}

export function getSavedOfferIds(): number[] {
  return parseSavedIds();
}

export function saveOfferId(offerId: number) {
  const ids = new Set(parseSavedIds());
  ids.add(offerId);
  writeSavedIds(Array.from(ids));
}

export function removeSavedOfferId(offerId: number) {
  const ids = new Set(parseSavedIds());
  ids.delete(offerId);
  writeSavedIds(Array.from(ids));
}

export function isOfferSavedId(offerId: number) {
  return parseSavedIds().includes(offerId);
}

export function getSavedOffers(offers: Offer[]): Offer[] {
  const ids = new Set(parseSavedIds());
  return offers.filter((offer) => ids.has(offer.id));
}
