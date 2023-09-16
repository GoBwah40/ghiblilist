// __tests__/HelloWorld.test.tsx
import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render } from "@testing-library/react";
import Document from "@/pages/_document";
import { test, expect } from "@jest/globals";

test('renders "Hello, World!"', () => {
  const { getByText } = render(<Document />);
  const ghibliListTitle = getByText(/The GhibliList/i);
  expect(ghibliListTitle.textContent).toEqual("The GhibliList");
});
