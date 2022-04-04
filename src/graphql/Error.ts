import { objectType } from "nexus";

export const FieldError = objectType({
  name: "FieldError",
  definition: (t) => {
    t.string("message");
    t.string("field");
  },
});

export const FieldErrors = objectType({
  name: "FieldErrors",
  definition: (t) => {
    t.list.field("errors", { type: FieldError });
  },
});
