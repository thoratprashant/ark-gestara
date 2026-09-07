import { Component, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { ActivatedRoute, RouterLink } from '@angular/router';

type ProviderStatus = 'Active' | 'Pending' | 'Inactive';

interface ProviderRow {
  readonly name: string;
  readonly npi: string;
  readonly specialty: string;
  readonly status: ProviderStatus;
  readonly email: string;
  readonly phone: string;
  readonly joinedDate: string;
}

@Component({
  selector: 'app-institution-provider',
  imports: [MatSelectModule, RouterLink],
  templateUrl: './institution-provider.html',
  styleUrl: './institution-provider.scss',
})
export class InstitutionProvider {
  private readonly route = inject(ActivatedRoute);
  private readonly queryParamMap = toSignal(this.route.queryParamMap, {
    initialValue: this.route.snapshot.queryParamMap,
  });

  protected readonly searchTerm = signal('');
  protected readonly selectedStatus = signal<'All Status' | ProviderStatus>('All Status');
  protected readonly statusOptions = ['All Status', 'Active', 'Pending', 'Inactive'] as const;

  protected readonly institution = computed(() => {
    const params = this.queryParamMap();
    const sourceStatus = params.get('status') ?? 'Invitation Sent';

    return {
      name: params.get('institution') ?? 'City General Hospital',
      type: params.get('type') ?? 'Hospital',
      location: params.get('location') ?? 'New York, NY',
      status:
        sourceStatus === 'Invitation Sent' || sourceStatus === 'Profile Incomplete'
          ? 'Pending'
          : sourceStatus,
      providerCount: Math.max(0, Number(params.get('providers') ?? 47) || 0),
    };
  });

  protected readonly providers: readonly ProviderRow[] = [
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
    if (this.institution().providerCount === 0) return [];

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
    this.selectedStatus.set(event.value as 'All Status' | ProviderStatus);
  }
}
