import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  ViewChild,
  computed,
  signal,
} from '@angular/core';
import { scaleLinear } from 'd3-scale';

interface VitalChartSeries {
  color: string;
  pointColor?: string;
  values: number[];
}

interface VitalChartThreshold {
  color: string;
  label: string;
  value: number;
}

interface VitalChart {
  label?: string;
  max: number;
  min: number;
  series: VitalChartSeries[];
  thresholds?: VitalChartThreshold[];
  xLabels: string[];
  yTicks: number[];
}

interface VitalHistoryItem {
  detail: string;
  week: string;
}

interface VitalTooltip {
  charts?: VitalChart[];
  history?: VitalHistoryItem[];
  id: string;
  subtitle?: string;
  title: string;
  width: number;
}

interface VitalTooltipPosition {
  left: number;
  top: number;
  width: number;
}

interface VitalCountValues {
  bmi: number;
  diastolic: number;
  fundalHeight: number;
  heartRate: number;
  systolic: number;
  currentWeight: number;
  weightGain: number;
}

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

const VITAL_TOOLTIPS: VitalTooltip[] = [
  {
    id: 'blood-pressure',
    title: 'Blood Pressure Trend',
    width: 600,
    charts: [
      {
        label: 'Systolic Blood Pressure (Abnormal: ≥140 mmHg)',
        min: 100,
        max: 160,
        yTicks: [100, 115, 130, 145, 160],
        xLabels: ['8w', '12w', '16w', '20w', '24w', '26w', '28w'],
        thresholds: [{ value: 140, label: 'Abnormal', color: '#ef4444' }],
        series: [{ values: [118, 122, 128, 138, 142, 145, 148], color: '#8b35ff' }],
      },
      {
        label: 'Diastolic Blood Pressure (Abnormal: ≥90 mmHg)',
        min: 60,
        max: 100,
        yTicks: [60, 70, 80, 90, 100],
        xLabels: ['8w', '12w', '16w', '20w', '24w', '26w', '28w'],
        thresholds: [{ value: 90, label: 'Abnormal', color: '#ef4444' }],
        series: [{ values: [76, 78, 82, 86, 88, 90, 92], color: '#ec3b96' }],
      },
    ],
  },
  {
    id: 'heart-rate',
    title: 'Fetal Heart Rate Trend',
    subtitle: 'Normal Range: 110-160 bpm',
    width: 500,
    charts: [
      {
        min: 100,
        max: 170,
        yTicks: [100, 120, 140, 170],
        xLabels: ['12w', '16w', '20w', '24w', '26w', '28w'],
        thresholds: [
          { value: 110, label: '', color: '#10b981' },
          { value: 160, label: '', color: '#10b981' },
        ],
        series: [{ values: [166, 159, 153, 149, 146, 142], color: '#3b82f6' }],
      },
    ],
  },
  {
    id: 'fundal-height',
    title: 'Fundal Height Trend',
    subtitle: 'Expected: Fundal height (cm) ≈ Gestational age (weeks)',
    width: 500,
    charts: [
      {
        min: 10,
        max: 35,
        yTicks: [10, 17, 24, 35],
        xLabels: ['16w', '20w', '24w', '26w', '28w'],
        series: [{ values: [16, 20, 24, 26, 28], color: '#f59e0b' }],
      },
    ],
  },
  {
    id: 'cervical-exam',
    title: 'Cervical Exam History',
    width: 400,
    history: [
      { week: '36w', detail: 'Closed, thick, -3 station' },
      { week: '37w', detail: 'Closed, thick, -3 station' },
      { week: '38w', detail: '1cm, 50% effaced, -2 station' },
      { week: '39w', detail: '2cm, 70% effaced, -1 station' },
      { week: '40w', detail: '3cm, 80% effaced, 0 station' },
    ],
  },
  {
    id: 'bmi',
    title: 'BMI Trend',
    subtitle: 'Tracking BMI progression throughout pregnancy',
    width: 500,
    charts: [
      {
        min: 20,
        max: 30,
        yTicks: [20, 23, 26, 30],
        xLabels: ['8w', '12w', '16w', '20w', '24w', '26w', '28w'],
        series: [{ values: [23.2, 23.5, 24.1, 24.8, 25.6, 26.3, 26.8], color: '#6366f1' }],
      },
    ],
  },
  {
    id: 'current-weight',
    title: 'Weight Trend',
    subtitle: 'Maternal weight progression throughout pregnancy',
    width: 500,
    charts: [
      {
        min: 140,
        max: 170,
        yTicks: [140, 148, 156, 170],
        xLabels: ['8w', '12w', '16w', '20w', '24w', '26w', '28w'],
        series: [{ values: [143, 145, 148, 153, 158, 162, 165], color: '#10b981' }],
      },
    ],
  },
  {
    id: 'weight-gain',
    title: 'Weight Gain Trend',
    subtitle: 'Recommended gain for Normal weight: 25-35 lbs (Pre-pregnancy BMI: 23.2)',
    width: 500,
    charts: [
      {
        min: 0,
        max: 40,
        yTicks: [0, 10, 20, 30, 40],
        xLabels: ['8w', '12w', '16w', '20w', '24w', '26w', '28w'],
        thresholds: [
          { value: 25, label: 'Min', color: '#10b981' },
          { value: 35, label: 'Max', color: '#10b981' },
        ],
        series: [
          {
            values: [0, 2, 5, 10, 15, 19, 22],
            color: '#2563eb',
            pointColor: '#f59e0b',
          },
        ],
      },
    ],
  },
];

const VITAL_COUNT_TARGETS: VitalCountValues = {
  bmi: 26.3,
  currentWeight: 165,
  diastolic: 92,
  fundalHeight: 28,
  heartRate: 142,
  systolic: 148,
  weightGain: 22,
};

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
export class PatientDashboard implements AfterViewInit, OnDestroy {
  @ViewChild('patientSummary')
  private patientSummary?: ElementRef<HTMLElement>;

  @ViewChild('vitalSigns')
  private vitalSigns?: ElementRef<HTMLElement>;

  private summaryManuallyCollapsed = false;

  readonly summaryExpanded = signal(true);
  readonly summarySticky = signal(false);
  readonly visitSummaryExpanded = signal(true);
  readonly progressNoteExpanded = signal(true);
  readonly activeVitalTooltip = signal<VitalTooltip | null>(null);
  readonly activeVitalTooltipItems = computed(() => {
    const tooltip = this.activeVitalTooltip();
    return tooltip ? [tooltip] : [];
  });
  readonly vitalTooltipPosition = signal<VitalTooltipPosition>({ left: 0, top: 0, width: 500 });
  readonly vitalCounts = signal<VitalCountValues>({
    bmi: 0,
    currentWeight: 0,
    diastolic: 0,
    fundalHeight: 0,
    heartRate: 0,
    systolic: 0,
    weightGain: 0,
  });
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
  private vitalCountAnimationFrame: number | null = null;
  private vitalTooltipHideTimer: number | null = null;

  ngAfterViewInit(): void {
    this.startVitalCountAnimation();
  }

  ngOnDestroy(): void {
    if (this.vitalCountAnimationFrame !== null) {
      window.cancelAnimationFrame(this.vitalCountAnimationFrame);
    }

    this.cancelVitalTooltipHide();
  }

  toggleVisitSummary(): void {
    this.visitSummaryExpanded.update((expanded) => !expanded);
  }

  toggleProgressNote(): void {
    this.progressNoteExpanded.update((expanded) => !expanded);
  }

  showVitalTooltip(tooltipId: string, event: Event): void {
    this.cancelVitalTooltipHide();

    const tooltip = VITAL_TOOLTIPS.find((item) => item.id === tooltipId);
    const section = this.vitalSigns?.nativeElement;
    const card = event.currentTarget as HTMLElement | null;

    if (!tooltip || !section || !card) {
      return;
    }

    const sectionBounds = section.getBoundingClientRect();
    const cardBounds = card.getBoundingClientRect();
    const availableWidth = Math.max(sectionBounds.width - 24, 280);
    const width = Math.min(tooltip.width, availableWidth);
    const maximumLeft = Math.max(12, sectionBounds.width - width - 12);
    const left = this.clamp(cardBounds.left - sectionBounds.left, 12, maximumLeft);

    this.vitalTooltipPosition.set({
      left,
      top: cardBounds.bottom - sectionBounds.top + 6,
      width,
    });
    this.activeVitalTooltip.set(tooltip);
  }

  hideVitalTooltip(): void {
    this.cancelVitalTooltipHide();
    this.activeVitalTooltip.set(null);
  }

  scheduleVitalTooltipHide(): void {
    this.cancelVitalTooltipHide();
    this.vitalTooltipHideTimer = window.setTimeout(() => {
      this.activeVitalTooltip.set(null);
      this.vitalTooltipHideTimer = null;
    }, 180);
  }

  keepVitalTooltipOpen(): void {
    this.cancelVitalTooltipHide();
  }

  vitalChartX(index: number, pointCount: number): number {
    return scaleLinear()
      .domain([0, Math.max(pointCount - 1, 1)])
      .range([42, 402])(index);
  }

  vitalChartY(value: number, chart: VitalChart): number {
    return scaleLinear().domain([chart.min, chart.max]).range([140, 10]).clamp(true)(value);
  }

  vitalChartPath(chart: VitalChart, series: VitalChartSeries): string {
    return series.values
      .map((value, index) => {
        const command = index === 0 ? 'M' : 'L';
        return `${command}${this.vitalChartX(index, series.values.length)},${this.vitalChartY(value, chart)}`;
      })
      .join(' ');
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

    if (!this.summarySticky() && window.scrollY > 8 && summaryBounds.top <= headerOffset) {
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

  private headerOffset(): number {
    return window.innerWidth < 992 ? 64 : 78;
  }

  private startVitalCountAnimation(): void {
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
      this.vitalCounts.set(VITAL_COUNT_TARGETS);
      return;
    }

    const duration = 1100;
    let startedAt: number | null = null;

    const animate = (timestamp: number): void => {
      startedAt ??= timestamp;
      const progress = Math.min((timestamp - startedAt) / duration, 1);
      const easedProgress = 1 - Math.pow(1 - progress, 3);

      this.vitalCounts.set({
        bmi: Math.round(VITAL_COUNT_TARGETS.bmi * easedProgress * 10) / 10,
        currentWeight: Math.round(VITAL_COUNT_TARGETS.currentWeight * easedProgress),
        diastolic: Math.round(VITAL_COUNT_TARGETS.diastolic * easedProgress),
        fundalHeight: Math.round(VITAL_COUNT_TARGETS.fundalHeight * easedProgress),
        heartRate: Math.round(VITAL_COUNT_TARGETS.heartRate * easedProgress),
        systolic: Math.round(VITAL_COUNT_TARGETS.systolic * easedProgress),
        weightGain: Math.round(VITAL_COUNT_TARGETS.weightGain * easedProgress),
      });

      if (progress < 1) {
        this.vitalCountAnimationFrame = window.requestAnimationFrame(animate);
      } else {
        this.vitalCountAnimationFrame = null;
      }
    };

    this.vitalCountAnimationFrame = window.requestAnimationFrame(animate);
  }

  private cancelVitalTooltipHide(): void {
    if (this.vitalTooltipHideTimer !== null) {
      window.clearTimeout(this.vitalTooltipHideTimer);
      this.vitalTooltipHideTimer = null;
    }
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
