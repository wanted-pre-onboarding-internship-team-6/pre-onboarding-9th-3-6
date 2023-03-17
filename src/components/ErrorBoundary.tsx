import { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback: ReactNode;
}

interface State {
  hasError: boolean;
}

export default class ErrorBoundary extends Component<Props, State> {
  state = { hasError: false };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  static getDerivedStateFromError(_: Error) {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // 로깅
    // eslint-disable-next-line no-console
    console.error(error, errorInfo);
  }

  render() {
    if (this.state.hasError) return this.props.fallback;

    return this.props.children;
  }
}
