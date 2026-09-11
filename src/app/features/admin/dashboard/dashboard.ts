import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  NgZone,
  OnDestroy,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatTooltipModule } from '@angular/material/tooltip';

interface DashboardMetric {
  id: string;
  label: string;
  value: number;
  icon?: string;
  tone?: 'teal' | 'coral' | 'gold' | 'blue';
}

interface DashboardAction {
  label: string;
  icon: string;
  tone: 'teal' | 'gold' | 'blue';
  route: string;
}

@Component({
  selector: 'app-admin-dashboard',
  imports: [MatTooltipModule, RouterLink],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard implements AfterViewInit, OnDestroy {
  @ViewChildren('countValue') private readonly countElements?: QueryList<ElementRef<HTMLElement>>;

  readonly institutionMetrics: DashboardMetric[] = [
    {
      id: 'total-institutions',
      label: 'Total Institutions',
      value: 124,
      icon: 'assets/admin/dashboard/total-institutions.svg',
      tone: 'teal',
    },
    {
      id: 'active-institutions',
      label: 'Active Institutions',
      value: 86,
      icon: 'assets/admin/dashboard/active-institutions.svg',
      tone: 'coral',
    },
    {
      id: 'pending-activation',
      label: 'Pending Activation',
      value: 18,
      icon: 'assets/admin/dashboard/pending-activation.svg',
      tone: 'gold',
    },
    {
      id: 'total-providers',
      label: 'Total Providers',
      value: 1207,
      icon: 'assets/admin/dashboard/total-providers.svg',
      tone: 'blue',
    },
  ];

  readonly configurationMetrics: DashboardMetric[] = [
    { id: 'problems', label: 'Problems', value: 145 },
    { id: 'categories', label: 'Categories', value: 62 },
    { id: 'task-templates', label: 'Task Templates', value: 384 },
    { id: 'orders', label: 'Orders', value: 512 },
    { id: 'clinical-threshold-rules', label: 'Clinical Threshold Rules', value: 78 },
    { id: 'delivery-window-rules', label: 'Delivery Window Rules', value: 22 },
  ];

  readonly integrityMetrics: DashboardMetric[] = [
    { id: 'missing-categories', label: 'Problems Missing Categories', value: 124 },
    { id: 'missing-tasks', label: 'Categories Missing Tasks', value: 86 },
    { id: 'missing-orders', label: 'Tasks Missing Orders', value: 18 },
    { id: 'missing-threshold-rules', label: 'Orders Missing Threshold Rules', value: 1207 },
  ];

  readonly quickActions: DashboardAction[] = [
    {
      label: 'Add New Institution',
      icon: 'assets/admin/dashboard/quick-institution.svg',
      tone: 'teal',
      route: '/admin/institution/institutions/add-institution',
    },
    {
      label: 'Manage Problem Library',
      icon: 'assets/admin/dashboard/quick-problem.svg',
      tone: 'gold',
      route: '/admin/configuration/problem-library',
    },
    {
      label: 'Manage Providers',
      icon: 'assets/admin/dashboard/quick-provider.svg',
      tone: 'blue',
      route: '/admin/institution/providers',
    },
    {
      label: 'Manage Order Templates',
      icon: 'assets/admin/dashboard/quick-institution.svg',
      tone: 'teal',
      route: '/admin/configuration/task-library',
    },
    {
      label: 'Configure Clinical Rules',
      icon: 'assets/admin/dashboard/quick-problem.svg',
      tone: 'gold',
      route: '/admin/clinical-rules/clinical-threshold-config',
    },
    {
      label: 'Configure Delivery Rules',
      icon: 'assets/admin/dashboard/quick-provider.svg',
      tone: 'blue',
      route: '/admin/clinical-rules/delivery-window-config',
    },
  ];

  private readonly displayedCounts = new Map<string, number>();
  private readonly metricTargets = new Map<string, number>();
  private readonly animationFrames = new Map<string, number>();
  private observer?: IntersectionObserver;

  constructor(
    private readonly cdr: ChangeDetectorRef,
    private readonly ngZone: NgZone,
  ) {}

  ngAfterViewInit(): void {
    this.resetDisplayedCounts();
    this.setupCountObserver();
    this.countElements?.changes.subscribe(() => {
      this.resetDisplayedCounts();
      this.setupCountObserver();
    });
    this.cdr.detectChanges();
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
    this.animationFrames.forEach((frameId) => cancelAnimationFrame(frameId));
  }

  displayedValue(metric: DashboardMetric): string {
    return (this.displayedCounts.get(metric.id) ?? 0).toLocaleString('en-US');
  }

  private resetDisplayedCounts(): void {
    [...this.institutionMetrics, ...this.configurationMetrics, ...this.integrityMetrics].forEach(
      (metric) => {
        this.displayedCounts.set(metric.id, 0);
        this.metricTargets.set(metric.id, metric.value);
      },
    );
  }

  private setupCountObserver(): void {
    this.observer?.disconnect();

    if (!this.countElements?.length || typeof IntersectionObserver === 'undefined') {
      this.metricTargets.forEach((value, id) => this.displayedCounts.set(id, value));
      return;
    }

    this.ngZone.runOutsideAngular(() => {
      this.observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) {
              return;
            }

            const metricId = (entry.target as HTMLElement).dataset['metricId'];

            if (metricId) {
              this.animateCount(metricId);
            }
          });
        },
        { threshold: 0.35 },
      );

      this.countElements?.forEach((element) => this.observer?.observe(element.nativeElement));
    });
  }

  private animateCount(metricId: string): void {
    const target = this.metricTargets.get(metricId) ?? 0;
    const existingFrame = this.animationFrames.get(metricId);

    if (existingFrame) {
      cancelAnimationFrame(existingFrame);
    }

    const duration = 900;
    const startTime = performance.now();
    this.displayedCounts.set(metricId, 0);

    const tick = (time: number) => {
      const progress = Math.min((time - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(target * eased);

      this.ngZone.run(() => {
        this.displayedCounts.set(metricId, current);
        this.cdr.markForCheck();
      });

      if (progress < 1) {
        this.animationFrames.set(metricId, requestAnimationFrame(tick));
      } else {
        this.animationFrames.delete(metricId);
      }
    };

    this.animationFrames.set(metricId, requestAnimationFrame(tick));
  }
}
