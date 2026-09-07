import React from 'react';
import { Gamepad2, RotateCw } from 'lucide-react';

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  declare props: ErrorBoundaryProps;
  declare state: ErrorBoundaryState;

  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Uncaught error in Multi Play:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen min-h-[100dvh] w-full flex flex-col items-center justify-center p-6 bg-gradient-to-b from-sky-300 to-emerald-200 dark:from-slate-950 dark:to-slate-900 text-slate-900 dark:text-white text-center select-none font-sans">
          <div className="bg-white/95 dark:bg-slate-900/95 p-6 rounded-3xl shadow-xl border-4 border-amber-400 max-w-sm flex flex-col items-center gap-4 backdrop-blur-xs">
            <div className="w-16 h-16 rounded-2xl bg-amber-100 dark:bg-slate-800 flex items-center justify-center text-amber-500 shadow-inner">
              <Gamepad2 className="w-10 h-10" />
            </div>
            <h1 className="text-2xl font-black text-amber-600 dark:text-amber-400">
              Let's Refresh Multi Play!
            </h1>
            <p className="text-sm font-bold text-slate-600 dark:text-slate-300">
              A quick refresh will get your math games back up and running smoothly.
            </p>
            <button
              onClick={() => {
                try {
                  if ('caches' in window) {
                    caches.keys().then((names) => {
                      names.forEach((name) => caches.delete(name));
                    });
                  }
                } catch {}
                window.location.reload();
              }}
              className="w-full py-3 px-6 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white font-black text-base rounded-2xl shadow-md border-2 border-emerald-300 cursor-pointer active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              <RotateCw className="w-5 h-5 animate-spin" />
              <span>Reload & Play</span>
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
