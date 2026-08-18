import { ElementRef } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { beforeAll, describe, expect, it, vi } from 'vitest';

import { PatientDashboard } from './patient-dashboard';
import { PatientDashboardModule } from './patient-dashboard.module';

describe('PatientDashboard timeline', () => {
  beforeAll(async () => {
    await TestBed.configureTestingModule({
      imports: [PatientDashboardModule],
    }).compileComponents();
  });

  it('keeps no more than one timeline group expanded', () => {
    const dashboard = new PatientDashboard();

    dashboard.toggleTimelineGroup('gdm-monitoring');
    expect(dashboard.expandedTimelineGroupId()).toBe('gdm-monitoring');

    dashboard.toggleTimelineGroup('gdm-monitoring');
    expect(dashboard.expandedTimelineGroupId()).toBeNull();
  });

  it('uses the Figma legend statuses and keeps edge ticks centered inside the axis', () => {
    const dashboard = new PatientDashboard();

    expect(dashboard.timelineLegend.map((item) => item.label)).toEqual([
      'Completed/Reviewed',
      'Completed/Not Reviewed',
      'Ordered',
      'Late',
      'Abnormal',
      'Future',
    ]);
    expect(dashboard.weekTickPercent(0)).toBeGreaterThan(0);
    expect(dashboard.weekTickPercent(40)).toBeLessThan(100);
  });

  it('marks a chip red only while it crosses the JSON current-week line', () => {
    const dashboard = new PatientDashboard();
    const chip = dashboard.pregnancyTimeline().groups[0].rows[0].chips[1];

    expect(dashboard.chipCrossesCurrentWeek(chip)).toBe(false);
    expect(dashboard.chipCrossesCurrentWeek({ ...chip, startWeek: 27, endWeek: 30 })).toBe(true);
  });

  it('moves a focused chip with the keyboard without leaving the 0 to 40 week range', () => {
    const dashboard = new PatientDashboard();
    const chip = dashboard.pregnancyTimeline().groups[0].rows[0].chips[0];
    const keyboardEvent = new KeyboardEvent('keydown', { key: 'ArrowRight' });

    dashboard.moveChipWithKeyboard(keyboardEvent, 'routine-prenatal-care', 'labs', chip);

    const movedChip = dashboard.pregnancyTimeline().groups[0].rows[0].chips[0];
    expect(movedChip.startWeek).toBe(4.5);
    expect(movedChip.endWeek).toBe(12.5);
  });

  it('uses the D3 week scale to drag and resize chips across the current-week line', () => {
    const dashboard = new PatientDashboard();
    const track = document.createElement('div');
    const chipElement = document.createElement('div');
    track.className = 'problem-timeline__track';
    track.append(chipElement);
    vi.spyOn(track, 'getBoundingClientRect').mockReturnValue({
      width: 400,
    } as DOMRect);

    const chip = dashboard.pregnancyTimeline().groups[0].rows[0].chips[1];
    dashboard.startChipInteraction(
      {
        currentTarget: chipElement,
        pointerId: 1,
        clientX: 100,
        preventDefault: vi.fn(),
        stopPropagation: vi.fn(),
      } as unknown as PointerEvent,
      'routine-prenatal-care',
      'labs',
      chip,
      'move',
    );
    dashboard.onChipPointerMove({
      pointerId: 1,
      clientX: 120,
      preventDefault: vi.fn(),
    } as unknown as PointerEvent);
    dashboard.endChipInteraction({ pointerId: 1 } as PointerEvent);

    const movedChip = dashboard.pregnancyTimeline().groups[0].rows[0].chips[1];
    expect(movedChip.startWeek).toBe(26);
    expect(movedChip.endWeek).toBe(29);
    expect(dashboard.chipCrossesCurrentWeek(movedChip)).toBe(true);

    dashboard.startChipInteraction(
      {
        currentTarget: chipElement,
        pointerId: 2,
        clientX: 120,
        preventDefault: vi.fn(),
        stopPropagation: vi.fn(),
      } as unknown as PointerEvent,
      'routine-prenatal-care',
      'labs',
      movedChip,
      'resize-end',
    );
    dashboard.onChipPointerMove({
      pointerId: 2,
      clientX: 140,
      preventDefault: vi.fn(),
    } as unknown as PointerEvent);

    const resizedChip = dashboard.pregnancyTimeline().groups[0].rows[0].chips[1];
    expect(resizedChip.endWeek).toBe(31);
  });

  it('opens the matching vital tooltip and generates its animated SVG path', () => {
    vi.useFakeTimers();
    const dashboard = new PatientDashboard();
    const section = document.createElement('section');
    const card = document.createElement('article');
    vi.spyOn(section, 'getBoundingClientRect').mockReturnValue({
      left: 0,
      top: 100,
      width: 1000,
    } as DOMRect);
    vi.spyOn(card, 'getBoundingClientRect').mockReturnValue({
      left: 120,
      bottom: 260,
    } as DOMRect);
    (
      dashboard as unknown as {
        vitalSigns: ElementRef<HTMLElement>;
      }
    ).vitalSigns = new ElementRef(section);

    dashboard.showVitalTooltip('heart-rate', {
      currentTarget: card,
    } as unknown as Event);

    const tooltip = dashboard.activeVitalTooltip();
    const chart = tooltip?.charts?.[0];
    expect(tooltip?.title).toBe('Fetal Heart Rate Trend');
    expect(dashboard.vitalTooltipPosition()).toEqual({ left: 120, top: 166, width: 500 });
    expect(chart && dashboard.vitalChartPath(chart, chart.series[0])).toMatch(/^M42,/);

    dashboard.scheduleVitalTooltipHide();
    vi.advanceTimersByTime(100);
    dashboard.keepVitalTooltipOpen();
    vi.advanceTimersByTime(200);
    expect(dashboard.activeVitalTooltip()).not.toBeNull();

    dashboard.scheduleVitalTooltipHide();
    vi.advanceTimersByTime(180);
    expect(dashboard.activeVitalTooltip()).toBeNull();
    vi.useRealTimers();
  });

  it('counts each numeric vital from zero to its assigned value on load', () => {
    const dashboard = new PatientDashboard();
    const originalMatchMedia = window.matchMedia;
    let animationFrame: FrameRequestCallback | undefined;
    Object.defineProperty(window, 'matchMedia', {
      configurable: true,
      value: vi.fn(() => ({ matches: false })),
    });
    const requestAnimationFrame = vi
      .spyOn(window, 'requestAnimationFrame')
      .mockImplementation((callback) => {
        animationFrame = callback;
        return 1;
      });

    dashboard.ngAfterViewInit();
    expect(dashboard.vitalCounts().systolic).toBe(0);

    animationFrame?.(100);
    animationFrame?.(650);
    expect(dashboard.vitalCounts().systolic).toBeGreaterThan(0);
    expect(dashboard.vitalCounts().systolic).toBeLessThan(148);

    animationFrame?.(1200);
    expect(dashboard.vitalCounts()).toEqual({
      bmi: 26.3,
      currentWeight: 165,
      diastolic: 92,
      fundalHeight: 28,
      heartRate: 142,
      systolic: 148,
      weightGain: 22,
    });

    requestAnimationFrame.mockRestore();
    Object.defineProperty(window, 'matchMedia', {
      configurable: true,
      value: originalMatchMedia,
    });
  });

  it('uses scroll hysteresis when switching the summary to sticky mode', () => {
    const dashboard = new PatientDashboard();
    const summary = document.createElement('section');
    vi.spyOn(summary, 'getBoundingClientRect').mockReturnValue({
      top: 70,
      height: 286.4,
    } as DOMRect);
    (
      dashboard as unknown as {
        patientSummary: ElementRef<HTMLElement>;
      }
    ).patientSummary = new ElementRef(summary);

    Object.defineProperty(window, 'scrollY', { configurable: true, value: 5 });
    dashboard.onWindowScroll();

    expect(dashboard.summarySticky()).toBe(false);
    expect(dashboard.summaryExpanded()).toBe(true);

    Object.defineProperty(window, 'scrollY', { configurable: true, value: 12 });

    dashboard.onWindowScroll();

    expect(dashboard.summarySticky()).toBe(true);
    expect(dashboard.summaryExpanded()).toBe(false);

    Object.defineProperty(window, 'scrollY', { configurable: true, value: 0 });
    dashboard.onWindowScroll();

    expect(dashboard.summarySticky()).toBe(false);
    expect(dashboard.summaryExpanded()).toBe(true);
  });
});
