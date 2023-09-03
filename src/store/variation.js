import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';
import { shallow } from 'zustand/shallow';
import { cache } from '../services/cache/cache';
import { IS_BROWSER } from '../utils/isBrowser';

export const variationStore = create(
  subscribeWithSelector((set, get) => ({
    variations: IS_BROWSER ? cache.get('variations') || [] : [],
    saveVariation(variation) {
      set({
        variations: [variation, ...get().variations],
      });
    },
    deleteVariation(variation) {
      set({
        variations: get().variations.filter((item) => item === variation),
      });
    },
  })),
);

variationStore.subscribe(
  (state) => state.variations,
  (variations) => cache.set('variations', variations),
  { fireImmediately: false },
);

export const useVariationStore = (selector) =>
  variationStore(selector, shallow);
