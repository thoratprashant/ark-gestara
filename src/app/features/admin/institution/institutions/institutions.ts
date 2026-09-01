import { Component, computed, signal } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { RouterLink } from '@angular/router';

interface InstitutionRow {
  readonly name: string;
  readonly type: string;
  readonly location: string;
  readonly status: 'Active' | 'Inactive' | 'Invitation Sent' | 'Profile Incomplete';
  readonly adminName: string;
  readonly adminEmail: string;
  readonly createdDate: string;
  readonly providers: number;
}

@Component({
  selector: 'app-institutions',
  imports: [MatButton, MatSelectModule, RouterLink],
  templateUrl: './institutions.html',
  styleUrl: './institutions.scss',
})
export class Institutions {
  protected readonly query = signal('');
  protected readonly status = signal<'All Status' | InstitutionRow['status']>('All Status');

  protected readonly institutions: readonly InstitutionRow[] = [
    {
      name: 'City General Hospital',
      type: 'Hospital',
      location: 'New York, NY',
      status: 'Invitation Sent',
      adminName: 'John Smith',
      adminEmail: 'john.smith@citygeneral.com',
      createdDate: '10 Jan 2025',
      providers: 47,
    },
    {
      name: 'Sunrise Family Clinic',
      type: 'Clinic',
      location: 'Chicago, IL',
      status: 'Inactive',
      adminName: 'Sarah Johnson',
      adminEmail: 'sarah.j@sunriseclinic.com',
      createdDate: '22 Feb 2025',
      providers: 0,
    },
    {
      name: 'Green Valley Hospital',
      type: 'Hospital',
      location: 'Houston, TX',
      status: 'Active',
      adminName: 'Michael Chen',
      adminEmail: 'mchen@greenvalley.org',
      createdDate: '03 Mar 2025',
      providers: 28,
    },
    {
      name: 'Harbor Health Center',
      type: 'Health Center',
      location: 'Miami, FL',
      status: 'Profile Incomplete',
      adminName: 'Emily Davis',
      adminEmail: 'edavis@harborhealth.com',
      createdDate: '14 Mar 2025',
      providers: 5,
    },
    {
      name: 'Mountain Peak Hospital',
      type: 'Hospital',
      location: 'Denver, CO',
      status: 'Inactive',
      adminName: 'Robert Wilson',
      adminEmail: 'rwilson@mountainpeak.com',
      createdDate: '01 Apr 2025',
      providers: 0,
    },
    {
      name: 'Riverside Clinic',
      type: 'Clinic',
      location: 'Portland, OR',
      status: 'Active',
      adminName: 'Lisa Anderson',
      adminEmail: 'landerson@riverside.com',
      createdDate: '05 Apr 2025',
      providers: 18,
    },
    {
      name: 'Pacific Health Institute',
      type: 'Institute',
      location: 'San Francisco, CA',
      status: 'Inactive',
      adminName: 'David Martinez',
      adminEmail: 'dmartinez@pacifichealth.org',
      createdDate: '19 Apr 2025',
      providers: 5,
    },
  ];

  protected readonly filteredInstitutions = computed(() => {
    const query = this.query().trim().toLowerCase();
    const status = this.status();

    return this.institutions.filter((institution) => {
      const searchableText = `${institution.name} ${institution.type} ${institution.location}`;
      return (
        (!query || searchableText.toLowerCase().includes(query)) &&
        (status === 'All Status' || institution.status === status)
      );
    });
  });

  protected updateQuery(event: Event): void {
    this.query.set((event.target as HTMLInputElement).value);
  }

  protected updateStatus(event: MatSelectChange): void {
    this.status.set(event.value);
  }
}
