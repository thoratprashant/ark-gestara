import { describe, expect, it } from 'vitest';
import { Router } from '@angular/router';

import { PatientLayout } from './patient-layout';

describe('PatientLayout header', () => {
  const router = { url: '/patient/dashboard' } as Router;

  it('uses separate scroll thresholds to avoid compact header flicker', () => {
    const layout = new PatientLayout(router);
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

  it('keeps Dashboard active on the patient list and patient dashboard routes', () => {
    const routerStub = { url: '/patient/patient-listing' };
    const layout = new PatientLayout(routerStub as Router) as unknown as {
      dashboardNavigationActive: () => boolean;
    };

    expect(layout.dashboardNavigationActive()).toBe(true);

    routerStub.url = '/patient/dashboard?patientId=123';
    expect(layout.dashboardNavigationActive()).toBe(true);

    routerStub.url = '/patient/previous-visits';
    expect(layout.dashboardNavigationActive()).toBe(false);
  });
});
