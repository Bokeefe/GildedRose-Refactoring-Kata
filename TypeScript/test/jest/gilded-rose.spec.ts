import { Item, GildedRose } from "@/gilded-rose";
import { ItemName } from "@/item-names.constants";

describe("Gilded Rose", () => {
  it('should decrement quality of a "normal" item', () => {
    const gildedRose = new GildedRose([new Item("normal", 7, 20)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(19);
  });

  it("should degrade quality twice as fast once sellBy date has passed", () => {
    const gildedRose = new GildedRose([new Item("normal", 0, 20)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(18);
  });

  it("should never be negative in quality", () => {
    const gildedRose = new GildedRose([new Item("normal", -1, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(0);
  });

  it("should increment aged Brie with time", () => {
    const gildedRose = new GildedRose([new Item(ItemName.AgedBrie, 7, 20)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(21);
  });

  it("should never exceed 50 in quality", () => {
    const gildedRose = new GildedRose([new Item(ItemName.AgedBrie, 7, 50)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(50);
  });

  it("should not alter Sulfuras quality over time", () => {
    const gildedRose = new GildedRose([new Item(ItemName.Sulfuras, 7, 38)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(38);
  });

  it("should increment Backstage Passes quality by 2 if sellBy is under 10 days", () => {
    const gildedRose = new GildedRose([
      new Item(ItemName.BackstagePasses, 7, 20),
    ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(22);
  });

  it("should increment Backstage Passes quality by 3 if sellBy is under 5 days", () => {
    const gildedRose = new GildedRose([
      new Item(ItemName.BackstagePasses, 4, 20),
    ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(23);
  });

  it("should zero quality at sellBy date for Backstage passes", () => {
    const gildedRose = new GildedRose([
      new Item(ItemName.BackstagePasses, 0, 20),
    ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(0);
  });

  it('should decrement quality of a "Conjured" item', () => {
    const gildedRose = new GildedRose([new Item(ItemName.Conjured, 7, 20)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(18);
  });
});
