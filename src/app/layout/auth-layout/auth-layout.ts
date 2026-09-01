import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  signal,
} from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter, Subscription } from 'rxjs';

@Component({
  selector: 'app-auth-layout',
  imports: [RouterOutlet],
  templateUrl: './auth-layout.html',
  styleUrl: './auth-layout.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthLayout {
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);
  private navigationSubscription: Subscription | undefined;
  private splashTimer: ReturnType<typeof setTimeout> | undefined;
  private loginRouteActive = this.isLoginUrl(this.router.url);

  protected readonly splashVisible = signal(this.loginRouteActive);

  constructor() {
    afterNextRender(() => {
      this.updateForUrl(this.router.url, true);
      this.navigationSubscription = this.router.events
        .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
        .subscribe((event) => this.updateForUrl(event.urlAfterRedirects));
    });

    this.destroyRef.onDestroy(() => {
      clearTimeout(this.splashTimer);
      this.navigationSubscription?.unsubscribe();
    });
  }

  private updateForUrl(url: string, force = false): void {
    const isLoginRoute = this.isLoginUrl(url);

    if (isLoginRoute && (force || !this.loginRouteActive)) {
      this.showLoginSplash();
    } else if (!isLoginRoute) {
      clearTimeout(this.splashTimer);
      this.splashVisible.set(false);
    }

    this.loginRouteActive = isLoginRoute;
  }

  private showLoginSplash(): void {
    clearTimeout(this.splashTimer);
    this.splashVisible.set(true);

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    this.splashTimer = setTimeout(
      () => this.splashVisible.set(false),
      prefersReducedMotion ? 650 : 2850,
    );
  }

  private isLoginUrl(url: string): boolean {
    return url.split(/[?#]/, 1)[0].replace(/\/$/, '') === '/auth/login';
  }
}
