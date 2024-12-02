import { render, screen, fireEvent } from "@testing-library/react";
import LoginForm from "./LoginForm";

describe("LoginForm", () => {
  it("renders login form", () => {
    render(<LoginForm />);
    expect(screen.getByText("Login")).toBeInTheDocument();
    expect(screen.getByLabelText("Email Address")).toBeInTheDocument();
    expect(screen.getByLabelText("Password")).toBeInTheDocument();
  });

  it("shows validation error for invalid email", () => {
    render(<LoginForm />);
    const emailInput = screen.getByLabelText("Email Address");
    const loginButton = screen.getByRole("button", { name: /login/i });

    fireEvent.change(emailInput, { target: { value: "invalidEmail" } });
    fireEvent.click(loginButton);

    expect(
      screen.getByText("Please enter a valid email address.")
    ).toBeInTheDocument();
  });
});
