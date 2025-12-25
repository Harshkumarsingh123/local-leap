import { Link, useLocation } from 'react-router-dom';
import { useMember } from '@/integrations';
import { Button } from '@/components/ui/button';
import { Menu, X, User, Briefcase } from 'lucide-react';
import { useState } from 'react';

export default function Header() {
  const { member, isAuthenticated, isLoading, actions } = useMember();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  const navLinks = [
    { path: '/', label: 'HOME' },
    { path: '/how-it-works', label: 'HOW IT WORKS' },
    { path: '/find-jobs', label: 'FIND JOBS' },
    { path: '/post-job', label: 'POST A JOB' },
    { path: '/pricing', label: 'PRICING' },
    { path: '/safety', label: 'SAFETY & TRUST' },
    { path: '/contact', label: 'CONTACT' },
  ];

  return (
    <header className="bg-background border-b border-secondary/10 sticky top-0 z-50">
      <div className="max-w-[120rem] mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <h1 className="font-heading text-2xl lg:text-3xl text-secondary tracking-tight">
              LOCALWORK
            </h1>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`font-heading text-sm tracking-wide transition-colors ${
                  isActive(link.path)
                    ? 'text-primary border-b-2 border-primary pb-1'
                    : 'text-secondary hover:text-primary'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Auth Buttons */}
          <div className="hidden lg:flex items-center gap-4">
            {isLoading ? (
              <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            ) : isAuthenticated ? (
              <>
                <Link to="/profile">
                  <Button variant="outline" className="font-heading">
                    <User className="w-4 h-4 mr-2" />
                    {member?.profile?.nickname || 'PROFILE'}
                  </Button>
                </Link>
                <Button onClick={actions.logout} variant="default" className="font-heading">
                  SIGN OUT
                </Button>
              </>
            ) : (
              <>
                <Button onClick={actions.login} variant="outline" className="font-heading">
                  LOG IN
                </Button>
                <Button onClick={actions.login} variant="default" className="font-heading">
                  SIGN UP
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-secondary"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-6 border-t border-secondary/10">
            <nav className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`font-heading text-base tracking-wide py-2 ${
                    isActive(link.path) ? 'text-primary' : 'text-secondary'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="flex flex-col gap-3 mt-4 pt-4 border-t border-secondary/10">
                {isAuthenticated ? (
                  <>
                    <Link to="/profile" onClick={() => setMobileMenuOpen(false)}>
                      <Button variant="outline" className="w-full font-heading">
                        <User className="w-4 h-4 mr-2" />
                        PROFILE
                      </Button>
                    </Link>
                    <Button onClick={actions.logout} variant="default" className="w-full font-heading">
                      SIGN OUT
                    </Button>
                  </>
                ) : (
                  <>
                    <Button onClick={actions.login} variant="outline" className="w-full font-heading">
                      LOG IN
                    </Button>
                    <Button onClick={actions.login} variant="default" className="w-full font-heading">
                      SIGN UP
                    </Button>
                  </>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
