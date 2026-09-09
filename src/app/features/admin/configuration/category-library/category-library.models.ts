export type LibraryStatus = 'Active' | 'Draft' | 'Pending' | 'Inactive';

export interface CategoryProblem {
  id: number;
  code: string;
  name: string;
  sequence: number;
  status: LibraryStatus;
}

export interface CategoryTask {
  id: number;
  name: string;
  sequence: number;
  status: LibraryStatus;
}
