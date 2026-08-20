import { ElementRef } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { of } from 'rxjs';
import { beforeAll, describe, expect, it, vi } from 'vitest';

import { PatientDashboard } from './patient-dashboard';
import { PatientDashboardModule } from './patient-dashboard.module';
import { AddProblemDialog } from './add-problem-dialog/add-problem-dialog';
import { TimelineItemDialog } from './timeline-item-dialog/timeline-item-dialog';

describe('PatientDashboard timeline', () => {
  beforeAll(async () => {
    await TestBed.configureTestingModule({
      imports: [PatientDashboardModule],
    }).compileComponents();
  });

  it('starts with five of ten groups expanded and toggles each group independently', () => {
    const dashboard = new PatientDashboard();
    const groups = dashboard.pregnancyTimeline().groups;

    expect(groups).toHaveLength(10);
    expect(groups.slice(0, 5).every((group) => dashboard.isTimelineGroupExpanded(group.id))).toBe(
      true,
    );
    expect(groups.slice(5).every((group) => !dashboard.isTimelineGroupExpanded(group.id))).toBe(
      true,
    );

    dashboard.toggleTimelineGroup(groups[5].id);
    expect(dashboard.isTimelineGroupExpanded(groups[5].id)).toBe(true);
    expect(dashboard.isTimelineGroupExpanded(groups[0].id)).toBe(true);

    dashboard.toggleTimelineGroup(groups[0].id);
    expect(dashboard.isTimelineGroupExpanded(groups[0].id)).toBe(false);
    expect(dashboard.isTimelineGroupExpanded(groups[5].id)).toBe(true);
  });

  it('opens the Material timeline dialog with enabled task and medication fields', () => {
    const fixture = TestBed.createComponent(PatientDashboard);
    const dialog = TestBed.inject(MatDialog);
    fixture.detectChanges();

    const addButton = fixture.nativeElement.querySelector(
      '.problem-timeline__group-add',
    ) as HTMLButtonElement;
    addButton.click();
    fixture.detectChanges();

    expect(dialog.openDialogs).toHaveLength(1);
    const dialogComponent = dialog.openDialogs[0].componentInstance as TimelineItemDialog;
    expect(dialogComponent.mode()).toBe('task');
    expect(
      Object.values(dialogComponent.taskForm.controls).every((control) => control.enabled),
    ).toBe(true);

    dialogComponent.setMode('medication');
    expect(dialogComponent.mode()).toBe('medication');
    expect(
      Object.values(dialogComponent.medicationForm.controls).every((control) => control.enabled),
    ).toBe(true);

    dialog.closeAll();
  });

  it('adds the submitted dialog item to the selected timeline group and keeps undo available', () => {
    const dialog = {
      open: vi.fn(() => ({
        afterClosed: () =>
          of({
            endWeek: 32.5,
            mode: 'task' as const,
            name: 'Weekly glucose review',
            startWeek: 28.5,
          }),
      })),
    } as unknown as MatDialog;
    const dashboard = new PatientDashboard(dialog);
    const group = dashboard.pregnancyTimeline().groups[0];
    const originalRowCount = group.rows.length;

    dashboard.openTimelineItemDialog(group.id);

    expect(dialog.open).toHaveBeenCalledWith(
      TimelineItemDialog,
      expect.objectContaining({ restoreFocus: false }),
    );
    const updatedGroup = dashboard.pregnancyTimeline().groups[0];
    expect(updatedGroup.rows).toHaveLength(originalRowCount + 1);
    expect(updatedGroup.rows.at(-1)?.label).toBe('Weekly glucose review');
    expect(updatedGroup.rows.at(-1)?.chips[0]).toMatchObject({
      startWeek: 28.5,
      endWeek: 32.5,
      status: 'future',
    });
    expect(dashboard.canUndoTimeline()).toBe(true);
  });

  it('opens the Add Problem Material dialog with an enabled problem-name field', () => {
    const fixture = TestBed.createComponent(PatientDashboard);
    const dialog = TestBed.inject(MatDialog);
    fixture.detectChanges();

    const addProblemButton = fixture.nativeElement.querySelector(
      '.problem-timeline__add-problem',
    ) as HTMLButtonElement;
    addProblemButton.click();
    fixture.detectChanges();

    expect(dialog.openDialogs).toHaveLength(1);
    const dialogComponent = dialog.openDialogs[0].componentInstance as AddProblemDialog;
    expect(dialogComponent.form.controls.name.enabled).toBe(true);

    dialog.closeAll();
  });

  it('places the Add Problem action after the timeline groups', () => {
    const fixture = TestBed.createComponent(PatientDashboard);
    fixture.detectChanges();

    const groups = fixture.nativeElement.querySelectorAll(
      '.problem-timeline__group',
    ) as NodeListOf<HTMLElement>;
    const lastGroup = groups.item(groups.length - 1);
    const addProblemButton = fixture.nativeElement.querySelector(
      '.problem-timeline__add-problem',
    ) as HTMLButtonElement;

    expect(
      lastGroup.compareDocumentPosition(addProblemButton) & Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy();
  });

  it('shows condition-specific tooltip content from every timeline group toggle', () => {
    const fixture = TestBed.createComponent(PatientDashboard);
    fixture.detectChanges();

    const dashboard = fixture.componentInstance;
    const groups = dashboard.pregnancyTimeline().groups;
    const toggles = Array.from(
      fixture.nativeElement.querySelectorAll('.problem-timeline__group-toggle'),
    ) as HTMLButtonElement[];

    expect(toggles).toHaveLength(groups.length);
    expect(new Set(groups.map((group) => group.condition.tags[0].label)).size).toBe(groups.length);

    toggles.forEach((toggle, index) => {
      toggle.dispatchEvent(new MouseEvent('mouseenter'));
      fixture.detectChanges();

      const tooltip = fixture.nativeElement.querySelector(
        '#timeline-condition-tooltip',
      ) as HTMLElement;
      expect(tooltip.textContent).toContain(groups[index].label);
      expect(tooltip.textContent).toContain(groups[index].condition.tags[0].label);
      expect(tooltip.textContent).toContain(groups[index].condition.description);
    });
  });

  it('keeps the full Figma tooltip visible by opening above groups near the viewport edge', () => {
    const dashboard = new PatientDashboard();
    const toggle = document.createElement('button');
    const icon = document.createElement('img');
    icon.className = 'problem-timeline__group-icon';
    toggle.appendChild(icon);
    const group = dashboard.pregnancyTimeline().groups[0];
    vi.spyOn(toggle, 'getBoundingClientRect').mockReturnValue({
      bottom: 740,
      height: 40,
      left: 120,
      right: 300,
      top: 700,
      width: 180,
    } as DOMRect);
    vi.spyOn(icon, 'getBoundingClientRect').mockReturnValue({
      bottom: 726,
      height: 14,
      left: 140,
      right: 154,
      top: 712,
      width: 14,
    } as DOMRect);

    dashboard.showTimelineGroupTooltip(group, { currentTarget: toggle } as unknown as Event);

    expect(dashboard.timelineGroupTooltipPosition()).toEqual({
      left: 140,
      top: 425.994,
      width: 350,
    });
    expect(dashboard.timelineGroupTooltipMaxHeight()).toBe(266.006);
  });

  it('adds a submitted problem as an expandable timeline group with undo support', () => {
    const dialog = {
      open: vi.fn(() => ({
        afterClosed: () => of({ name: 'Maternal anemia' }),
      })),
    } as unknown as MatDialog;
    const dashboard = new PatientDashboard(dialog);
    const originalGroupCount = dashboard.pregnancyTimeline().groups.length;

    dashboard.openAddProblemDialog();

    expect(dialog.open).toHaveBeenCalledWith(
      AddProblemDialog,
      expect.objectContaining({ restoreFocus: false }),
    );
    const addedGroup = dashboard.pregnancyTimeline().groups.at(-1);
    expect(dashboard.pregnancyTimeline().groups).toHaveLength(originalGroupCount + 1);
    expect(addedGroup).toMatchObject({ label: 'Maternal anemia', rows: [] });
    expect(addedGroup && dashboard.isTimelineGroupExpanded(addedGroup.id)).toBe(true);
    expect(dashboard.canUndoTimeline()).toBe(true);
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

  it('renders each timeline chip label from its data status', () => {
    const fixture = TestBed.createComponent(PatientDashboard);
    fixture.detectChanges();
    const statusLabels: Record<string, string> = {
      completed: 'Completed/Reviewed',
      'not-reviewed': 'Completed/Not Reviewed',
      ordered: 'Ordered',
      late: 'Late',
      abnormal: 'Abnormal',
      future: 'Future',
    };

    const chips = Array.from(
      fixture.nativeElement.querySelectorAll('.problem-timeline__chip'),
    ) as HTMLElement[];

    expect(chips.length).toBeGreaterThan(0);
    chips.forEach((chip) => {
      const status = chip.dataset['status'] ?? '';
      expect(chip.querySelector('.problem-timeline__chip-label')?.textContent?.trim()).toBe(
        statusLabels[status],
      );
    });
  });

  it('shows the matching custom status tooltip when each chip status is hovered', () => {
    const fixture = TestBed.createComponent(PatientDashboard);
    fixture.detectChanges();
    const expectedBadges: Record<string, string> = {
      abnormal: 'Abnormal Finding',
      completed: 'Completed/Reviewed',
      future: 'Future',
      late: 'Late',
      'not-reviewed': 'Completed/Not Reviewed',
      ordered: 'Ordered',
    };

    Object.entries(expectedBadges).forEach(([status, badge]) => {
      const chip = fixture.nativeElement.querySelector(
        `.problem-timeline__chip[data-status="${status}"]`,
      ) as HTMLElement;

      expect(chip).toBeTruthy();
      chip.dispatchEvent(new MouseEvent('mouseenter'));
      fixture.detectChanges();

      const tooltip = fixture.nativeElement.querySelector(
        '.timeline-status-tooltip',
      ) as HTMLElement;
      expect(tooltip.dataset['status']).toBe(status);
      expect(tooltip.querySelector('.timeline-status-tooltip__badge')?.textContent?.trim()).toBe(
        badge,
      );
      expect(tooltip.style.maxHeight).not.toBe('');
      expect(tooltip.querySelector('.timeline-status-tooltip__test-list--scrollable')).toBeNull();
    });
  });

  it('expands tooltip notes according to their wrapped content', () => {
    const dashboard = new PatientDashboard();

    expect(dashboard.timelineStatusTooltipNoteRows('Short note')).toBe(2);
    expect(dashboard.timelineStatusTooltipNoteRows('A'.repeat(100))).toBe(3);
    expect(dashboard.timelineStatusTooltipNoteRows('First line\nSecond line\nThird line')).toBe(3);
  });

  it('keeps the status tooltip open while its controls are being used', () => {
    vi.useFakeTimers();
    const fixture = TestBed.createComponent(PatientDashboard);
    fixture.detectChanges();
    const dashboard = fixture.componentInstance;
    const chip = fixture.nativeElement.querySelector(
      '.problem-timeline__chip[data-status="ordered"]',
    ) as HTMLElement;

    chip.dispatchEvent(new MouseEvent('mouseenter'));
    fixture.detectChanges();

    const tooltip = fixture.nativeElement.querySelector('.timeline-status-tooltip') as HTMLElement;
    const input = tooltip.querySelector('input') as HTMLInputElement;
    input.focus();
    dashboard.scheduleTimelineStatusTooltipHide();
    vi.advanceTimersByTime(200);

    expect(dashboard.activeTimelineStatusTooltip()).not.toBeNull();

    const outsideButton = document.createElement('button');
    document.body.append(outsideButton);
    outsideButton.focus();
    dashboard.onTimelineStatusTooltipFocusOut({
      currentTarget: tooltip,
      relatedTarget: outsideButton,
    } as unknown as FocusEvent);
    vi.advanceTimersByTime(200);

    expect(dashboard.activeTimelineStatusTooltip()).toBeNull();
    outsideButton.remove();
    vi.useRealTimers();
  });

  it('limits the complete tooltip height only when vertical space is constrained', () => {
    const dashboard = new PatientDashboard();
    const trigger = document.createElement('div');
    const originalInnerHeight = window.innerHeight;
    const lateChip = dashboard.pregnancyTimeline().groups[0].rows[2].chips[0];
    Object.defineProperty(window, 'innerHeight', { configurable: true, value: 260 });
    vi.spyOn(trigger, 'getBoundingClientRect').mockReturnValue({
      bottom: 100,
      height: 20,
      left: 100,
      right: 200,
      top: 80,
      width: 100,
    } as DOMRect);

    dashboard.showTimelineStatusTooltip(lateChip, {
      currentTarget: trigger,
    } as unknown as Event);

    expect(dashboard.timelineStatusTooltipMaxHeight()).toBe(138);
    Object.defineProperty(window, 'innerHeight', {
      configurable: true,
      value: originalInnerHeight,
    });
  });

  it('detects when a chip crosses the JSON current-week line without changing its status', () => {
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
    expect(movedChip.status).toBe('ordered');
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

  it('switches only late and future chips when they move across the current-week line', () => {
    const dashboard = new PatientDashboard();
    const track = document.createElement('div');
    const chipElement = document.createElement('div');
    track.className = 'problem-timeline__track';
    track.append(chipElement);
    vi.spyOn(track, 'getBoundingClientRect').mockReturnValue({ width: 400 } as DOMRect);

    const lateChip = dashboard.pregnancyTimeline().groups[0].rows[2].chips[0];
    dashboard.startChipInteraction(
      {
        currentTarget: chipElement,
        pointerId: 3,
        clientX: 100,
        preventDefault: vi.fn(),
        stopPropagation: vi.fn(),
      } as unknown as PointerEvent,
      'routine-prenatal-care',
      'genetic-screening',
      lateChip,
      'move',
    );
    dashboard.onChipPointerMove({
      pointerId: 3,
      clientX: 340,
      preventDefault: vi.fn(),
    } as unknown as PointerEvent);
    dashboard.endChipInteraction({ pointerId: 3 } as PointerEvent);

    const futureChip = dashboard.pregnancyTimeline().groups[0].rows[2].chips[0];
    expect(futureChip.startWeek).toBe(28);
    expect(futureChip.status).toBe('future');

    dashboard.startChipInteraction(
      {
        currentTarget: chipElement,
        pointerId: 4,
        clientX: 340,
        preventDefault: vi.fn(),
        stopPropagation: vi.fn(),
      } as unknown as PointerEvent,
      'routine-prenatal-care',
      'genetic-screening',
      futureChip,
      'move',
    );
    dashboard.onChipPointerMove({
      pointerId: 4,
      clientX: 330,
      preventDefault: vi.fn(),
    } as unknown as PointerEvent);

    const lateAgainChip = dashboard.pregnancyTimeline().groups[0].rows[2].chips[0];
    expect(lateAgainChip.startWeek).toBe(27);
    expect(lateAgainChip.status).toBe('late');
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
      right: 300,
      top: 180,
      bottom: 260,
      width: 180,
      height: 80,
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
    expect(dashboard.vitalTooltipPosition()).toEqual({ left: 120, top: 166, width: 520 });
    expect(dashboard.tooltipGlassFocusRect()).toEqual({
      left: 114,
      right: 306,
      top: 174,
      bottom: 266,
    });
    expect(chart && dashboard.vitalChartPath(chart, chart.series[0])).toMatch(/^M42,/);

    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    vi.spyOn(svg, 'getBoundingClientRect').mockReturnValue({ left: 0, width: 420 } as DOMRect);
    if (chart) {
      dashboard.updateVitalChartHover(
        { currentTarget: svg, clientX: 402 } as unknown as MouseEvent,
        chart,
        0,
      );
      expect(dashboard.vitalChartHover()).toEqual({ chartIndex: 0, pointIndex: 5 });
      dashboard.clearVitalChartHover(0);
      expect(dashboard.vitalChartHover()).toBeNull();
    }

    dashboard.showVitalTooltip('blood-pressure', {
      currentTarget: card,
    } as unknown as Event);
    const bloodPressureChart = dashboard.activeVitalTooltip()?.charts?.[0];
    expect(bloodPressureChart && dashboard.vitalChartViewBox(bloodPressureChart)).toBe(
      '0 0 420 120',
    );

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

  it('opens each Figma result tooltip at the top-right edge of its result card', () => {
    vi.useFakeTimers();
    const dashboard = new PatientDashboard();
    const card = document.createElement('article');
    vi.spyOn(card, 'getBoundingClientRect').mockReturnValue({
      left: 120,
      right: 600,
      top: 200,
      bottom: 360,
    } as DOMRect);

    dashboard.showResultTooltip('cbc', { currentTarget: card } as unknown as Event);

    expect(dashboard.activeResultTooltip()?.title).toBe('Complete Blood Count (CBC)');
    expect(dashboard.activeResultTooltip()?.rows).toHaveLength(14);
    expect(dashboard.resultTooltipPosition()).toEqual({ left: 180, top: 200, width: 420 });
    expect(dashboard.tooltipGlassActive()).toBe(true);
    expect(dashboard.tooltipGlassFocusRect()).toEqual({
      left: 114,
      right: 606,
      top: 194,
      bottom: 366,
    });

    dashboard.showResultTooltip('home-bp', { currentTarget: card } as unknown as Event);
    expect(dashboard.activeResultTooltip()?.chart?.series.map((series) => series.label)).toEqual([
      'Systolic',
      'Diastolic',
    ]);
    expect(dashboard.resultTooltipPosition()).toEqual({ left: 80, top: 200, width: 520 });

    dashboard.showResultTooltip('blood-glucose', { currentTarget: card } as unknown as Event);
    expect(dashboard.activeResultTooltip()?.footer.map((item) => item.message)).toEqual([
      'Elevated fasting readings: 50%',
      'Elevated post-prandial readings: 0%',
    ]);
    expect(dashboard.resultTooltipPosition()).toEqual({ left: 80, top: 200, width: 520 });

    dashboard.scheduleResultTooltipHide();
    vi.advanceTimersByTime(180);
    expect(dashboard.activeResultTooltip()).toBeNull();
    vi.useRealTimers();
  });

  it('opens the pre-eclampsia assessment below the high-risk summary fact', () => {
    vi.useFakeTimers();
    const dashboard = new PatientDashboard();
    const riskFact = document.createElement('button');
    vi.spyOn(riskFact, 'getBoundingClientRect').mockReturnValue({
      left: 760,
      right: 900,
      top: 80,
      bottom: 120,
      width: 140,
      height: 40,
    } as DOMRect);

    dashboard.showRiskAssessment({ currentTarget: riskFact } as unknown as Event);

    expect(dashboard.riskAssessmentOpen()).toBe(true);
    expect(dashboard.riskAssessmentPosition()).toEqual({ left: 300, top: 128, width: 600 });
    expect(dashboard.tooltipGlassFocusRect()).toEqual({
      left: 754,
      right: 906,
      top: 74,
      bottom: 126,
    });
    expect(
      dashboard.highRiskFactors.filter((factor) => factor.selected).map((factor) => factor.label),
    ).toEqual(['Chronic hypertension']);
    expect(dashboard.moderateRiskFactors).toHaveLength(5);

    dashboard.scheduleRiskAssessmentHide();
    vi.advanceTimersByTime(100);
    dashboard.keepRiskAssessmentOpen();
    vi.advanceTimersByTime(200);
    expect(dashboard.riskAssessmentOpen()).toBe(true);

    dashboard.scheduleRiskAssessmentHide();
    vi.advanceTimersByTime(180);
    expect(dashboard.riskAssessmentOpen()).toBe(false);
    expect(dashboard.tooltipGlassActive()).toBe(false);
    vi.useRealTimers();
  });

  it('opens the delivery window tooltip below the recommended delivery summary fact', () => {
    vi.useFakeTimers();
    const dashboard = new PatientDashboard();
    const deliveryFact = document.createElement('button');
    vi.spyOn(deliveryFact, 'getBoundingClientRect').mockReturnValue({
      left: 620,
      right: 860,
      top: 80,
      bottom: 120,
      width: 240,
      height: 40,
    } as DOMRect);

    dashboard.showDeliveryWindowTooltip({ currentTarget: deliveryFact } as unknown as Event);

    expect(dashboard.deliveryWindowTooltipOpen()).toBe(true);
    expect(dashboard.deliveryWindowTooltipPosition()).toEqual({ left: 560, top: 128, width: 300 });
    expect(dashboard.tooltipGlassActive()).toBe(true);
    expect(dashboard.tooltipGlassFocusRect()).toEqual({
      left: 614,
      right: 866,
      top: 74,
      bottom: 126,
    });

    dashboard.scheduleDeliveryWindowTooltipHide();
    vi.advanceTimersByTime(100);
    dashboard.keepDeliveryWindowTooltipOpen();
    vi.advanceTimersByTime(200);
    expect(dashboard.deliveryWindowTooltipOpen()).toBe(true);

    dashboard.scheduleDeliveryWindowTooltipHide();
    vi.advanceTimersByTime(180);
    expect(dashboard.deliveryWindowTooltipOpen()).toBe(false);
    expect(dashboard.tooltipGlassActive()).toBe(false);
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
