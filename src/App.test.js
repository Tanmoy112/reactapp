import { render, screen } from "@testing-library/react";
import App from "./App";
import TableComp from "./components/table";

test("renders the component", () => {
  render(<TableComp />);
  const table = screen.getByTestId("table");
  expect(table).toBeInTheDocument();
});
