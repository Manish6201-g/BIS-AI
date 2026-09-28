import React from 'react';

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an unhandled error:', error, errorInfo);
    this.setState({ errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-black text-white flex items-center justify-center p-6 font-mono">
          <div className="max-w-xl w-full bg-zinc-950 border border-red-500/30 rounded-2xl p-6 sm:p-8 space-y-4 shadow-2xl">
            <div className="flex items-center space-x-2 text-rose-400 font-bold text-sm uppercase tracking-wider">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse" />
              <span>Application Render Exception</span>
            </div>

            <h2 className="text-xl sm:text-2xl font-black text-white">
              An unexpected error occurred while rendering.
            </h2>

            <div className="bg-black/60 border border-zinc-800 rounded-xl p-3 text-xs text-rose-300 overflow-x-auto">
              <code>{this.state.error?.toString()}</code>
            </div>

            <div className="pt-2 flex items-center gap-3">
              <button
                type="button"
                onClick={() => window.location.reload()}
                className="px-4 py-2 rounded-xl bg-white text-black font-bold text-xs uppercase tracking-wider hover:bg-zinc-200 transition-colors cursor-pointer"
              >
                Reload Page
              </button>
              <button
                type="button"
                onClick={() => this.setState({ hasError: false, error: null })}
                className="px-4 py-2 rounded-xl bg-zinc-900 border border-zinc-700 text-zinc-300 font-bold text-xs uppercase tracking-wider hover:text-white transition-colors cursor-pointer"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
