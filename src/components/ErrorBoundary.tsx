import React, { Component, ErrorInfo, ReactNode } from "react";

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-red-50 p-4">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full border border-red-200">
            <h1 className="text-xl font-bold text-red-600 mb-2">Something went wrong.</h1>
            <p className="text-gray-600 mb-4">The application encountered an error while rendering.</p>
            <pre className="bg-gray-100 p-3 rounded text-xs overflow-auto text-red-800 font-mono border border-gray-200">
              {this.state.error?.message}
            </pre>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 w-full bg-red-600 text-white py-2 rounded hover:bg-red-700 transition"
            >
              Reload Application
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
