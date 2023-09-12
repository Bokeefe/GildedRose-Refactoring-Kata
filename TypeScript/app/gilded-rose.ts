import { ItemName } from "./item-names.constants";

export class Item {
  name: string;
  sellIn: number;
  quality: number;

  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

export class GildedRose {
  items: Array<Item>;

  constructor(items = [] as Array<Item>) {
    this.items = items;
  }

  updateQuality() {
    for (let i = 0; i < this.items.length; i++) {
      if (
        this.items[i].name != ItemName.AgedBrie &&
        this.items[i].name != ItemName.BackstagePasses
      ) {
        if (this.items[i].quality > 0) {
          if (
            this.items[i].name != ItemName.Sulfuras &&
            this.items[i].name != ItemName.Conjured
          ) {
            this.items[i].quality = this.items[i].quality - 1;
          }
          if (
            this.items[i].name != ItemName.Sulfuras &&
            this.items[i].name === ItemName.Conjured
          ) {
            this.items[i].quality = this.items[i].quality - 2;
          }
        }
      } else {
        if (this.items[i].quality < 50) {
          this.items[i].quality = this.items[i].quality + 1;
          if (this.items[i].name == ItemName.BackstagePasses) {
            if (this.items[i].sellIn < 11) {
              if (this.items[i].quality < 50) {
                this.items[i].quality = this.items[i].quality + 1;
              }
            }
            if (this.items[i].sellIn < 6) {
              if (this.items[i].quality < 50) {
                this.items[i].quality = this.items[i].quality + 1;
              }
            }
          }
        }
      }
      if (this.items[i].name != ItemName.Sulfuras) {
        this.items[i].sellIn = this.items[i].sellIn - 1;
      }
      if (this.items[i].sellIn < 0) {
        if (this.items[i].name != ItemName.AgedBrie) {
          if (this.items[i].name != ItemName.BackstagePasses) {
            if (this.items[i].quality > 0) {
              if (this.items[i].name != ItemName.Sulfuras) {
                this.items[i].quality = this.items[i].quality - 1;
              }
            }
          } else {
            this.items[i].quality =
              this.items[i].quality - this.items[i].quality;
          }
        } else {
          if (this.items[i].quality < 50) {
            this.items[i].quality = this.items[i].quality + 1;
          }
        }
      }
    }

    return this.items;
  }
}
