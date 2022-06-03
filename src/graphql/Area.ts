import { extendType, objectType } from "nexus";

const areas = [
  { id: 1, name: "ambon" },
  { id: 2, name: "balikpapan" },
  { id: 3, name: "banda aceh" },
  { id: 4, name: "bandar lampung" },
  { id: 5, name: "banjar" },
  { id: 6, name: "banjarbaru" },
  { id: 7, name: "banjarmasin" },
  { id: 8, name: "batam" },
  { id: 9, name: "bontang" },
  { id: 10, name: "cilegon" },
  { id: 11, name: "cirebon" },
  { id: 12, name: "bandung" },
];

export const Area = objectType({
  name: "Area",
  definition: (t) => {
    t.nonNull.int("id");
    t.nonNull.string("name");
  },
});

export const AreaQuery = extendType({
  type: "Query",
  definition: (t) => {
    t.nonNull.list.nonNull.field("getAreas", {
      type: "Area",
      resolve: (_parent, _args, _ctx) => {
        return areas;
      },
    });
  },
});
