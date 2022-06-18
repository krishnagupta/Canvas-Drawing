import { render, screen } from "../utils/testUtility";
import App from "../App";

describe("<App />", () => {
  const mockStore = {
    error: [],
    width: 0,
    height: 0,
  };

  it("Should render App component", () => {
    render(<App />, mockStore);
    expect(screen.getByTestId('app')).toBeInTheDocument();
  });
});
