import { extendType, objectType, enumType, intArg, nonNull } from "nexus";
import faker from "@faker-js/faker";

export const VacancyType = enumType({
  name: "VacancyType",
  members: ["job", "scholarship", "finalProject"],
});

export const Vacancy = objectType({
  name: "Vacancy",
  definition: (t) => {
    t.nonNull.int("id");
    t.nonNull.string("title");
    t.nonNull.string("company");
    t.nonNull.string("type");
    t.nonNull.string("image");
  },
});

const createVacancy = (id: number, type: string) => {
  return {
    id,
    title: faker.name.jobTitle(),
    company: faker.company.companyName(),
    image: faker.image.business(undefined, undefined, true),
    type,
  };
};

export const VacancyQuery = extendType({
  type: "Query",
  definition: (t) => {
    t.nonNull.list.field("getVacancies", {
      type: "Vacancy",
      args: {
        type: nonNull(VacancyType),
      },
      resolve: (_parent, args, _ctx) => {
        const { type } = args;
        const vacancies = [];

        let n = Math.random() * 12;
        if (args.type === "finalProject") {
          n = 0;
        }
        for (let i = 0; i < n; i++) {
          vacancies.push(createVacancy(i, type));
        }

        return vacancies;
      },
    });
  },
});
