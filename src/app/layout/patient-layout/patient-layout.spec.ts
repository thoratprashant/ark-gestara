import { describe, expect, it } from 'vitest';

import { PatientLayout } from './patient-layout';

describe('PatientLayout header', () => {
  it('uses separate scroll thresholds to avoid compact header flicker', () => {
    const layout = new PatientLayout();
    const scrollLayout = layout as unknown as {
      headerCompact: () => boolean;
      handleWindowScroll: () => void;
    };

    Object.defineProperty(window, 'scrollY', { configurable: true, value: 16 });
    scrollLayout.handleWindowScroll();
    expect(scrollLayout.headerCompact()).toBe(false);

    Object.defineProperty(window, 'scrollY', { configurable: true, value: 32 });
    scrollLayout.handleWindowScroll();
    expect(scrollLayout.headerCompact()).toBe(true);

    Object.defineProperty(window, 'scrollY', { configurable: true, value: 16 });
    scrollLayout.handleWindowScroll();
    expect(scrollLayout.headerCompact()).toBe(true);

    Object.defineProperty(window, 'scrollY', { configurable: true, value: 0 });
    scrollLayout.handleWindowScroll();
    expect(scrollLayout.headerCompact()).toBe(false);
  });
});
