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
});
