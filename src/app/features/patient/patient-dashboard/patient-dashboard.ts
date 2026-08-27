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
import { MatDialog } from '@angular/material/dialog';
import { scaleLinear } from 'd3-scale';

import { AddProblemDialog, AddProblemDialogResult } from './add-problem-dialog/add-problem-dialog';
import {
  TimelineItemDialog,
  TimelineItemDialogResult,
} from './timeline-item-dialog/timeline-item-dialog';

interface VitalChartSeries {
  color: string;
  label?: string;
  pointColor?: string;
  pointColors?: string[];
  values: number[];
}

interface VitalChartThreshold {
  color: string;
  label: string;
  value: number;
}

interface VitalChart {
  compact?: boolean;
  label?: string;
  max: number;
  min: number;
  normalRange?: {
    color?: string;
    max: number;
    min: number;
  };
  series: VitalChartSeries[];
  showVerticalGrid?: boolean;
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
  footer?: {
    color: string;
    message: string;
    status?: string;
  };
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

interface TooltipGlassFocusRect {
  bottom: number;
  left: number;
  right: number;
  top: number;
}

interface ResultTableRow {
  alert?: 'low';
  name: string;
  range: string;
  value: string;
}

interface ResultTooltip {
  chart?: VitalChart;
  closeable?: boolean;
  footer: ReadonlyArray<{ color: string; message: string }>;
  id: string;
  rows?: ResultTableRow[];
  subtitle?: string;
  title: string;
  width: number;
}

interface VitalChartHover {
  chartIndex: number;
  pointIndex: number;
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
type TimelineStatusTooltipIcon = 'calendar' | 'clock';

interface TimelineStatusTooltipScheduleRow {
  icon: TimelineStatusTooltipIcon;
  label: string;
  value: string;
}

interface TimelineStatusTooltipTest {
  label: string;
  result?: string;
  removed?: boolean;
  showActions?: boolean;
}

interface TimelineStatusTooltip {
  badgeLabel: string;
  notes?: string;
  notePlaceholder?: string;
  otherPlaceholder?: string;
  schedule: TimelineStatusTooltipScheduleRow[];
  showBulkActions?: boolean;
  status: TimelineStatus;
  subtitle: string;
  tests?: TimelineStatusTooltipTest[];
  title: string;
}

interface ActiveTimelineStatusTooltip {
  chipId: string;
  tooltip: TimelineStatusTooltip;
}

interface TimelineStatusTooltipPosition extends VitalTooltipPosition {
  notchLeft: number;
  placement: 'above' | 'below';
}

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

type TimelineConditionTagTone = 'blue' | 'pink' | 'purple' | 'teal';

interface TimelineConditionTag {
  label: string;
  tone: TimelineConditionTagTone;
}

interface TimelineConditionDetails {
  description: string;
  tags: TimelineConditionTag[];
}

interface TimelineGroup {
  condition: TimelineConditionDetails;
  id: string;
  label: string;
  resolved?: boolean;
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
    width: 520,
    // footer: {
    //   color: '#ff595f',
    //   message: 'Elevated BP readings: 33%',
    // },
    charts: [
      {
        compact: true,
        label: 'Systolic Blood Pressure (Abnormal: ≥140 mmHg)',
        min: 100,
        max: 160,
        yTicks: [100, 120, 140, 160],
        xLabels: ['8w', '12w', '16w', '20w', '24w', '26w', '28w'],
        normalRange: { min: 100, max: 140 },
        thresholds: [{ value: 140, label: 'Abn', color: '#ff595f' }],
        series: [{ values: [114, 126, 128, 124, 136, 140, 147], color: '#5b65ed' }],
      },
      {
        compact: true,
        label: 'Diastolic Blood Pressure (Abnormal: ≥90 mmHg)',
        min: 60,
        max: 100,
        yTicks: [60, 70, 80, 90, 100],
        xLabels: ['8w', '12w', '16w', '20w', '24w', '26w', '28w'],
        normalRange: { min: 60, max: 90 },
        thresholds: [{ value: 90, label: 'Abn', color: '#ff595f' }],
        series: [{ values: [71, 77, 79, 81, 84, 87, 92], color: '#5b65ed' }],
      },
    ],
  },
  {
    id: 'heart-rate',
    title: 'Fetal Heart Rate Trend',
    subtitle: 'Normal Range: 110-160 bpm',
    width: 520,
    // footer: {
    //   color: '#0d9488',
    //   message: 'Fetal heart rate is stable and within normal limits',
    // },
    charts: [
      {
        min: 100,
        max: 170,
        yTicks: [100, 120, 140, 170],
        xLabels: ['12w', '16w', '20w', '24w', '26w', '28w'],
        thresholds: [
          { value: 110, label: '', color: '#0d9488' },
          { value: 160, label: '', color: '#0d9488' },
        ],
        normalRange: { min: 110, max: 160 },
        series: [{ values: [166, 156, 149, 143, 140, 136], color: '#3b82f6' }],
      },
    ],
  },
  {
    id: 'fundal-height',
    title: 'Fundal Height Trend',
    subtitle: 'Expected: Fundal height (cm) ≈ Gestational age (weeks)',
    width: 520,
    // footer: {
    //   color: '#10b981',
    //   message: 'Consistent with gestational age (98th percentile)',
    //   status: 'Normal Growth',
    // },
    charts: [
      {
        min: 10,
        max: 35,
        yTicks: [10, 17, 24, 35],
        xLabels: ['16w', '20w', '24w', '26w', '28w'],
        normalRange: { min: 16, max: 26, color: 'rgba(16, 185, 129, 0.1)' },
        series: [{ values: [17, 20, 24, 26, 29], color: '#f59e0b' }],
      },
    ],
  },
  {
    id: 'cervical-exam',
    title: 'Cervical Exam History',
    width: 520,
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
    width: 520,
    charts: [
      {
        min: 20,
        max: 30,
        yTicks: [20, 23, 26, 30],
        xLabels: ['8w', '12w', '16w', '20w', '24w', '26w', '28w'],
        showVerticalGrid: true,
        series: [{ values: [24.4, 24.8, 25, 25.7, 26.1, 27, 27.6], color: '#6366f1' }],
      },
    ],
  },
  {
    id: 'current-weight',
    title: 'Weight Trend',
    subtitle: 'Maternal weight progression throughout pregnancy',
    width: 528,
    charts: [
      {
        min: 140,
        max: 170,
        yTicks: [140, 148, 156, 170],
        xLabels: ['8w', '12w', '16w', '20w', '24w', '26w', '28w'],
        showVerticalGrid: true,
        series: [{ values: [141, 143, 146, 150, 155, 160, 163], color: '#0d9488' }],
      },
    ],
  },
  {
    id: 'weight-gain',
    title: 'Weight Gain Trend',
    subtitle: 'Recommended gain for Normal weight: 25-35 lbs (Pre-pregnancy BMI: 23.2)',
    width: 528,
    charts: [
      {
        min: 0,
        max: 40,
        yTicks: [0, 10, 20, 30, 40],
        xLabels: ['8w', '12w', '16w', '20w', '24w', '26w', '28w'],
        thresholds: [
          { value: 25, label: '', color: '#10b981' },
          { value: 35, label: '', color: '#10b981' },
        ],
        showVerticalGrid: true,
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

const RESULT_TOOLTIPS: ResultTooltip[] = [
  {
    id: 'cbc',
    title: 'Complete Blood Count (CBC)',
    width: 420,
    closeable: true,
    footer: [],
    rows: [
      { name: 'WBC', value: '9.2 K/uL', range: '(4.0 - 11.0)' },
      { name: 'Hemoglobin', value: '11.2 g/dL', range: '(11.5 - 15.5)', alert: 'low' },
      { name: 'Hematocrit', value: '34.0 %', range: '(34.0 - 45.0)' },
      { name: 'Platelets', value: '245 K/uL', range: '(150 - 400)' },
      { name: 'RBC', value: '3.8 M/uL', range: '(3.8 - 5.2)' },
      { name: 'MCV', value: '88.0 fL', range: '(80.0 - 100.0)' },
      { name: 'MCH', value: '29.0 pg', range: '(27.0 - 33.0)' },
      { name: 'MCHC', value: '33.0 g/dL', range: '(32.0 - 36.0)' },
      { name: 'RDW', value: '13.2 %', range: '(11.5 - 14.5)' },
      { name: 'Neutrophils', value: '65.0 %', range: '(40.0 - 70.0)' },
      { name: 'Lymphocytes', value: '28.0 %', range: '(20.0 - 40.0)' },
      { name: 'Monocytes', value: '5.0 %', range: '(2.0 - 8.0)' },
      { name: 'Eosinophils', value: '2.0 %', range: '(1.0 - 4.0)' },
      { name: 'Basophils', value: '0.5 %', range: '(0.0 - 1.0)' },
    ],
  },
  {
    id: 'home-bp',
    title: 'Blood Pressure Trend',
    subtitle: 'Target: <140/90 mmHg',
    width: 520,
    footer: [{ color: '#f06a6a', message: 'Elevated BP readings: 33%' }],
    chart: {
      compact: true,
      min: 70,
      max: 160,
      yTicks: [70, 95, 120, 160],
      xLabels: ['3/22 PM', '3/23 PM', '3/24 PM', '3/25 PM', '3/26 PM', '3/27 PM'],
      thresholds: [
        { value: 140, label: '', color: '#ff595f' },
        { value: 90, label: '', color: '#f58cb4' },
      ],
      series: [
        { label: 'Systolic', values: [128, 138, 128, 148, 135, 142], color: '#e9298a' },
        { label: 'Diastolic', values: [82, 92, 82, 86, 86, 82], color: '#f58cb4' },
      ],
    },
  },
  {
    id: 'blood-glucose',
    title: 'Blood Glucose Trend',
    subtitle: 'Target: Fasting <95 mg/dL, Post-prandial <140 mg/dL',
    width: 520,
    footer: [
      { color: '#f06a6a', message: 'Elevated fasting readings: 50%' },
      { color: '#0d9488', message: 'Elevated post-prandial readings: 0%' },
    ],
    chart: {
      compact: true,
      min: 80,
      max: 150,
      yTicks: [80, 100, 120, 140, 150],
      xLabels: ['3/22', '3/23', '3/24', '3/25', '3/26', '3/27'],
      thresholds: [
        { value: 140, label: '', color: '#ff595f' },
        { value: 95, label: '', color: '#d99b00' },
      ],
      series: [
        {
          label: 'Glucose Level',
          values: [125, 138, 92, 132, 104, 142],
          color: '#1e90ff',
          pointColors: ['#1e90ff', '#1e90ff', '#0d9488', '#1e90ff', '#0d9488', '#1e90ff'],
        },
      ],
    },
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

const TIMELINE_CONDITION_DETAILS: Record<string, TimelineConditionDetails> = {
  'routine-prenatal-care': {
    description: 'Encounter for supervision of other normal pregnancy third trimester.',
    tags: [
      { label: 'Z34.83', tone: 'purple' },
      { label: 'T3', tone: 'pink' },
      { label: 'Multigravida', tone: 'blue' },
      { label: 'Singleton', tone: 'teal' },
    ],
  },
  'gdm-monitoring': {
    description: 'Gestational diabetes mellitus in pregnancy, diet controlled.',
    tags: [
      { label: 'O24.410', tone: 'purple' },
      { label: 'T3', tone: 'pink' },
      { label: 'GDM', tone: 'blue' },
      { label: 'Diet controlled', tone: 'teal' },
    ],
  },
  'hypertension-monitoring': {
    description: 'Gestational hypertension without significant proteinuria, third trimester.',
    tags: [
      { label: 'O13.3', tone: 'purple' },
      { label: 'T3', tone: 'pink' },
      { label: 'High risk', tone: 'blue' },
      { label: 'Monitoring', tone: 'teal' },
    ],
  },
  'medication-management': {
    description: 'Encounter for medication reconciliation and long-term drug therapy review.',
    tags: [
      { label: 'Z79.899', tone: 'purple' },
      { label: 'Active', tone: 'pink' },
      { label: 'Maternal', tone: 'blue' },
      { label: 'Medication review', tone: 'teal' },
    ],
  },
  'fetal-surveillance': {
    description: 'Maternal care for fetal surveillance during the third trimester.',
    tags: [
      { label: 'O36.8390', tone: 'purple' },
      { label: 'T3', tone: 'pink' },
      { label: 'Singleton', tone: 'blue' },
      { label: 'Fetal monitoring', tone: 'teal' },
    ],
  },
  'nutrition-lifestyle': {
    description: 'Dietary counseling and surveillance during pregnancy.',
    tags: [
      { label: 'Z71.3', tone: 'purple' },
      { label: 'Active', tone: 'pink' },
      { label: 'Nutrition', tone: 'blue' },
      { label: 'Lifestyle', tone: 'teal' },
    ],
  },
  'laboratory-follow-up': {
    description: 'Encounter for antenatal screening and follow-up laboratory testing.',
    tags: [
      { label: 'Z36.9', tone: 'purple' },
      { label: 'T3', tone: 'pink' },
      { label: 'Screening', tone: 'blue' },
      { label: 'Lab follow-up', tone: 'teal' },
    ],
  },
  'delivery-planning': {
    description: 'Encounter for supervision and delivery readiness planning.',
    tags: [
      { label: 'Z3A.28', tone: 'purple' },
      { label: 'T3', tone: 'pink' },
      { label: 'Singleton', tone: 'blue' },
      { label: 'Delivery plan', tone: 'teal' },
    ],
  },
  'postpartum-planning': {
    description: 'Encounter for postpartum care planning and maternal follow-up.',
    tags: [
      { label: 'Z39.2', tone: 'purple' },
      { label: 'Future', tone: 'pink' },
      { label: 'Maternal', tone: 'blue' },
      { label: 'Postpartum', tone: 'teal' },
    ],
  },
  'patient-education': {
    description: 'Encounter for counseling and pregnancy-related patient education.',
    tags: [
      { label: 'Z71.89', tone: 'purple' },
      { label: 'Active', tone: 'pink' },
      { label: 'Prenatal', tone: 'blue' },
      { label: 'Education', tone: 'teal' },
    ],
  },
};

const ADDITIONAL_TIMELINE_GROUPS: TimelineGroup[] = [
  ['hypertension-monitoring', 'Hypertension Monitoring', 'Blood pressure review'],
  ['medication-management', 'Medication Management', 'Medication reconciliation'],
  ['fetal-surveillance', 'Fetal Surveillance', 'Non-stress testing'],
  ['nutrition-lifestyle', 'Nutrition & Lifestyle', 'Nutrition counseling'],
  ['laboratory-follow-up', 'Laboratory Follow-up', 'Repeat laboratory panel'],
  ['delivery-planning', 'Delivery Planning', 'Delivery readiness review'],
  ['postpartum-planning', 'Postpartum Planning', 'Postpartum care plan'],
  ['patient-education', 'Patient Education', 'Pregnancy education'],
].map(([id, label, rowLabel], index) => {
  const statuses: TimelineStatus[] = [
    'completed',
    'not-reviewed',
    'ordered',
    'late',
    'abnormal',
    'future',
  ];
  const startWeek = 8 + ((index * 4) % 25);

  return {
    condition: TIMELINE_CONDITION_DETAILS[id],
    id,
    label,
    rows: [
      {
        id: `${id}-task`,
        label: rowLabel,
        chips: [
          {
            id: `${id}-chip`,
            label: rowLabel,
            status: statuses[index % statuses.length],
            startWeek,
            endWeek: Math.min(startWeek + 5, 40),
          },
        ],
      },
    ],
  };
});

const TIMELINE_STATUS_TOOLTIPS: Record<TimelineStatus, TimelineStatusTooltip> = {
  ordered: {
    badgeLabel: 'Ordered',
    notes:
      'Patient scheduled but did not complete collection. Rescheduled for next week. Emphasized importance of test.',
    notePlaceholder: 'Add notes...',
    schedule: [{ icon: 'calendar', label: 'Scheduled:', value: 'Week 24-26' }],
    status: 'ordered',
    subtitle: 'Gestational Hypertension',
    tests: [{ label: '24-hour Urine Protein', showActions: true }],
    title: '24-hour urine protein (Baseline)',
  },
  abnormal: {
    badgeLabel: 'Abnormal Finding',
    notes:
      'Patient referred for 3-hour glucose tolerance test. Advised on dietary modifications pending confirmatory testing.',
    schedule: [
      { icon: 'calendar', label: 'Scheduled:', value: 'Week 24-28' },
      { icon: 'clock', label: 'Completed:', value: 'Week 26' },
      { icon: 'calendar', label: 'Date:', value: '2026-01-15' },
    ],
    status: 'abnormal',
    subtitle: 'Insulin Dependent Gestational Diabetes Mellitus',
    tests: [{ label: '1-hour Glucose', result: '185 mg/dL (abnormal, >140)' }],
    title: '1-hour glucose screening (Baseline)',
  },
  late: {
    badgeLabel: 'Late',
    notes:
      'Carrier screening for common genetic conditions. Discuss results and partner testing if indicated.',
    otherPlaceholder: 'Enter test name...',
    schedule: [
      { icon: 'calendar', label: 'Scheduled:', value: 'Week 0-13' },
      { icon: 'calendar', label: 'Date:', value: '2025-10-15' },
    ],
    showBulkActions: true,
    status: 'late',
    subtitle: 'Routine Prenatal Care',
    tests: [
      { label: 'Hemoglobin Electro...', showActions: true },
      { label: 'Cystic Fibrosis', showActions: true },
      { label: 'Spinal Muscular Atr...', showActions: true },
      { label: 'Fragile X', showActions: true },
    ],
    title: 'Genetic screening (Baseline)',
  },
  completed: {
    badgeLabel: 'Completed/Reviewed',
    notes:
      'Combined NT measurement and serum markers indicate low risk. Detailed results reviewed with patient.',
    schedule: [
      { icon: 'calendar', label: 'Scheduled:', value: 'Week 11-14' },
      { icon: 'clock', label: 'Completed:', value: 'Week 12' },
      { icon: 'calendar', label: 'Date:', value: '2025-09-05' },
    ],
    status: 'completed',
    subtitle: 'Routine Prenatal Care',
    title: 'Aneuploidy screening',
  },
  'not-reviewed': {
    badgeLabel: 'Completed/Not Reviewed',
    notes:
      'Combined NT measurement and serum markers indicate low risk. Detailed results are pending clinical review.',
    schedule: [
      { icon: 'calendar', label: 'Scheduled:', value: 'Week 11-14' },
      { icon: 'clock', label: 'Completed:', value: 'Week 12' },
      { icon: 'calendar', label: 'Date:', value: '2025-09-05' },
    ],
    status: 'not-reviewed',
    subtitle: 'Routine Prenatal Care',
    title: 'Aneuploidy screening',
  },
  future: {
    badgeLabel: 'Future',
    schedule: [{ icon: 'calendar', label: 'Scheduled:', value: 'Week 28-32' }],
    showBulkActions: true,
    status: 'future',
    subtitle: 'Routine Prenatal Care',
    tests: [
      { label: 'CBC', showActions: true },
      { label: 'Antibody Screen (Repeat)', showActions: true },
      { label: '1-hour Glucose (if not done)', removed: true },
    ],
    title: 'Labs (Repeat)',
  },
};

const INITIAL_TIMELINE: PregnancyTimeline = {
  currentWeek: 28,
  maxWeek: 40,
  groups: [
    {
      condition: TIMELINE_CONDITION_DETAILS['routine-prenatal-care'],
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
      condition: TIMELINE_CONDITION_DETAILS['gdm-monitoring'],
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
    ...ADDITIONAL_TIMELINE_GROUPS,
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
  readonly activeResultTooltip = signal<ResultTooltip | null>(null);
  readonly activeResultTooltipItems = computed(() => {
    const tooltip = this.activeResultTooltip();
    return tooltip ? [tooltip] : [];
  });
  readonly resultTooltipPosition = signal<VitalTooltipPosition>({ left: 0, top: 0, width: 420 });
  readonly resultTooltipMaxHeight = signal(600);
  readonly riskAssessmentOpen = signal(false);
  readonly riskAssessmentPosition = signal<VitalTooltipPosition>({ left: 0, top: 0, width: 600 });
  readonly riskAssessmentMaxHeight = signal(690);
  readonly deliveryWindowTooltipOpen = signal(false);
  readonly deliveryWindowTooltipPosition = signal<VitalTooltipPosition>({
    left: 0,
    top: 0,
    width: 300,
  });
  readonly activeTimelineGroupTooltip = signal<TimelineGroup | null>(null);
  readonly timelineGroupTooltipPosition = signal<VitalTooltipPosition>({
    left: 0,
    top: 0,
    width: 350,
  });
  readonly timelineGroupTooltipMaxHeight = signal(320);
  readonly activeTimelineStatusTooltip = signal<ActiveTimelineStatusTooltip | null>(null);
  readonly timelineStatusTooltipPosition = signal<TimelineStatusTooltipPosition>({
    left: 0,
    notchLeft: 160,
    placement: 'below',
    top: 0,
    width: 320,
  });
  readonly timelineStatusTooltipMaxHeight = signal(560);
  readonly tooltipGlassFocusRect = signal<TooltipGlassFocusRect>({
    bottom: 0,
    left: 0,
    right: 0,
    top: 0,
  });
  readonly tooltipGlassActive = computed(
    () =>
      this.activeVitalTooltip() !== null ||
      this.activeResultTooltip() !== null ||
      this.riskAssessmentOpen() ||
      this.deliveryWindowTooltipOpen() ||
      this.activeTimelineGroupTooltip() !== null,
  );
  readonly highRiskFactors = [
    { label: 'Hypertensive disorder in previous pregnancy', selected: false },
    { label: 'Chronic kidney disease', selected: false },
    { label: 'Autoimmune disease (SLE, APS)', selected: false },
    { label: 'Type 1 or Type 2 diabetes', selected: false },
    { label: 'Chronic hypertension', selected: true },
  ] as const;
  readonly moderateRiskFactors = [
    'First pregnancy (nulliparity)',
    'Obesity (BMI >30 kg/m²)',
    'Family history of pre-eclampsia',
    'Multiple gestation',
    'Maternal age ≥35 years',
  ] as const;
  readonly vitalChartHover = signal<VitalChartHover | null>(null);
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
  readonly expandedTimelineGroupIds = signal<ReadonlySet<string>>(
    new Set(INITIAL_TIMELINE.groups.slice(0, 5).map((group) => group.id)),
  );
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
  private resultTooltipHideTimer: number | null = null;
  private riskAssessmentHideTimer: number | null = null;
  private deliveryWindowTooltipHideTimer: number | null = null;
  private timelineGroupTooltipHideTimer: number | null = null;
  private timelineStatusTooltipHideTimer: number | null = null;
  private timelineItemSequence = 0;
  private timelineProblemSequence = 0;

  constructor(private readonly dialog?: MatDialog) {}

  ngAfterViewInit(): void {
    this.startVitalCountAnimation();
  }

  ngOnDestroy(): void {
    if (this.vitalCountAnimationFrame !== null) {
      window.cancelAnimationFrame(this.vitalCountAnimationFrame);
    }

    this.cancelVitalTooltipHide();
    this.cancelResultTooltipHide();
    this.cancelRiskAssessmentHide();
    this.cancelDeliveryWindowTooltipHide();
    this.cancelTimelineGroupTooltipHide();
    this.cancelTimelineStatusTooltipHide();
  }

  toggleVisitSummary(): void {
    this.visitSummaryExpanded.update((expanded) => !expanded);
  }

  toggleProgressNote(): void {
    this.progressNoteExpanded.update((expanded) => !expanded);
  }

  showVitalTooltip(tooltipId: string, event: Event): void {
    this.cancelVitalTooltipHide();
    this.hideResultTooltip();
    this.hideRiskAssessment();
    this.hideDeliveryWindowTooltip();
    this.hideTimelineGroupTooltip();
    this.vitalChartHover.set(null);

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
    this.setTooltipGlassFocus(cardBounds);
    this.activeVitalTooltip.set(tooltip);
  }

  hideVitalTooltip(): void {
    this.cancelVitalTooltipHide();
    this.vitalChartHover.set(null);
    this.activeVitalTooltip.set(null);
  }

  scheduleVitalTooltipHide(): void {
    this.cancelVitalTooltipHide();
    this.vitalTooltipHideTimer = window.setTimeout(() => {
      this.vitalChartHover.set(null);
      this.activeVitalTooltip.set(null);
      this.vitalTooltipHideTimer = null;
    }, 180);
  }

  keepVitalTooltipOpen(): void {
    this.cancelVitalTooltipHide();
  }

  showResultTooltip(tooltipId: string, event: Event): void {
    this.cancelResultTooltipHide();
    this.hideVitalTooltip();
    this.hideRiskAssessment();
    this.hideDeliveryWindowTooltip();
    this.hideTimelineGroupTooltip();
    const tooltip = RESULT_TOOLTIPS.find((item) => item.id === tooltipId);
    const card = event.currentTarget as HTMLElement | null;

    if (!tooltip || !card) {
      return;
    }

    const cardBounds = card.getBoundingClientRect();
    const width = Math.min(tooltip.width, Math.max(window.innerWidth - 24, 280));
    const maximumLeft = Math.max(12, window.innerWidth - width - 12);
    const top = Math.max(12, cardBounds.top);

    this.resultTooltipPosition.set({
      left: this.clamp(cardBounds.right - width, 12, maximumLeft),
      top,
      width,
    });
    this.resultTooltipMaxHeight.set(Math.max(180, window.innerHeight - top - 12));
    this.setTooltipGlassFocus(cardBounds);
    this.activeResultTooltip.set(tooltip);
  }

  hideResultTooltip(): void {
    this.cancelResultTooltipHide();
    this.activeResultTooltip.set(null);
  }

  scheduleResultTooltipHide(): void {
    this.cancelResultTooltipHide();
    this.resultTooltipHideTimer = window.setTimeout(() => {
      this.activeResultTooltip.set(null);
      this.resultTooltipHideTimer = null;
    }, 180);
  }

  keepResultTooltipOpen(): void {
    this.cancelResultTooltipHide();
  }

  showRiskAssessment(event: Event): void {
    this.cancelRiskAssessmentHide();
    this.hideVitalTooltip();
    this.hideResultTooltip();
    this.hideDeliveryWindowTooltip();
    this.hideTimelineGroupTooltip();
    const trigger = event.currentTarget as HTMLElement | null;

    if (!trigger) {
      return;
    }

    const triggerBounds = trigger.getBoundingClientRect();
    const width = Math.min(600, Math.max(window.innerWidth - 24, 280));
    const maximumLeft = Math.max(12, window.innerWidth - width - 12);
    const top = triggerBounds.bottom + 8;

    this.riskAssessmentPosition.set({
      left: this.clamp(triggerBounds.right - width, 12, maximumLeft),
      top,
      width,
    });
    this.riskAssessmentMaxHeight.set(Math.max(180, window.innerHeight - top - 12));
    this.setTooltipGlassFocus(triggerBounds);
    this.riskAssessmentOpen.set(true);
  }

  hideRiskAssessment(): void {
    this.cancelRiskAssessmentHide();
    this.riskAssessmentOpen.set(false);
  }

  scheduleRiskAssessmentHide(): void {
    this.cancelRiskAssessmentHide();
    this.riskAssessmentHideTimer = window.setTimeout(() => {
      this.riskAssessmentOpen.set(false);
      this.riskAssessmentHideTimer = null;
    }, 180);
  }

  keepRiskAssessmentOpen(): void {
    this.cancelRiskAssessmentHide();
  }

  showDeliveryWindowTooltip(event: Event): void {
    this.cancelDeliveryWindowTooltipHide();
    this.hideVitalTooltip();
    this.hideResultTooltip();
    this.hideRiskAssessment();
    this.hideTimelineGroupTooltip();
    const trigger = event.currentTarget as HTMLElement | null;

    if (!trigger) {
      return;
    }

    const triggerBounds = trigger.getBoundingClientRect();
    const width = Math.min(300, Math.max(window.innerWidth - 24, 280));
    const maximumLeft = Math.max(12, window.innerWidth - width - 12);

    this.deliveryWindowTooltipPosition.set({
      left: this.clamp(triggerBounds.right - width, 12, maximumLeft),
      top: triggerBounds.bottom + 8,
      width,
    });
    this.setTooltipGlassFocus(triggerBounds);
    this.deliveryWindowTooltipOpen.set(true);
  }

  hideDeliveryWindowTooltip(): void {
    this.cancelDeliveryWindowTooltipHide();
    this.deliveryWindowTooltipOpen.set(false);
  }

  scheduleDeliveryWindowTooltipHide(): void {
    this.cancelDeliveryWindowTooltipHide();
    this.deliveryWindowTooltipHideTimer = window.setTimeout(() => {
      this.deliveryWindowTooltipOpen.set(false);
      this.deliveryWindowTooltipHideTimer = null;
    }, 180);
  }

  keepDeliveryWindowTooltipOpen(): void {
    this.cancelDeliveryWindowTooltipHide();
  }

  showTimelineGroupTooltip(group: TimelineGroup, event: Event): void {
    this.cancelTimelineGroupTooltipHide();
    this.hideVitalTooltip();
    this.hideResultTooltip();
    this.hideRiskAssessment();
    this.hideDeliveryWindowTooltip();
    const trigger = event.currentTarget as HTMLElement | null;

    if (!trigger) {
      return;
    }

    const triggerBounds = trigger.getBoundingClientRect();
    const iconBounds = trigger
      .querySelector<HTMLElement>('.problem-timeline__group-icon')
      ?.getBoundingClientRect();
    const width = Math.min(350, Math.max(window.innerWidth - 24, 280));
    const tooltipHeight = Math.min(266.006, Math.max(window.innerHeight - 24, 180));
    const tooltipLeftMargin = 15;
    const maximumLeft = Math.max(12, window.innerWidth - width - 12 - tooltipLeftMargin);
    const spaceBelow = window.innerHeight - triggerBounds.bottom - 12;
    const top =
      spaceBelow >= tooltipHeight + 8
        ? triggerBounds.bottom + 8
        : Math.max(12, triggerBounds.top - tooltipHeight - 8);

    this.timelineGroupTooltipPosition.set({
      left: this.clamp(iconBounds?.left ?? triggerBounds.left, 12, maximumLeft),
      top,
      width,
    });
    this.timelineGroupTooltipMaxHeight.set(tooltipHeight);
    this.setTooltipGlassFocus(triggerBounds);
    this.activeTimelineGroupTooltip.set(group);
  }

  hideTimelineGroupTooltip(): void {
    this.cancelTimelineGroupTooltipHide();
    this.activeTimelineGroupTooltip.set(null);
  }

  scheduleTimelineGroupTooltipHide(): void {
    this.cancelTimelineGroupTooltipHide();
    this.timelineGroupTooltipHideTimer = window.setTimeout(() => {
      this.activeTimelineGroupTooltip.set(null);
      this.timelineGroupTooltipHideTimer = null;
    }, 180);
  }

  keepTimelineGroupTooltipOpen(): void {
    this.cancelTimelineGroupTooltipHide();
  }

  timelineStatusTooltipNoteRows(note: string): number {
    const approximateCharactersPerLine = 38;

    return Math.max(
      2,
      note
        .split('\n')
        .reduce(
          (rows, line) => rows + Math.max(1, Math.ceil(line.length / approximateCharactersPerLine)),
          0,
        ),
    );
  }

  showTimelineStatusTooltip(chip: TimelineChip, event: Event): void {
    this.cancelTimelineStatusTooltipHide();
    this.hideVitalTooltip();
    this.hideResultTooltip();
    this.hideTimelineGroupTooltip();
    const trigger = event.currentTarget as HTMLElement | null;

    if (!trigger) {
      return;
    }

    const tooltip = TIMELINE_STATUS_TOOLTIPS[chip.status];
    const triggerBounds = trigger.getBoundingClientRect();
    const width = Math.min(320, Math.max(260, window.innerWidth - 24));
    const preferredHeight: Record<TimelineStatus, number> = {
      abnormal: 490,
      completed: 380,
      future: 400,
      late: 650,
      'not-reviewed': 380,
      ordered: 440,
    };
    const spaceBelow = window.innerHeight - triggerBounds.bottom - 12;
    const spaceAbove = triggerBounds.top - 12;
    const placement =
      spaceBelow >= Math.min(preferredHeight[chip.status], 300) || spaceBelow >= spaceAbove
        ? 'below'
        : 'above';
    const availableHeight = placement === 'below' ? spaceBelow : spaceAbove;
    const maxHeight = Math.max(
      0,
      Math.min(preferredHeight[chip.status], availableHeight - 10, window.innerHeight - 24),
    );
    const left = this.clamp(
      triggerBounds.left + triggerBounds.width / 2 - width / 2,
      12,
      Math.max(12, window.innerWidth - width - 12),
    );
    const top =
      placement === 'below'
        ? triggerBounds.bottom + 10
        : Math.max(12, triggerBounds.top - maxHeight - 10);

    this.timelineStatusTooltipPosition.set({
      left,
      notchLeft: this.clamp(triggerBounds.left + triggerBounds.width / 2 - left, 18, width - 18),
      placement,
      top,
      width,
    });
    this.timelineStatusTooltipMaxHeight.set(maxHeight);
    this.activeTimelineStatusTooltip.set({ chipId: chip.id, tooltip });
  }

  hideTimelineStatusTooltip(): void {
    this.cancelTimelineStatusTooltipHide();
    this.activeTimelineStatusTooltip.set(null);
  }

  scheduleTimelineStatusTooltipHide(): void {
    this.cancelTimelineStatusTooltipHide();
    this.timelineStatusTooltipHideTimer = window.setTimeout(() => {
      if (this.timelineStatusTooltipHasFocus()) {
        this.timelineStatusTooltipHideTimer = null;
        return;
      }

      this.activeTimelineStatusTooltip.set(null);
      this.timelineStatusTooltipHideTimer = null;
    }, 180);
  }

  keepTimelineStatusTooltipOpen(): void {
    this.cancelTimelineStatusTooltipHide();
  }

  onTimelineStatusTooltipFocusOut(event: FocusEvent): void {
    const tooltip = event.currentTarget as HTMLElement | null;
    const nextTarget = event.relatedTarget as Node | null;

    if (tooltip && nextTarget && tooltip.contains(nextTarget)) {
      return;
    }

    this.scheduleTimelineStatusTooltipHide();
  }

  resolveTimelineProblem(groupId: string): void {
    this.rememberTimeline();
    this.pregnancyTimeline.update((timeline) => ({
      ...timeline,
      groups: timeline.groups.map((group) =>
        group.id === groupId ? { ...group, resolved: true } : group,
      ),
    }));
    this.hideTimelineGroupTooltip();
  }

  deleteTimelineProblem(groupId: string): void {
    this.rememberTimeline();
    this.pregnancyTimeline.update((timeline) => ({
      ...timeline,
      groups: timeline.groups.filter((group) => group.id !== groupId),
    }));
    this.expandedTimelineGroupIds.update((expandedIds) => {
      const nextExpandedIds = new Set(expandedIds);
      nextExpandedIds.delete(groupId);
      return nextExpandedIds;
    });
    this.hideTimelineGroupTooltip();
  }

  vitalChartX(index: number, pointCount: number): number {
    return scaleLinear()
      .domain([0, Math.max(pointCount - 1, 1)])
      .range([42, 402])(index);
  }

  vitalChartY(value: number, chart: VitalChart): number {
    return scaleLinear()
      .domain([chart.min, chart.max])
      .range([this.vitalChartBottom(chart), 10])
      .clamp(true)(value);
  }

  vitalChartViewBox(chart: VitalChart): string {
    return `0 0 420 ${chart.compact ? 120 : 160}`;
  }

  vitalChartBottom(chart: VitalChart): number {
    return chart.compact ? 96 : 140;
  }

  vitalChartAxisY(chart: VitalChart): number {
    return chart.compact ? 111 : 154;
  }

  vitalChartRangeHeight(chart: VitalChart): number {
    if (!chart.normalRange) {
      return 0;
    }

    return Math.max(
      0,
      this.vitalChartY(chart.normalRange.min, chart) -
        this.vitalChartY(chart.normalRange.max, chart),
    );
  }

  updateVitalChartHover(event: MouseEvent, chart: VitalChart, chartIndex: number): void {
    const svg = event.currentTarget as SVGSVGElement;
    const bounds = svg.getBoundingClientRect();

    if (!bounds.width || chart.xLabels.length === 0) {
      return;
    }

    const chartX = ((event.clientX - bounds.left) / bounds.width) * 420;
    const relativeX = this.clamp(chartX, 42, 402) - 42;
    const pointIndex = Math.round((relativeX / 360) * Math.max(chart.xLabels.length - 1, 0));
    this.vitalChartHover.set({ chartIndex, pointIndex });
  }

  clearVitalChartHover(chartIndex: number): void {
    if (this.vitalChartHover()?.chartIndex === chartIndex) {
      this.vitalChartHover.set(null);
    }
  }

  vitalChartValueLabelX(pointIndex: number, pointCount: number): number {
    const pointX = this.vitalChartX(pointIndex, pointCount);
    return pointIndex >= pointCount - 2 ? pointX - 36 : pointX + 7;
  }

  vitalChartValueLabelY(value: number, chart: VitalChart): number {
    return this.clamp(this.vitalChartY(value, chart) - 10, 20, this.vitalChartBottom(chart) - 10);
  }

  vitalChartPath(chart: VitalChart, series: VitalChartSeries): string {
    return series.values
      .map((value, index) => {
        const command = index === 0 ? 'M' : 'L';
        return `${command}${this.vitalChartX(index, series.values.length)},${this.vitalChartY(value, chart)}`;
      })
      .join(' ');
  }

  resultChartX(index: number, pointCount: number): number {
    return scaleLinear()
      .domain([0, Math.max(pointCount - 1, 1)])
      .range([35, 469])(index);
  }

  resultChartPath(chart: VitalChart, series: VitalChartSeries): string {
    return series.values
      .map((value, index) => {
        const command = index === 0 ? 'M' : 'L';
        return `${command}${this.resultChartX(index, series.values.length)},${this.vitalChartY(value, chart)}`;
      })
      .join(' ');
  }

  toggleTimelineGroup(groupId: string): void {
    this.expandedTimelineGroupIds.update((expandedIds) => {
      const nextExpandedIds = new Set(expandedIds);

      if (nextExpandedIds.has(groupId)) {
        nextExpandedIds.delete(groupId);
      } else {
        nextExpandedIds.add(groupId);
      }

      return nextExpandedIds;
    });
  }

  isTimelineGroupExpanded(groupId: string): boolean {
    return this.expandedTimelineGroupIds().has(groupId);
  }

  openAddProblemDialog(): void {
    if (!this.dialog) {
      return;
    }

    const trigger = document.activeElement instanceof HTMLElement ? document.activeElement : null;

    this.dialog
      .open<AddProblemDialog, void, AddProblemDialogResult>(AddProblemDialog, {
        autoFocus: 'first-tabbable',
        maxWidth: 'calc(100vw - 1.5rem)',
        panelClass: 'add-problem-dialog-panel',
        restoreFocus: false,
        width: '576px',
      })
      .afterClosed()
      .subscribe((result) => {
        if (result) {
          this.addTimelineProblem(result.name);
        }

        trigger?.focus({ preventScroll: true });
      });
  }

  openTimelineItemDialog(groupId: string): void {
    if (!this.dialog) {
      return;
    }

    const trigger = document.activeElement instanceof HTMLElement ? document.activeElement : null;

    this.dialog
      .open<TimelineItemDialog, void, TimelineItemDialogResult>(TimelineItemDialog, {
        autoFocus: 'first-tabbable',
        maxWidth: 'calc(100vw - 1.5rem)',
        panelClass: 'timeline-item-dialog-panel',
        restoreFocus: false,
        width: '422px',
      })
      .afterClosed()
      .subscribe((result) => {
        if (result) {
          this.addTimelineItem(groupId, result);
        }

        trigger?.focus({ preventScroll: true });
      });
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
    const status = this.timelineStatusLabel(chip.status);
    const range = `${this.formatWeek(chip.startWeek)} to ${this.formatWeek(chip.endWeek)}`;
    const currentWeekNote = this.chipCrossesCurrentWeek(chip) ? ' - crosses the current week' : '';
    return `${chip.label}: ${range} - ${status}${currentWeekNote}`;
  }

  timelineStatusLabel(status: TimelineStatus): string {
    return this.timelineLegend.find((item) => item.status === status)?.label ?? status;
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

    this.hideTimelineStatusTooltip();
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
      interaction.mode === 'move',
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
    this.hideTimelineStatusTooltip();
    this.rememberTimeline();
    const maxWeek = this.pregnancyTimeline().maxWeek;
    const duration = chip.endWeek - chip.startWeek;
    const direction = event.key === 'ArrowLeft' ? -0.5 : 0.5;
    const startWeek = this.clamp(chip.startWeek + direction, 0, maxWeek - duration);
    this.updateTimelineChip(groupId, rowId, chip.id, startWeek, startWeek + duration, true);
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
    if (this.activeResultTooltip()) {
      this.hideResultTooltip();
    }

    if (this.riskAssessmentOpen()) {
      this.hideRiskAssessment();
    }

    if (this.deliveryWindowTooltipOpen()) {
      this.hideDeliveryWindowTooltip();
    }

    if (this.activeTimelineGroupTooltip()) {
      this.hideTimelineGroupTooltip();
    }

    if (this.activeTimelineStatusTooltip() && !this.timelineStatusTooltipHasFocus()) {
      this.hideTimelineStatusTooltip();
    }

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

  private cancelResultTooltipHide(): void {
    if (this.resultTooltipHideTimer !== null) {
      window.clearTimeout(this.resultTooltipHideTimer);
      this.resultTooltipHideTimer = null;
    }
  }

  private cancelRiskAssessmentHide(): void {
    if (this.riskAssessmentHideTimer !== null) {
      window.clearTimeout(this.riskAssessmentHideTimer);
      this.riskAssessmentHideTimer = null;
    }
  }

  private cancelDeliveryWindowTooltipHide(): void {
    if (this.deliveryWindowTooltipHideTimer !== null) {
      window.clearTimeout(this.deliveryWindowTooltipHideTimer);
      this.deliveryWindowTooltipHideTimer = null;
    }
  }

  private cancelTimelineGroupTooltipHide(): void {
    if (this.timelineGroupTooltipHideTimer !== null) {
      window.clearTimeout(this.timelineGroupTooltipHideTimer);
      this.timelineGroupTooltipHideTimer = null;
    }
  }

  private cancelTimelineStatusTooltipHide(): void {
    if (this.timelineStatusTooltipHideTimer !== null) {
      window.clearTimeout(this.timelineStatusTooltipHideTimer);
      this.timelineStatusTooltipHideTimer = null;
    }
  }

  private timelineStatusTooltipHasFocus(): boolean {
    return document.activeElement instanceof HTMLElement
      ? document.activeElement.closest('.timeline-status-tooltip') !== null
      : false;
  }

  private setTooltipGlassFocus(bounds: DOMRect): void {
    const padding = 6;
    const left = Number.isFinite(bounds.left) ? bounds.left : 0;
    const top = Number.isFinite(bounds.top) ? bounds.top : 0;
    const right = Number.isFinite(bounds.right)
      ? bounds.right
      : left + (Number.isFinite(bounds.width) ? bounds.width : 0);
    const bottom = Number.isFinite(bounds.bottom)
      ? bounds.bottom
      : top + (Number.isFinite(bounds.height) ? bounds.height : 0);

    this.tooltipGlassFocusRect.set({
      left: this.clamp(left - padding, 0, window.innerWidth),
      top: this.clamp(top - padding, 0, window.innerHeight),
      right: this.clamp(right + padding, 0, window.innerWidth),
      bottom: this.clamp(bottom + padding, 0, window.innerHeight),
    });
  }

  private updateTimelineChip(
    groupId: string,
    rowId: string,
    chipId: string,
    startWeek: number,
    endWeek: number,
    updateLateOrFutureStatus = false,
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
                        chip.id === chipId
                          ? {
                              ...chip,
                              startWeek,
                              endWeek,
                              status:
                                updateLateOrFutureStatus &&
                                (chip.status === 'late' || chip.status === 'future')
                                  ? startWeek >= timeline.currentWeek
                                    ? 'future'
                                    : 'late'
                                  : chip.status,
                            }
                          : chip,
                      ),
                    }
                  : row,
              ),
            }
          : group,
      ),
    }));
  }

  private addTimelineItem(groupId: string, item: TimelineItemDialogResult): void {
    this.rememberTimeline();
    const itemId = `custom-timeline-item-${++this.timelineItemSequence}`;
    const endWeek = item.mode === 'medication' ? 40 : item.endWeek;
    const label =
      item.mode === 'medication' && item.dosage ? `${item.name} (${item.dosage})` : item.name;

    this.pregnancyTimeline.update((timeline) => ({
      ...timeline,
      groups: timeline.groups.map((group) =>
        group.id === groupId
          ? {
              ...group,
              rows: [
                ...group.rows,
                {
                  id: itemId,
                  label,
                  chips: [
                    {
                      id: `${itemId}-chip`,
                      label,
                      status: 'future',
                      startWeek: item.startWeek,
                      endWeek,
                    },
                  ],
                },
              ],
            }
          : group,
      ),
    }));
    this.expandedTimelineGroupIds.update((expandedIds) => new Set(expandedIds).add(groupId));
  }

  private addTimelineProblem(name: string): void {
    this.rememberTimeline();
    const problemId = `custom-problem-${++this.timelineProblemSequence}`;

    this.pregnancyTimeline.update((timeline) => ({
      ...timeline,
      groups: [
        ...timeline.groups,
        {
          condition: {
            description: `Patient-specific condition added to the problem list: ${name}.`,
            tags: [
              { label: 'Patient added', tone: 'purple' },
              { label: 'Active', tone: 'pink' },
              { label: 'Clinical', tone: 'blue' },
              { label: 'Follow-up', tone: 'teal' },
            ],
          },
          id: problemId,
          label: name,
          rows: [],
        },
      ],
    }));
    this.expandedTimelineGroupIds.update((expandedIds) => new Set(expandedIds).add(problemId));
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
        condition: {
          ...group.condition,
          tags: group.condition.tags.map((tag) => ({ ...tag })),
        },
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
