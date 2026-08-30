import { Component, inject, input, output, signal } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

type MenuGroupId = 'institution' | 'configuration' | 'clinicalRules';

interface MenuChild {
  readonly label: string;
  readonly route: readonly string[];
  readonly icon: string;
  readonly iconSize: 18 | 20;
}

interface MenuGroup {
  readonly id: MenuGroupId;
  readonly label: string;
  readonly icon: string;
  readonly children: readonly MenuChild[];
}

@Component({
  selector: 'app-admin-sidebar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './admin-sidebar.html',
  styleUrl: './admin-sidebar.scss',
})
export class AdminSidebar {
  private readonly router = inject(Router);

  readonly collapsed = input(false);
  readonly mobileOpen = input(false);
  readonly collapseChange = output<void>();
  readonly navigationSelected = output<void>();

  protected readonly openGroups = signal<Record<MenuGroupId, boolean>>(
    this.initialOpenGroups(this.router.url),
  );

  protected readonly groups: readonly MenuGroup[] = [
    {
      id: 'institution',
      label: 'Institution',
      icon: 'assets/admin/institution.svg',
      children: [
        {
          label: 'Institutions',
          route: ['/admin', 'institution', 'institutions'],
          icon: 'assets/admin/institutions.svg',
          iconSize: 20,
        },
        {
          label: 'Institution Admins',
          route: ['/admin', 'institution', 'institution-admins'],
          icon: 'assets/admin/institution-users.svg',
          iconSize: 20,
        },
        {
          label: 'Providers',
          route: ['/admin', 'institution', 'providers'],
          icon: 'assets/admin/institution-users.svg',
          iconSize: 20,
        },
      ],
    },
    {
      id: 'configuration',
      label: 'Configuration',
      icon: 'assets/admin/settings.svg',
      children: [
        {
          label: 'Problem Library',
          route: ['/admin', 'configuration', 'problem-library'],
          icon: 'assets/admin/problem-library.svg',
          iconSize: 18,
        },
        {
          label: 'Category Library',
          route: ['/admin', 'configuration', 'category-library'],
          icon: 'assets/admin/category-library.svg',
          iconSize: 18,
        },
        {
          label: 'Task Library',
          route: ['/admin', 'configuration', 'task-library'],
          icon: 'assets/admin/task-library.svg',
          iconSize: 18,
        },
      ],
    },
    {
      id: 'clinicalRules',
      label: 'Clinical Rules',
      icon: 'assets/admin/clinical-rules.svg',
      children: [
        {
          label: 'Clinical Threshold Config',
          route: ['/admin', 'clinical-rules', 'clinical-threshold-config'],
          icon: 'assets/admin/clinical-threshold.svg',
          iconSize: 18,
        },
        {
          label: 'Delivery Window Config',
          route: ['/admin', 'clinical-rules', 'delivery-window-config'],
          icon: 'assets/admin/delivery-window.svg',
          iconSize: 18,
        },
      ],
    },
  ];

  protected toggleGroup(groupId: MenuGroupId): void {
    this.openGroups.update((groups) => ({ ...groups, [groupId]: !groups[groupId] }));
  }

  private initialOpenGroups(url: string): Record<MenuGroupId, boolean> {
    const decodedUrl = decodeURIComponent(url);

    return {
      institution: decodedUrl.includes('/institution/') || !decodedUrl.includes('/admin/'),
      configuration: decodedUrl.includes('/configuration/'),
      clinicalRules: decodedUrl.includes('/clinical-rules/'),
    };
  }
}
