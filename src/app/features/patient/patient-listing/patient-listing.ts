import { Component, computed, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

type Trimester = 1 | 2 | 3;
type RiskLevel = 'High' | 'Medium' | 'Low';

interface PatientListItem {
  initials: string;
  name: string;
  age: number;
  gestationalAge: string;
  dueDate: string;
  nextVisit: string;
  risk: RiskLevel;
  trimester: Trimester;
}

@Component({
  selector: 'app-patient-listing',
  imports: [RouterLink],
  templateUrl: './patient-listing.html',
  styleUrl: './patient-listing.scss',
})
export class PatientListing {
  readonly searchTerm = signal('');
  readonly selectedTrimester = signal<Trimester>(3);
  readonly selectedRisk = signal<RiskLevel | null>(null);

  readonly trimesterFilters: ReadonlyArray<{ label: string; value: Trimester }> = [
    { label: '1st Trimester', value: 1 },
    { label: '2nd Trimester', value: 2 },
    { label: '3rd Trimester', value: 3 },
  ];

  readonly riskFilters: ReadonlyArray<RiskLevel> = ['High', 'Medium', 'Low'];

  readonly patients: ReadonlyArray<PatientListItem> = [
    {
      initials: 'SJ',
      name: 'Sarah Johnson',
      age: 32,
      gestationalAge: '28w 4d',
      dueDate: 'Jun 15, 2026',
      nextVisit: 'Apr 11, 2026',
      risk: 'High',
      trimester: 3,
    },
    {
      initials: 'EM',
      name: 'Emily Martinez',
      age: 40,
      gestationalAge: '36w 3d',
      dueDate: 'Apr 3, 2026',
      nextVisit: 'Jul 31, 2026',
      risk: 'High',
      trimester: 3,
    },
    {
      initials: 'JC',
      name: 'Jessica Carter',
      age: 35,
      gestationalAge: '32w 1d',
      dueDate: 'Apr 10, 2026',
      nextVisit: 'Aug 1, 2026',
      risk: 'High',
      trimester: 3,
    },
    {
      initials: 'AL',
      name: 'Amanda Lee',
      age: 36,
      gestationalAge: '30w 2d',
      dueDate: 'Apr 28, 2026',
      nextVisit: 'Aug 2, 2026',
      risk: 'High',
      trimester: 3,
    },
    {
      initials: 'RD',
      name: 'Rebecca Davis',
      age: 34,
      gestationalAge: '34w 0d',
      dueDate: 'May 3, 2026',
      nextVisit: 'Aug 3, 2026',
      risk: 'Medium',
      trimester: 3,
    },
    {
      initials: 'LH',
      name: 'Liam Hernandez',
      age: 30,
      gestationalAge: '29w 5d',
      dueDate: 'Jun 20, 2026',
      nextVisit: 'Jul 15, 2026',
      risk: 'Medium',
      trimester: 3,
    },
    {
      initials: 'MK',
      name: 'Mia Kim',
      age: 29,
      gestationalAge: '27w 4d',
      dueDate: 'Jul 15, 2026',
      nextVisit: 'Aug 10, 2026',
      risk: 'Low',
      trimester: 3,
    },
    {
      initials: 'TW',
      name: 'Tina White',
      age: 31,
      gestationalAge: '26w 1d',
      dueDate: 'Jul 30, 2026',
      nextVisit: 'Aug 25, 2026',
      risk: 'Medium',
      trimester: 3,
    },
    {
      initials: 'JK',
      name: 'James King',
      age: 33,
      gestationalAge: '31w 0d',
      dueDate: 'Jun 5, 2026',
      nextVisit: 'Aug 15, 2026',
      risk: 'High',
      trimester: 3,
    },
    {
      initials: 'NW',
      name: 'Nina Wilson',
      age: 28,
      gestationalAge: '25w 3d',
      dueDate: 'Aug 12, 2026',
      nextVisit: 'Sep 10, 2026',
      risk: 'Low',
      trimester: 3,
    },
  ];

  readonly filteredPatients = computed(() => {
    const term = this.searchTerm().trim().toLocaleLowerCase();
    const trimester = this.selectedTrimester();
    const risk = this.selectedRisk();

    return this.patients.filter(
      (patient) =>
        patient.trimester === trimester &&
        (!risk || patient.risk === risk) &&
        (!term || patient.name.toLocaleLowerCase().includes(term)),
    );
  });

  updateSearch(event: Event): void {
    this.searchTerm.set((event.target as HTMLInputElement).value);
  }

  selectTrimester(trimester: Trimester): void {
    this.selectedTrimester.set(trimester);
  }

  toggleRisk(risk: RiskLevel): void {
    this.selectedRisk.update((selected) => (selected === risk ? null : risk));
  }
}
