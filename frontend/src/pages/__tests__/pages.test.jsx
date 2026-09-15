// @vitest-environment jsdom
import { cleanup, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { afterEach, describe, expect, it } from "vitest";

import ComparePage from "../ComparePage";
import HomePage from "../HomePage";
import ItemPage from "../ItemPage";

afterEach(cleanup);

function renderAt(path) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/item/:itemId" element={<ItemPage />} />
        <Route path="/compare" element={<ComparePage />} />
      </Routes>
    </MemoryRouter>
  );
}

function shownCount() {
  return Number(screen.getByText(/^Showing \d+ Items$/).textContent.match(/\d+/)[0]);
}

describe("HomePage", () => {
  it("shows all items after loading", async () => {
    renderAt("/");
    expect(await screen.findByText("Showing 719 Items")).toBeTruthy();
  });

  it("filters by quality and type", async () => {
    const user = userEvent.setup();
    renderAt("/");
    await screen.findByText("Showing 719 Items");

    await user.click(screen.getByRole("button", { name: "Q4" }));
    const qualityFour = shownCount();

    await user.click(screen.getByRole("button", { name: "Active" }));
    const activeQualityFour = shownCount();

    expect(qualityFour).toBeLessThan(719);
    expect(activeQualityFour).toBeLessThan(qualityFour);
    expect(screen.getByRole("heading", { name: "Quality 4" })).toBeTruthy();
  });

  it("searches names and optionally descriptions", async () => {
    const user = userEvent.setup();
    renderAt("/");
    await screen.findByText("Showing 719 Items");

    await user.type(screen.getByLabelText("Search items"), "homing");
    const byName = shownCount();

    await user.click(screen.getByLabelText("Also search in descriptions"));
    const byDescription = shownCount();

    expect(byDescription).toBeGreaterThan(byName);
  });

  it("sorts A-Z", async () => {
    const user = userEvent.setup();
    renderAt("/");
    await screen.findByText("Showing 719 Items");

    await user.selectOptions(screen.getByRole("combobox"), "az");
    const names = screen.getAllByRole("heading", { level: 3 }).map((heading) => heading.textContent);

    expect(names.slice(0, 5)).toEqual([...names.slice(0, 5)].sort((a, b) => a.localeCompare(b)));
  });

  it("shows the item name under each icon in image view", async () => {
    const user = userEvent.setup();
    renderAt("/");
    await screen.findByText("Showing 719 Items");

    await user.click(screen.getByRole("button", { name: "Q4" }));
    await user.click(screen.getByRole("button", { name: "Image View" }));

    const link = screen.getByRole("link", { name: "Sacred Heart, Quality 4" });
    expect(within(link.parentElement).getByText("Sacred Heart")).toBeTruthy();
  });
});

describe("ItemPage", () => {
  it("shows the item details", async () => {
    renderAt("/item/sacred-heart-182");
    expect(await screen.findByRole("heading", { level: 1, name: "Sacred Heart" })).toBeTruthy();
    expect(screen.getByText("Quality 4")).toBeTruthy();
    expect(screen.getByText("passive")).toBeTruthy();
  });

  it("shows a message for unknown items", async () => {
    renderAt("/item/does-not-exist");
    expect(await screen.findByText("Item not found")).toBeTruthy();
  });
});

describe("ComparePage", () => {
  it("compares the two selected items", async () => {
    const user = userEvent.setup();
    renderAt("/compare");

    const [firstPicker, secondPicker] = await screen.findAllByRole("combobox");
    await user.selectOptions(firstPicker, "brimstone-118");
    await user.selectOptions(secondPicker, "sacred-heart-182");

    expect(screen.getByRole("heading", { level: 2, name: "Brimstone" })).toBeTruthy();
    expect(screen.getByRole("heading", { level: 2, name: "Sacred Heart" })).toBeTruthy();
  });
});
