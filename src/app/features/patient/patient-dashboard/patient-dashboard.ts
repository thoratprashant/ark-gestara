import { Component, ElementRef, HostListener, ViewChild, signal } from '@angular/core';
import { scaleLinear } from 'd3-scale';

type TimelineStatus = 'completed' | 'not-reviewed' | 'ordered' | 'late' | 'abnormal' | 'future';
type ChipInteractionMode = 'move' | 'resize-start' | 'resize-end';

interface TimelineChip {
  id: string;
  label: string;
  status: TimelineStatus;
  startWeek: number;
  endWeek: number;
}

interface TimelineRow {
  id: string;
  label: string;
  chips: TimelineChip[];
}

interface TimelineGroup {
  id: string;
  label: string;
  rows: TimelineRow[];
}

interface PregnancyTimeline {
  currentWeek: number;
  maxWeek: number;
  groups: TimelineGroup[];
}

interface ActiveChipInteraction {
  groupId: string;
  rowId: string;
  chipId: string;
  mode: ChipInteractionMode;
  pointerId: number;
  originX: number;
  trackWidth: number;
  startWeek: number;
  endWeek: number;
}

const INITIAL_TIMELINE: PregnancyTimeline = {
  currentWeek: 28,
  maxWeek: 40,
  groups: [
    {
      id: 'routine-prenatal-care',
      label: 'Routine Prenatal Care',
      rows: [
        {
          id: 'labs',
          label: 'Labs',
          chips: [
            {
              id: 'labs-1',
              label: 'Initial prenatal labs',
              status: 'completed',
              startWeek: 4,
              endWeek: 12,
            },
            {
              id: 'labs-2',
              label: 'Third trimester labs',
              status: 'ordered',
              startWeek: 24,
              endWeek: 27,
            },
            { id: 'labs-3', label: 'Final labs', status: 'future', startWeek: 36, endWeek: 40 },
          ],
        },
        {
          id: 'aneuploidy-screening',
          label: 'Aneuploidy screening',
          chips: [
            {
              id: 'aneuploidy-1',
              label: 'Aneuploidy screening',
              status: 'completed',
              startWeek: 10,
              endWeek: 14,
            },
          ],
        },
        {
          id: 'genetic-screening',
          label: 'Genetic screening',
          chips: [
            {
              id: 'genetic-1',
              label: 'Genetic screening',
              status: 'late',
              startWeek: 4,
              endWeek: 12,
            },
          ],
        },
        {
          id: 'anatomy-ultrasound',
          label: 'Anatomy ultrasound',
          chips: [
            {
              id: 'anatomy-1',
              label: 'Anatomy ultrasound',
              status: 'completed',
              startWeek: 18,
              endWeek: 22,
            },
          ],
        },
        {
          id: 'gbs-screening',
          label: 'GBS screening',
          chips: [
            { id: 'gbs-1', label: 'GBS screening', status: 'future', startWeek: 35, endWeek: 37 },
          ],
        },
        {
          id: 'glucose-screening',
          label: 'Glucose screening',
          chips: [
            {
              id: 'glucose-1',
              label: 'Glucose screening',
              status: 'abnormal',
              startWeek: 24,
              endWeek: 28,
            },
          ],
        },
      ],
    },
    {
      id: 'gdm-monitoring',
      label: 'GDM Monitoring',
      rows: [
        {
          id: 'blood-glucose-log',
          label: 'Blood glucose log',
          chips: [
            {
              id: 'glucose-log-1',
              label: 'Daily glucose monitoring',
              status: 'completed',
              startWeek: 26,
              endWeek: 30,
            },
          ],
        },
        {
          id: 'nutrition-review',
          label: 'Nutrition review',
          chips: [
            {
              id: 'nutrition-1',
              label: 'Dietitian review',
              status: 'not-reviewed',
              startWeek: 29,
              endWeek: 32,
            },
          ],
        },
        {
          id: 'growth-ultrasound',
          label: 'Growth ultrasound',
          chips: [
            {
              id: 'growth-1',
              label: 'Growth ultrasound',
              status: 'future',
              startWeek: 32,
              endWeek: 36,
            },
          ],
        },
      ],
    },
  ],
};

@Component({
  selector: 'app-patient-dashboard',
  standalone: false,
  templateUrl: './patient-dashboard.html',
  styleUrl: './patient-dashboard.scss',
})
export class PatientDashboard {
  @ViewChild('patientSummary')
  private patientSummary?: ElementRef<HTMLElement>;

  private summaryManuallyCollapsed = false;

  readonly summaryExpanded = signal(true);
  readonly summarySticky = signal(false);
  readonly stickyLeft = signal(0);
  readonly stickyWidth = signal(0);
  readonly visitSummaryExpanded = signal(true);
  readonly progressNoteExpanded = signal(true);
  readonly pregnancyTimeline = signal(this.cloneTimeline(INITIAL_TIMELINE));
  readonly expandedTimelineGroupId = signal<string | null>('routine-prenatal-care');
  readonly weekTicks = Array.from({ length: 11 }, (_, index) => index * 4);
  readonly timelineLegend: ReadonlyArray<{ label: string; status: TimelineStatus }> = [
    { label: 'Completed/Reviewed', status: 'completed' },
    { label: 'Completed/Not Reviewed', status: 'not-reviewed' },
    { label: 'Ordered', status: 'ordered' },
    { label: 'Late', status: 'late' },
    { label: 'Abnormal', status: 'abnormal' },
    { label: 'Future', status: 'future' },
  ];

  private activeChipInteraction: ActiveChipInteraction | null = null;
  private timelineHistory: PregnancyTimeline[] = [];

  toggleVisitSummary(): void {
    this.visitSummaryExpanded.update((expanded) => !expanded);
  }

  toggleProgressNote(): void {
    this.progressNoteExpanded.update((expanded) => !expanded);
  }

  toggleTimelineGroup(groupId: string): void {
    this.expandedTimelineGroupId.update((expandedId) => (expandedId === groupId ? null : groupId));
  }

  weekPercent(week: number): number {
    return (week / this.pregnancyTimeline().maxWeek) * 100;
  }

  weekTickPercent(week: number): number {
    const edgeInset = 1.5;
    return edgeInset + (week / this.pregnancyTimeline().maxWeek) * (100 - edgeInset * 2);
  }

  timelineLinePosition(): string {
    const timeline = this.pregnancyTimeline();
    return `calc(12.5rem + (100% - 12.5rem) * ${timeline.currentWeek / timeline.maxWeek})`;
  }

  chipCrossesCurrentWeek(chip: TimelineChip): boolean {
    const currentWeek = this.pregnancyTimeline().currentWeek;
    return chip.startWeek < currentWeek && chip.endWeek > currentWeek;
  }

  timelineChipTooltip(chip: TimelineChip): string {
    const status =
      this.timelineLegend.find((item) => item.status === chip.status)?.label ?? chip.status;
    const range = `${this.formatWeek(chip.startWeek)} to ${this.formatWeek(chip.endWeek)}`;
    const currentWeekNote = this.chipCrossesCurrentWeek(chip) ? ' - crosses the current week' : '';
    return `${chip.label}: ${range} - ${status}${currentWeekNote}`;
  }

  startChipInteraction(
    event: PointerEvent,
    groupId: string,
    rowId: string,
    chip: TimelineChip,
    mode: ChipInteractionMode,
  ): void {
    const track = (event.currentTarget as HTMLElement).closest<HTMLElement>(
      '.problem-timeline__track',
    );
    const trackWidth = track?.getBoundingClientRect().width ?? 0;

    if (!trackWidth) {
      return;
    }

    event.preventDefault();
    event.stopPropagation();
    this.rememberTimeline();
    this.activeChipInteraction = {
      groupId,
      rowId,
      chipId: chip.id,
      mode,
      pointerId: event.pointerId,
      originX: event.clientX,
      trackWidth,
      startWeek: chip.startWeek,
      endWeek: chip.endWeek,
    };
  }

  @HostListener('document:pointermove', ['$event'])
  onChipPointerMove(event: PointerEvent): void {
    const interaction = this.activeChipInteraction;

    if (!interaction || event.pointerId !== interaction.pointerId) {
      return;
    }

    event.preventDefault();
    const maxWeek = this.pregnancyTimeline().maxWeek;
    const pixelsToWeeks = scaleLinear().domain([0, interaction.trackWidth]).range([0, maxWeek]);
    const weekDelta = pixelsToWeeks(event.clientX - interaction.originX);
    const minimumDuration = 1;
    let startWeek = interaction.startWeek;
    let endWeek = interaction.endWeek;

    if (interaction.mode === 'move') {
      const duration = interaction.endWeek - interaction.startWeek;
      startWeek = this.clamp(interaction.startWeek + weekDelta, 0, maxWeek - duration);
      endWeek = startWeek + duration;
    } else if (interaction.mode === 'resize-start') {
      startWeek = this.clamp(
        interaction.startWeek + weekDelta,
        0,
        interaction.endWeek - minimumDuration,
      );
    } else {
      endWeek = this.clamp(
        interaction.endWeek + weekDelta,
        interaction.startWeek + minimumDuration,
        maxWeek,
      );
    }

    this.updateTimelineChip(
      interaction.groupId,
      interaction.rowId,
      interaction.chipId,
      this.roundToQuarterWeek(startWeek),
      this.roundToQuarterWeek(endWeek),
    );
  }

  @HostListener('document:pointerup', ['$event'])
  @HostListener('document:pointercancel', ['$event'])
  endChipInteraction(event: PointerEvent): void {
    if (this.activeChipInteraction?.pointerId === event.pointerId) {
      this.activeChipInteraction = null;
    }
  }

  moveChipWithKeyboard(
    event: KeyboardEvent,
    groupId: string,
    rowId: string,
    chip: TimelineChip,
  ): void {
    if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') {
      return;
    }

    event.preventDefault();
    this.rememberTimeline();
    const maxWeek = this.pregnancyTimeline().maxWeek;
    const duration = chip.endWeek - chip.startWeek;
    const direction = event.key === 'ArrowLeft' ? -0.5 : 0.5;
    const startWeek = this.clamp(chip.startWeek + direction, 0, maxWeek - duration);
    this.updateTimelineChip(groupId, rowId, chip.id, startWeek, startWeek + duration);
  }

  undoTimelineChange(): void {
    const previousTimeline = this.timelineHistory.pop();

    if (previousTimeline) {
      this.pregnancyTimeline.set(previousTimeline);
    }
  }

  canUndoTimeline(): boolean {
    return this.timelineHistory.length > 0;
  }

  toggleSummary(): void {
    if (this.summarySticky()) {
      this.summaryManuallyCollapsed = false;

      if (window.scrollY <= 1) {
        this.summarySticky.set(false);
        this.summaryExpanded.set(true);
        return;
      }

      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
      return;
    }

    this.summaryExpanded.update((expanded) => {
      this.summaryManuallyCollapsed = expanded;
      return !expanded;
    });
  }

  @HostListener('window:scroll')
  onWindowScroll(): void {
    const summary = this.patientSummary?.nativeElement;

    if (!summary) {
      return;
    }

    const headerOffset = this.headerOffset();
    const summaryBounds = summary.getBoundingClientRect();

    if (!this.summarySticky() && summaryBounds.top <= headerOffset) {
      this.updateStickyBounds();

      if (this.summaryExpanded()) {
        this.summaryExpanded.set(false);
      }

      this.summarySticky.set(true);
      return;
    }

    if (this.summarySticky() && window.scrollY <= 1) {
      this.summarySticky.set(false);

      if (!this.summaryManuallyCollapsed) {
        this.summaryExpanded.set(true);
      }
    }
  }

  @HostListener('window:resize')
  onWindowResize(): void {
    if (this.summarySticky()) {
      this.updateStickyBounds();
    }
  }

  private updateStickyBounds(): void {
    const summary = this.patientSummary?.nativeElement;
    const dashboard = summary?.parentElement;

    if (dashboard) {
      const dashboardBounds = dashboard.getBoundingClientRect();
      this.stickyLeft.set(dashboardBounds.left);
      this.stickyWidth.set(dashboardBounds.width);
    }
  }

  private headerOffset(): number {
    return window.innerWidth < 992 ? 64 : 78;
  }

  private updateTimelineChip(
    groupId: string,
    rowId: string,
    chipId: string,
    startWeek: number,
    endWeek: number,
  ): void {
    this.pregnancyTimeline.update((timeline) => ({
      ...timeline,
      groups: timeline.groups.map((group) =>
        group.id === groupId
          ? {
              ...group,
              rows: group.rows.map((row) =>
                row.id === rowId
                  ? {
                      ...row,
                      chips: row.chips.map((chip) =>
                        chip.id === chipId ? { ...chip, startWeek, endWeek } : chip,
                      ),
                    }
                  : row,
              ),
            }
          : group,
      ),
    }));
  }

  private rememberTimeline(): void {
    this.timelineHistory.push(this.cloneTimeline(this.pregnancyTimeline()));

    if (this.timelineHistory.length > 20) {
      this.timelineHistory.shift();
    }
  }

  private cloneTimeline(timeline: PregnancyTimeline): PregnancyTimeline {
    return {
      ...timeline,
      groups: timeline.groups.map((group) => ({
        ...group,
        rows: group.rows.map((row) => ({
          ...row,
          chips: row.chips.map((chip) => ({ ...chip })),
        })),
      })),
    };
  }

  private clamp(value: number, minimum: number, maximum: number): number {
    return Math.min(Math.max(value, minimum), maximum);
  }

  private roundToQuarterWeek(value: number): number {
    return Math.round(value * 4) / 4;
  }

  private formatWeek(week: number): string {
    return Number.isInteger(week) ? `${week}w` : `${week.toFixed(2).replace(/0$/, '')}w`;
  }
}
