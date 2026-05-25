import test from "node:test";
import assert from "node:assert/strict";

const fixtures = [
  {
    name: "bounded bug fix",
    risk: "Low",
    ambiguity: "Low",
    selectedRoute: "Short Path",
    transitionNotice: false
  },
  {
    name: "ambiguous product request",
    risk: "High",
    ambiguity: "High",
    selectedRoute: "Regular Path",
    transitionNotice: false
  },
  {
    name: "Ralph requested for unsafe work",
    risk: "High",
    ambiguity: "Medium",
    selectedRoute: "Regular Path",
    transitionNotice: true
  }
];

test("golden routing fixtures preserve expected high-level route decisions", () => {
  assert.deepEqual(
    fixtures.map((fixture) => ({
      name: fixture.name,
      selectedRoute: fixture.selectedRoute,
      transitionNotice: fixture.transitionNotice
    })),
    [
      { name: "bounded bug fix", selectedRoute: "Short Path", transitionNotice: false },
      { name: "ambiguous product request", selectedRoute: "Regular Path", transitionNotice: false },
      { name: "Ralph requested for unsafe work", selectedRoute: "Regular Path", transitionNotice: true }
    ]
  );
});
