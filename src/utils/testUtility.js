import { render as rtlRender } from "@testing-library/react";

import ErrorBoundary from "../components/error/ErrorBoundary";
import { StoreProvider } from "../store/store";
import { canvasReducer } from "../store/canvasReducer";

const render = (ui, store) => {
  const renderWithStore = ({ children }) => {
    return (
      <StoreProvider initialState={store} reducer={canvasReducer}>
        <ErrorBoundary>{children}</ErrorBoundary>
      </StoreProvider>
    );
  };
  return rtlRender(ui, { wrapper: renderWithStore });
};

export * from "@testing-library/react"

export { render };
