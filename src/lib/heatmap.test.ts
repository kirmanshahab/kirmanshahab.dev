import { describe, expect, it } from "vitest";
import { bands, layout, levelFor, thresholds } from "./heatmap";

describe("heatmap", () => {
  it("uses quartiles of active days and keeps zero at level 0", () => {
    const t = thresholds([0, 0, 1, 2, 3, 4, 5, 6, 7, 8]);
    expect(t).toEqual([3, 5, 7]);
    expect(levelFor(0, t)).toBe(0);
    expect(levelFor(1, t)).toBe(1);
    expect(levelFor(8, t)).toBe(4);
  });
  it("lays days out Monday-first", () => {
    // 2023-12-07 was a Thursday.
    const { cells, weeks } = layout({ "2023-12-07": 1, "2023-12-11": 2 }, "2023-12-07", "2023-12-11");
    expect(cells[0]).toMatchObject({ week: 0, day: 3 });
    expect(cells.at(-1)).toMatchObject({ date: "2023-12-11", week: 1, day: 0 });
    expect(weeks).toBe(2);
  });
  it("splits weeks into contiguous bands", () => {
    expect(bands(149, 2)).toEqual([[0, 75], [75, 149]]);
    expect(bands(149, 4).flat().at(-1)).toBe(149);
  });
});
