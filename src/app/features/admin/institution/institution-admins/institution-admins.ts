import { Component, computed, signal } from '@angular/core';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';

type InvitationStatus = 'Active' | 'Inactive' | 'Failed';

interface InstitutionAdminRow {
  readonly institution: string;
  readonly adminName: string;
  readonly email: string;
  readonly invitationSentDate: string;
  readonly invitationSentAt: Date;
  readonly status: InvitationStatus;
  readonly lastActivity: string;
}

@Component({
  selector: 'app-institution-admins',
  imports: [MatDatepickerModule, MatFormFieldModule, MatInputModule, MatSelectModule],
  providers: [provideNativeDateAdapter()],
  templateUrl: './institution-admins.html',
  styleUrl: './institution-admins.scss',
})
export class InstitutionAdmins {
  protected readonly query = signal('');
  protected readonly status = signal<'All Status' | InvitationStatus>('All Status');
  protected readonly fromDate = signal<Date | null>(null);
  protected readonly toDate = signal<Date | null>(null);

  protected readonly institutionAdmins: readonly InstitutionAdminRow[] = [
    {
      institution: 'City General Hospital',
      adminName: 'John Doe',
      email: 'acdvfbghn345@gmail.com',
      invitationSentDate: '10 Jan 2025',
      invitationSentAt: new Date(2025, 0, 10),
      status: 'Active',
      lastActivity: '10 Jan 2025',
    },
    {
      institution: 'Valley Medical Center',
      adminName: 'Jane Smith',
      email: 'acdvfbghn345@gmail.com',
      invitationSentDate: '15 Jan 2025',
      invitationSentAt: new Date(2025, 0, 15),
      status: 'Inactive',
      lastActivity: '15 Jan 2025',
    },
    {
      institution: 'Sunrise Family Clinic',
      adminName: 'Robert Brown',
      email: 'acdvfbghn345@gmail.com',
      invitationSentDate: '22 Feb 2025',
      invitationSentAt: new Date(2025, 1, 22),
      status: 'Active',
      lastActivity: '22 Feb 2025',
    },
    {
      institution: 'Green Valley Hospital',
      adminName: 'Alice Green',
      email: 'acdvfbghn345@gmail.com',
      invitationSentDate: '03 Mar 2025',
      invitationSentAt: new Date(2025, 2, 3),
      status: 'Failed',
      lastActivity: '03 Mar 2025',
    },
  ];

  protected readonly filteredAdmins = computed(() => {
    const query = this.query().trim().toLowerCase();
    const status = this.status();
    const fromDate = this.fromDate();
    const toDate = this.toDate();

    return this.institutionAdmins.filter((admin) => {
      const searchableText = `${admin.institution} ${admin.adminName} ${admin.email}`.toLowerCase();

      return (
        (!query || searchableText.includes(query)) &&
        (status === 'All Status' || admin.status === status) &&
        (!fromDate || admin.invitationSentAt >= this.startOfDay(fromDate)) &&
        (!toDate || admin.invitationSentAt <= this.endOfDay(toDate))
      );
    });
  });

  protected updateQuery(event: Event): void {
    this.query.set((event.target as HTMLInputElement).value);
  }

  protected updateStatus(event: MatSelectChange): void {
    this.status.set(event.value);
  }

  protected updateFromDate(date: Date | null): void {
    this.fromDate.set(date);
  }

  protected updateToDate(date: Date | null): void {
    this.toDate.set(date);
  }

  private startOfDay(date: Date): Date {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
  }

  private endOfDay(date: Date): Date {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23, 59, 59, 999);
  }
}
