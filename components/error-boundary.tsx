"use client"

import { Component, type ErrorInfo, type ReactNode } from "react"
import { ErrorMessage } from "./error-message"

interface Props {
  children: ReactNode
  fallbackTitle?: string
}

interface State {
  hasError: boolean
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false }

  static getDerivedStateFromError(): State {
    return { hasError: true }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("ErrorBoundary caught an error:", error, info)
  }

  render() {
    if (this.state.hasError) {
      return (
        <ErrorMessage
          title={this.props.fallbackTitle ?? "Something went wrong"}
          message="This part of the page failed to render. Please refresh and try again."
          onRetry={() => this.setState({ hasError: false })}
        />
      )
    }
    return this.props.children
  }
}
