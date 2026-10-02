import { describe, expect, it } from "vitest";
import { clampMinutes, formatTime } from "./time";

describe("formatTime", () => {
  it("pads minutes and seconds", () => {
    expect(formatTime(65)).toEqual({ minutes: "01", seconds: "05" });
  });
  it("keeps minutes above 59 (no hours)", () => {
    expect(formatTime(300 * 60)).toEqual({ minutes: "300", seconds: "00" });
  });
  it("never goes negative", () => {
    expect(formatTime(-5)).toEqual({ minutes: "00", seconds: "00" });
  });
});

describe("clampMinutes", () => {
  it("bounds input", () => {
    expect(clampMinutes(0)).toBe(1);
    expect(clampMinutes(5000)).toBe(999);
    expect(clampMinutes(NaN)).toBe(1);
  });
});
