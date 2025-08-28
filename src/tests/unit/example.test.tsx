import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Counter from "@/components/Counter";

describe("Counter Component", () => {
  it("renders with initial state", () => {
    render(<Counter />);
    expect(screen.getByText(/Count:/)).toHaveTextContent("Count: 0");
  });

  it("increments when button clicked", () => {
    render(<Counter />);
    fireEvent.click(screen.getByText("+1"));
    expect(screen.getByText(/Count:/)).toHaveTextContent("Count: 1");
  });

  it("resets count when reset button clicked", () => {
    render(<Counter />);
    fireEvent.click(screen.getByText("+1"));
    fireEvent.click(screen.getByText("Reset"));
    expect(screen.getByText(/Count:/)).toHaveTextContent("Count: 0");
  });
});
