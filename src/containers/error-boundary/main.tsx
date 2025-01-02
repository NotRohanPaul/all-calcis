import React, { ReactNode } from 'react';
import { Link } from 'react-router-dom';

interface ErrorBoundaryProps {
    children: ReactNode;
}

interface ErrorBoundaryState {
    hasError: boolean;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(): ErrorBoundaryState {
        return { hasError: true };
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
        console.error("Error caught by ErrorBoundary:", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (<div className="w-fit h-fit absolute inset-0 m-auto flex flex-col gap-2">
                <p className="text-4xl">
                    Something went wrong!
                </p>
                <div className="flex justify-between text-2xl [&>*]:p-1 [&>*]:outline [&>*]:outline-1 [&>*:hover]:outline-white [&>*:hover]:bg-white [&>*:hover]:text-black [&>*]:transition-colors [&>*]:duration-300">
                    <Link to={"/"} reloadDocument>
                        Home
                    </Link>
                    <Link to={"#"} reloadDocument>
                        Refresh
                    </Link>
                </div>
            </div>);
        }
        return this.props.children;
    }
}

export default ErrorBoundary;
