import { Item, GildedRose } from "@/gilded-rose";

describe("Gilded Rose", () => {
  it('should decrement quality of a "normal" item', () => {
    const gildedRose = new GildedRose([new Item("normal", 7, 20)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(19);
  });
  it('should decrement quality of a "Conjured" item', () => {
    const gildedRose = new GildedRose([new Item("Conjured", 7, 20)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(18);
  });
});
