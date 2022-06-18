import { render, screen } from "../../../utils/testUtility";
import ErrorBoundary from "../ErrorBoundary";

describe("<ErrorBoundary />", () => {
  it("Error Boundary", () => {
    const ThrowError = () => {
      throw new Error("Test");
    };
    render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>
    );

    expect(screen.getByTestId("errorBoundary")).toBeVisible();
  });
});
