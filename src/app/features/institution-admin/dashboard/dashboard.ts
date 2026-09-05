import { Component, computed, signal } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';

type ProviderStatus = 'Active' | 'Pending' | 'Inactive';

interface InstitutionProvider {
  readonly name: string;
  readonly npi: string;
  readonly specialty: string;
  readonly status: ProviderStatus;
  readonly email: string;
  readonly phone: string;
  readonly joinedDate: string;
}

@Component({
  selector: 'app-institution-dashboard',
  imports: [MatButton, MatSelectModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class InstitutionDashboard {
  protected readonly statusOptions = ['All Status', 'Active', 'Pending', 'Inactive'] as const;
  protected readonly searchTerm = signal('');
  protected readonly selectedStatus = signal<(typeof this.statusOptions)[number]>('All Status');

  protected readonly providers: readonly InstitutionProvider[] = [
    {
      name: 'Dr. Sarah Jenkins',
      npi: '1487693021',
      specialty: 'Cardiology',
      status: 'Active',
      email: 'sjenkins@citygeneral.com',
      phone: '(212) 555-0143',
      joinedDate: '12 Jan 2025',
    },
    {
      name: 'Dr. Marcus Vance',
      npi: '1850938210',
      specialty: 'Orthopedics',
      status: 'Active',
      email: 'mvance@citygeneral.com',
      phone: '(212) 555-0188',
      joinedDate: '15 Jan 2025',
    },
    {
      name: 'Dr. Elena Rostova',
      npi: '1295840392',
      specialty: 'Pediatrics',
      status: 'Pending',
      email: 'erostova@citygeneral.com',
      phone: '(212) 555-0156',
      joinedDate: '03 Feb 2025',
    },
    {
      name: 'Dr. James Carter',
      npi: '1029384756',
      specialty: 'Internal Medicine',
      status: 'Active',
      email: 'jcarter@citygeneral.com',
      phone: '(212) 555-0199',
      joinedDate: '10 Feb 2025',
    },
    {
      name: 'Dr. Sophia Lin',
      npi: '1738492019',
      specialty: 'Neurology',
      status: 'Inactive',
      email: 'slin@citygeneral.com',
      phone: '(212) 555-0122',
      joinedDate: '28 Feb 2025',
    },
    {
      name: 'Dr. Amrit Patel',
      npi: '1948503829',
      specialty: 'Dermatology',
      status: 'Active',
      email: 'apatel@citygeneral.com',
      phone: '(212) 555-0177',
      joinedDate: '05 Mar 2025',
    },
    {
      name: 'Dr. Rachel Green',
      npi: '1564738290',
      specialty: 'Radiology',
      status: 'Pending',
      email: 'rgreen@citygeneral.com',
      phone: '(212) 555-0115',
      joinedDate: '14 Mar 2025',
    },
  ];

  protected readonly visibleProviders = computed(() => {
    const search = this.searchTerm().trim().toLowerCase();
    const status = this.selectedStatus();

    return this.providers.filter((provider) => {
      const matchesStatus = status === 'All Status' || provider.status === status;
      const matchesSearch =
        !search ||
        [provider.name, provider.npi, provider.specialty, provider.email, provider.phone].some(
          (value) => value.toLowerCase().includes(search),
        );

      return matchesStatus && matchesSearch;
    });
  });

  protected updateSearch(event: Event): void {
    this.searchTerm.set((event.target as HTMLInputElement).value);
  }

  protected updateStatus(event: MatSelectChange): void {
    this.selectedStatus.set(event.value as (typeof this.statusOptions)[number]);
  }
}
