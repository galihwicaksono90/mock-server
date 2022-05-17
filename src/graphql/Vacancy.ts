import { extendType, objectType, enumType, intArg, nonNull } from "nexus";
import faker from "@faker-js/faker";

export const VacancyType = enumType({
  name: "VacancyType",
  members: ["job", "scholarship"],
});

export const Vacancy = objectType({
  name: "Vacancy",
  definition: (t) => {
    t.nonNull.int("id");
    t.nonNull.string("title");
    t.nonNull.string("company");
    t.nonNull.string("type");
  },
});

const createVacancy = (id: number, type: string) => {
  return {
    id,
    title: faker.name.jobTitle(),
    company: faker.company.companyName(),
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
        limit: intArg(),
      },
      resolve: (_parent, args, _ctx) => {
        const { limit, type } = args;
        const vacancies = [];

        for (let i = 0; i < (limit ?? 4); i++) {
          vacancies.push(createVacancy(i, type));
        }

        return vacancies;
      },
    });
  },
});
